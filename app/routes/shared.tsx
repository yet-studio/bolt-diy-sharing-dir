import { useState } from 'react';
import { useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/cloudflare';
import { requireUserId } from '~/services/auth.server';
import { FileManager } from '~/components/shared-folder/FileManager';
import { getFilesForUser, FileData } from '~/services/files.server';

export async function loader({ request }: { request: Request }) {
  const userId = await requireUserId(request);
  const files = await getFilesForUser(userId);
  
  return json({ files });
}

export default function SharedFiles() {
  const { files } = useLoaderData<typeof loader>();
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);

  const handleFileSelect = (file: FileData) => {
    setSelectedFile(file);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 overflow-hidden">
        <FileManager 
          files={files} 
          onFileSelect={handleFileSelect}
          selectedFile={selectedFile}
        />
      </div>
    </div>
  );
}
