import { createHash } from 'crypto';
import { generateUniqueFileName } from '~/utils/crypto.server';

const UPLOAD_DIR = process.env.UPLOAD_DIR || './uploads';

// Assure que le dossier d'upload existe
// mkdir(UPLOAD_DIR, { recursive: true }).catch(console.error);

export async function uploadFile(file: File, userId: string): Promise<string> {
  try {
    const fileBuffer = await file.arrayBuffer();
    const fileName = await generateUniqueFileName(file, userId);

    // Créer un Blob à partir du buffer
    const blob = new Blob([fileBuffer], { type: file.type });

    // Utiliser l'API Fetch pour sauvegarder le fichier
    const formData = new FormData();
    formData.append('file', blob, fileName);

    const response = await fetch('/api/files/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload file');
    }

    return fileName;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Failed to upload file');
  }
}

export async function deleteFile(fileName: string): Promise<void> {
  try {
    const response = await fetch(`/api/files/${fileName}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete file');
    }
  } catch (error) {
    console.error('Error deleting file:', error);
    throw new Error('Failed to delete file');
  }
}

export function getFileUrl(fileName: string): string {
  return `/api/files/${fileName}`;
}

// Types
export interface StorageFile {
  name: string;
  type: string;
  size: number;
  lastModified: number;
}

import { createCookieSessionStorage } from '@remix-run/cloudflare';

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error('SESSION_SECRET must be set');
}

export const storage = createCookieSessionStorage({
  cookie: {
    name: 'bolt_session',
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    httpOnly: true,
  },
});

export async function getSession(request: Request) {
  const cookie = request.headers.get('Cookie');
  return storage.getSession(cookie);
}

export async function commitSession(session: any) {
  return storage.commitSession(session);
}

export async function destroySession(session: any) {
  return storage.destroySession(session);
}
