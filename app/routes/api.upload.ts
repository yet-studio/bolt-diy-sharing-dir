import type { ActionFunctionArgs } from '@remix-run/server-runtime';
import { requireUserId } from '~/services/auth.server';
import { uploadFile } from '~/services/storage.server';
import { createFile } from '~/services/files.server';

export async function action({ request }: ActionFunctionArgs) {
  const userId = await requireUserId(request);

  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const formData = await request.formData();
    const uploadedFile = formData.get('file');

    if (!uploadedFile || !(uploadedFile instanceof File)) {
      return new Response('No file provided', { status: 400 });
    }

    // Vérifier la taille du fichier (100MB max)
    if (uploadedFile.size > 100 * 1024 * 1024) {
      return new Response('File too large', { status: 400 });
    }

    // Vérifier le type MIME
    const allowedTypes = [
      'image/',
      'application/pdf',
      'text/',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!allowedTypes.some(type => uploadedFile.type.startsWith(type))) {
      return new Response('Invalid file type', { status: 400 });
    }

    // Upload le fichier
    const fileName = await uploadFile(uploadedFile, userId);

    // Créer l'entrée dans la base de données
    await createFile({
      name: uploadedFile.name,
      type: 'file',
      size: uploadedFile.size,
      lastModified: new Date(),
      shared: false,
      mimeType: uploadedFile.type,
      parentId: null,
      ownerId: userId,
      permissions: {
        read: [userId],
        write: [userId]
      },
      storageRef: fileName
    });

    return new Response(
      JSON.stringify({ 
        fileUrl: `/api/files/${fileName}`,
        success: true 
      }),
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

  } catch (error) {
    console.error('Upload error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to upload file',
        success: false
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}
