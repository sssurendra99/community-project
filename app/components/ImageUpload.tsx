import React, { useState, useCallback, DragEvent, ChangeEvent } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ImageUploadProps {
  onUpload: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number; // in MB
  acceptedTypes?: string[];
  uploadText?: string;
  className?: string;
}

interface UploadFile {
  file: File;
  preview: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onUpload, 
  maxFiles = 5,
  maxSize = 5,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  uploadText = 'Drop images here or click to upload',
  className = ''
}) => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [error, setError] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleFileUpload = useCallback((selectedFiles: FileList | null) => {
    if (!selectedFiles) return;
    
    setError('');
    const newFiles = Array.from(selectedFiles);
    
    // Validate number of files
    if (files.length + newFiles.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`);
      return;
    }

    // Validate file types and sizes
    const invalidFiles = newFiles.filter(file => {
      if (!acceptedTypes.includes(file.type)) {
        setError('Invalid file type. Only JPEG, PNG and WebP images are allowed');
        return true;
      }
      if (file.size > maxSize * 1024 * 1024) {
        setError(`File size should not exceed ${maxSize}MB`);
        return true;
      }
      return false;
    });

    if (invalidFiles.length > 0) return;

    // Create preview URLs
    const newUploadFiles = newFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    setFiles(prevFiles => [...prevFiles, ...newUploadFiles]);
    onUpload([...files, ...newUploadFiles].map(f => f.file));
  }, [files, maxFiles, maxSize, acceptedTypes, onUpload]);

  const removeFile = useCallback((indexToRemove: number) => {
    setFiles(prevFiles => {
      const newFiles = prevFiles.filter((_, index) => index !== indexToRemove);
      onUpload(newFiles.map(f => f.file));
      return newFiles;
    });
  }, [onUpload]);

  const handleDrag = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const { files } = e.dataTransfer;
    if (files && files.length > 0) {
      handleFileUpload(files);
    }
  }, [handleFileUpload]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(e.target.files);
  }, [handleFileUpload]);

  // Cleanup previews when component unmounts
  React.useEffect(() => {
    return () => {
      files.forEach(file => {
        URL.revokeObjectURL(file.preview);
      });
    };
  }, [files]);

  return (
    <div className={className}>
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="text-center">
          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4 flex text-sm leading-6 text-gray-600">
            <span className="relative cursor-pointer rounded-md font-semibold text-blue-600">
              <span>{uploadText}</span>
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {acceptedTypes.join(', ').replace('image/', '').toUpperCase()} up to {maxSize}MB
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Preview Area */}
      {files.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {files.map((file, index) => (
            <div key={index} className="relative group">
              <div className="relative aspect-square rounded-lg overflow-hidden border">
                <img
                  src={file.preview}
                  alt={`Preview ${index + 1}`}
                  className="object-cover w-full h-full"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeFile(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;