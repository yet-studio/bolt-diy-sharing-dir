import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '~/lib/firebase';
import { LoadingDots } from '~/components/ui/LoadingDots';

interface FilePreviewProps {
  fileId: string;
  fileName: string;
  fileType: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const FilePreview: React.FC<FilePreviewProps> = ({
  fileId,
  fileName,
  fileType,
  open,
  onOpenChange,
}) => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!open) return;

    const loadPreview = async () => {
      try {
        setLoading(true);
        setError(null);
        const storageRef = ref(storage, `files/${fileId}`);
        const url = await getDownloadURL(storageRef);
        setPreviewUrl(url);
      } catch (err) {
        setError('Erreur lors du chargement de l\'aperçu');
      } finally {
        setLoading(false);
      }
    };

    loadPreview();
  }, [fileId, open]);

  const handleDownload = async () => {
    if (!previewUrl) return;
    
    try {
      const response = await fetch(previewUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError('Erreur lors du téléchargement');
    }
  };

  const renderPreview = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <LoadingDots />
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-64 text-red-500">
          {error}
        </div>
      );
    }

    if (!previewUrl) {
      return (
        <div className="flex items-center justify-center h-64 text-gray-500">
          Aperçu non disponible
        </div>
      );
    }

    if (fileType.startsWith('image/')) {
      return (
        <img
          src={previewUrl}
          alt={fileName}
          className="max-w-full max-h-[500px] object-contain"
        />
      );
    }

    if (fileType === 'application/pdf') {
      return (
        <iframe
          src={previewUrl}
          className="w-full h-[500px]"
          title={fileName}
        />
      );
    }

    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Aperçu non disponible pour ce type de fichier
      </div>
    );
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-auto">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-xl font-bold">
              {fileName}
            </Dialog.Title>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleDownload}
                disabled={!previewUrl}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                Télécharger
              </button>
              <Dialog.Close className="p-2 text-gray-500 hover:text-gray-700">
                ✕
              </Dialog.Close>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-50 rounded-lg p-4"
          >
            {renderPreview()}
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
