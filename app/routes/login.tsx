import { json, redirect } from '@remix-run/cloudflare';
import { Form, useActionData } from '@remix-run/react';
import { useEffect, useRef } from 'react';
import { getSession, commitSession } from '~/services/session.server';
import { verifyLogin } from '~/services/auth.server';

interface ActionData {
  error?: string;
  fields?: {
    email: string;
    password: string;
  };
}

export async function action({ request }: { request: Request }) {
  const form = await request.formData();
  const email = form.get('email');
  const password = form.get('password');
  const redirectTo = form.get('redirectTo') || '/';

  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    typeof redirectTo !== 'string'
  ) {
    return json<ActionData>(
      { error: 'Form not submitted correctly.' },
      { status: 400 }
    );
  }

  const fields = { email, password };

  const user = await verifyLogin(email, password);
  if (!user) {
    return json<ActionData>(
      { error: 'Invalid email or password', fields },
      { status: 400 }
    );
  }

  const session = await getSession(request);
  session.set('userId', user.id);

  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export default function Login() {
  const actionData = useActionData<typeof action>();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.error) {
      if (actionData.fields?.password) {
        passwordRef.current?.focus();
      } else {
        emailRef.current?.focus();
      }
    }
  }, [actionData]);

  return (
    <div className="flex min-h-full flex-col justify-center">
      <div className="mx-auto w-full max-w-md px-8">
        <Form method="post" className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="mt-1">
              <input
                ref={emailRef}
                id="email"
                required
                autoFocus={true}
                name="email"
                type="email"
                autoComplete="email"
                aria-invalid={actionData?.error ? true : undefined}
                aria-describedby="email-error"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                ref={passwordRef}
                name="password"
                type="password"
                autoComplete="current-password"
                aria-invalid={actionData?.error ? true : undefined}
                aria-describedby="password-error"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
            </div>
          </div>

          {actionData?.error && (
            <div className="pt-1 text-red-700" id="form-error">
              {actionData.error}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
          >
            Log in
          </button>
        </Form>
      </div>
    </div>
  );
}
