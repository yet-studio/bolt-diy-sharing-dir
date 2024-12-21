import { db } from '~/lib/firebase';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  doc,
  getDoc
} from 'firebase/firestore';

export interface FileData {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size: number;
  lastModified: string;
  shared: boolean;
  mimeType?: string;
  storageRef?: string;
  parentId?: string | null;
  ownerId: string;
  permissions: {
    read: string[];
    write: string[];
  };
}

export async function getFilesForUser(userId: string, folderId: string | null = null): Promise<FileData[]> {
  try {
    // En mode développement, retourner des données simulées
    if (process.env.NODE_ENV !== 'production') {
      return [
        {
          id: '1',
          name: 'Document.pdf',
          type: 'file',
          size: 1024,
          lastModified: new Date().toISOString(),
          shared: false,
          mimeType: 'application/pdf',
          parentId: folderId,
          ownerId: userId,
          permissions: {
            read: [userId],
            write: [userId],
          }
        },
        {
          id: '2',
          name: 'Images',
          type: 'folder',
          size: 0,
          lastModified: new Date().toISOString(),
          shared: false,
          parentId: folderId,
          ownerId: userId,
          permissions: {
            read: [userId],
            write: [userId],
          }
        }
      ];
    }

    // Implémentation réelle avec Firebase
    const filesRef = collection(db, 'files');
    const q = query(
      filesRef,
      where('ownerId', '==', userId),
      where('parentId', '==', folderId)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      lastModified: doc.data().lastModified.toISOString()
    })) as FileData[];
  } catch (error) {
    console.error('Error fetching files:', error);
    throw new Error('Failed to fetch files');
  }
}

export async function createFile(fileData: Omit<FileData, 'id'>): Promise<string> {
  try {
    const filesRef = collection(db, 'files');
    const docRef = await addDoc(filesRef, {
      ...fileData,
      lastModified: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating file:', error);
    throw new Error('Failed to create file');
  }
}

export async function updateFile(fileId: string, updates: Partial<FileData>): Promise<void> {
  try {
    const fileRef = doc(db, 'files', fileId);
    await updateDoc(fileRef, {
      ...updates,
      lastModified: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating file:', error);
    throw new Error('Failed to update file');
  }
}

export async function deleteFile(fileId: string): Promise<void> {
  try {
    const fileRef = doc(db, 'files', fileId);
    await deleteDoc(fileRef);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw new Error('Failed to delete file');
  }
}

export async function checkFilePermission(fileId: string, userId: string, permission: 'read' | 'write'): Promise<boolean> {
  try {
    const fileRef = doc(db, 'files', fileId);
    const fileDoc = await getDoc(fileRef);
    
    if (!fileDoc.exists()) {
      throw new Error('File not found');
    }

    const fileData = fileDoc.data() as FileData;
    return fileData.ownerId === userId || fileData.permissions[permission].includes(userId);
  } catch (error) {
    console.error('Error checking file permission:', error);
    throw new Error('Failed to check file permission');
  }
}

export async function shareFile(fileId: string, userId: string, permissions: ('read' | 'write')[]): Promise<void> {
  try {
    const fileRef = doc(db, 'files', fileId);
    const fileDoc = await getDoc(fileRef);
    
    if (!fileDoc.exists()) {
      throw new Error('File not found');
    }

    const fileData = fileDoc.data() as FileData;
    const updates: Partial<FileData> = {
      permissions: { ...fileData.permissions }
    };

    permissions.forEach(permission => {
      if (!updates.permissions![permission].includes(userId)) {
        updates.permissions![permission].push(userId);
      }
    });

    await updateDoc(fileRef, updates);
  } catch (error) {
    console.error('Error sharing file:', error);
    throw new Error('Failed to share file');
  }
}
