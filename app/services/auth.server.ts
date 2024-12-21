import { createCookieSessionStorage, redirect } from '@remix-run/cloudflare';
import { auth } from '~/lib/firebase';

const sessionSecret = process.env.SESSION_SECRET || 'DEFAULT_SECRET';

const storage = createCookieSessionStorage({
  cookie: {
    name: 'RJ_session',
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export async function createUserSession(userId: string, redirectTo: string) {
  const session = await storage.getSession();
  session.set('userId', userId);
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session),
    },
  });
}

export async function getUserSession(request: Request) {
  return storage.getSession(request.headers.get('Cookie'));
}

export async function requireUserId(request: Request): Promise<string> {
  const session = await getUserSession(request);
  const userId = session.get('userId');

  if (!userId || typeof userId !== 'string') {
    throw redirect('/login');
  }

  return userId;
}

export async function verifyLogin(email: string, password: string) {
  // En mode développement, accepter n'importe quelles credentials
  if (process.env.NODE_ENV !== 'production') {
    return {
      id: 'test-user-id',
      email,
    };
  }

  // Implémentation réelle avec Firebase Auth
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    return {
      id: userCredential.user.uid,
      email: userCredential.user.email,
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

export async function logout(request: Request) {
  const session = await getUserSession(request);
  return redirect('/', {
    headers: {
      'Set-Cookie': await storage.destroySession(session),
    },
  });
}
