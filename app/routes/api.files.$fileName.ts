import { json } from '@remix-run/cloudflare';
import { requireUserId } from '~/services/auth.server';
import { checkFilePermission } from '~/services/files.server';

export async function loader({ request, params }: { request: Request; params: { fileName: string } }) {
  const userId = await requireUserId(request);
  const { fileName } = params;

  if (!fileName) {
    return json({ error: 'File name is required' }, { status: 400 });
  }

  try {
    const hasPermission = await checkFilePermission(fileName, userId, 'read');
    if (!hasPermission) {
      return json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Serve the file
    const filePath = `/api/files/${fileName}`;
    const response = await fetch(filePath);
    
    if (!response.ok) {
      return json({ error: 'File not found' }, { status: 404 });
    }

    return response;
  } catch (error) {
    console.error('Error serving file:', error);
    return json({ error: 'Internal server error' }, { status: 500 });
  }
}
