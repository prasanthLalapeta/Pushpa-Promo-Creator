import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import { trackEvent } from '../utils/analytics';

interface Props {
  onImageUpload: (file: File) => void;
}

const MAX_SIZE = 15 * 1024 * 1024; // 15MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png'];

export function ImageUploader({ onImageUpload }: Props) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file.size > MAX_SIZE) {
      toast.error('Image size should be less than 15MB');
      trackEvent('Upload', 'error', 'size_exceeded');
      return;
    }
    onImageUpload(file);
    trackEvent('Upload', 'success', file.type);
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxFiles: 1,
    multiple: false
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2 text-sm text-gray-600">
        {isDragActive
          ? 'Drop the image here...'
          : 'Drag & drop an image here, or click to select'}
      </p>
      <p className="mt-1 text-xs text-gray-500">
        Supports JPG, PNG (max 15MB)
      </p>
    </div>
  );
}