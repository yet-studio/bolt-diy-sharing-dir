import { json } from '@remix-run/cloudflare';
import { requireUserId } from '~/services/auth.server';
import { createFile, FileData } from '~/services/files.server';

export async function action({ request }: { request: Request }) {
  const userId = await requireUserId(request);

  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const parentId = formData.get('parentId') as string | null;

    if (!file) {
      return json({ error: 'No file provided' }, { status: 400 });
    }

    const fileData: Omit<FileData, 'id'> = {
      name: file.name,
      type: 'file',
      size: file.size,
      lastModified: new Date().toISOString(),
      shared: false,
      mimeType: file.type,
      parentId,
      ownerId: userId,
      permissions: {
        read: [userId],
        write: [userId],
      }
    };

    const fileId = await createFile(fileData);
    return json({ success: true, fileId });
  } catch (error) {
    console.error('Upload error:', error);
    return json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
