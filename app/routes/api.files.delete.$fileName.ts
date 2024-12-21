import { json } from '@remix-run/cloudflare';
import { requireUserId } from '~/services/auth.server';
import { checkFilePermission, deleteFile } from '~/services/files.server';

export async function action({ request, params }: { request: Request; params: { fileName: string } }) {
  const userId = await requireUserId(request);
  const { fileName } = params;

  if (!fileName) {
    return json({ error: 'File name is required' }, { status: 400 });
  }

  try {
    const hasPermission = await checkFilePermission(fileName, userId, 'write');
    if (!hasPermission) {
      return json({ error: 'Unauthorized' }, { status: 403 });
    }

    await deleteFile(fileName);
    return json({ success: true });
  } catch (error) {
    console.error('Error deleting file:', error);
    return json({ error: 'Internal server error' }, { status: 500 });
  }
}
