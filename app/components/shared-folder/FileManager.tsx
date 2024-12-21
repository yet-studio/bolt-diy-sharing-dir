import React, { useState } from 'react';
import { useNavigate } from '@remix-run/react';
import { FilePreview } from './FilePreview';
import { UploadDialog } from './UploadDialog';
import { LoadingDots } from '~/components/ui/LoadingDots';
import { FileData } from '~/services/files.server';
import { PanelHeader } from '~/components/ui/PanelHeader';
import { motion } from 'framer-motion';

interface FileManagerProps {
  files: FileData[];
  onFileSelect?: (file: FileData) => void;
  selectedFile?: FileData | null;
  onFileUploaded?: (fileUrl: string, fileName: string, mimeType: string, size: number) => void;
  isLoading?: boolean;
}

export const FileManager: React.FC<FileManagerProps> = ({
  files,
  onFileSelect,
  selectedFile,
  onFileUploaded,
  isLoading = false,
}) => {
  const navigate = useNavigate();
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  const handleFileClick = (file: FileData) => {
    if (file.type === 'folder') {
      navigate(`/shared/${file.id}`);
    } else {
      setSelectedFileId(file.id);
      setPreviewDialogOpen(true);
      onFileSelect?.(file);
    }
  };

  const handleUploadComplete = (fileUrl: string, fileName: string, mimeType: string, size: number) => {
    onFileUploaded?.(fileUrl, fileName, mimeType, size);
    setUploadDialogOpen(false);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (file: FileData): string => {
    if (file.type === 'folder') return '';
    
    if (!file.mimeType) return '';
    
    if (file.mimeType.startsWith('image/')) return '';
    if (file.mimeType === 'application/pdf') return '';
    if (file.mimeType.startsWith('text/')) return '';
    if (file.mimeType.includes('word')) return '';
    
    return '';
  };

  return (
    <div className="flex flex-col h-full">
      <PanelHeader>
        <div className="flex items-center justify-between w-full">
          <h2 className="text-lg font-semibold">Fichiers Partags</h2>
          <button 
            onClick={() => setUploadDialogOpen(true)}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Nouveau
          </button>
        </div>
      </PanelHeader>

      <div className="flex-1 overflow-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <LoadingDots />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-1 p-4"
          >
            <div className="grid grid-cols-[auto,1fr,auto,auto] gap-4 font-medium text-gray-700 p-2 border-b border-gray-200">
              <div>Type</div>
              <div>Nom</div>
              <div>Taille</div>
              <div>Modifi le</div>
            </div>
            {files.map((file) => (
              <motion.div
                key={file.id}
                whileHover={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
                onClick={() => handleFileClick(file)}
                className="grid grid-cols-[auto,1fr,auto,auto] gap-4 p-2 rounded cursor-pointer items-center"
              >
                <div>
                  {getFileIcon(file)}
                </div>
                <div className="truncate">{file.name}</div>
                <div className="text-sm text-gray-600">
                  {formatFileSize(file.size)}
                </div>
                <div className="text-sm text-gray-600">
                  {new Date(file.lastModified).toLocaleDateString()}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <UploadDialog
        open={uploadDialogOpen}
        onOpenChange={setUploadDialogOpen}
        onUploadComplete={handleUploadComplete}
      />

      {selectedFileId && (
        <FilePreview
          fileId={selectedFileId}
          fileName={files.find(f => f.id === selectedFileId)?.name || ''}
          fileType={files.find(f => f.id === selectedFileId)?.mimeType || ''}
          fileUrl={files.find(f => f.id === selectedFileId)?.storageRef ? `/api/files/${files.find(f => f.id === selectedFileId)?.storageRef}` : undefined}
          open={previewDialogOpen}
          onOpenChange={setPreviewDialogOpen}
        />
      )}
    </div>
  );
};
