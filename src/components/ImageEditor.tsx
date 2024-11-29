import React from 'react';
import { Position, ImageState, LogoType } from '../types';
import { toPng } from 'html-to-image';
import { Download, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { getPositionClasses } from '../utils/image';
import { copyToClipboard } from '../utils/share';
import { trackEvent } from '../utils/analytics';

interface Props {
  imageState: ImageState;
  onPositionChange: (position: Position) => void;
}

const LOGOS = {
  pushpa: '/pushpa-logo.png',
  brand: '/brand-logo.png'
};

export function ImageEditor({ imageState, onPositionChange }: Props) {
  const editorRef = React.useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!editorRef.current) return;
    
    try {
      const dataUrl = await toPng(editorRef.current, { quality: 1.0 });
      const link = document.createElement('a');
      link.download = 'pushpa-promo.png';
      link.href = dataUrl;
      link.click();
      
      // Track download event
      trackEvent('Image', 'download', imageState.activeLogo);
    } catch (err) {
      toast.error('Failed to download image');
    }
  };

  const handleShare = async () => {
    await copyToClipboard(window.location.href);
    // Track share event
    trackEvent('Image', 'share', imageState.activeLogo);
  };

  if (!imageState.preview) return null;

  return (
    <div className="space-y-6">
      <div 
        ref={editorRef}
        className="relative w-full aspect-square max-w-2xl mx-auto rounded-lg overflow-hidden"
      >
        <img
          src={imageState.preview}
          alt="Preview"
          className="w-full h-full object-cover object-top"
        />
        <img
          src={LOGOS[imageState.activeLogo]}
          alt={`${imageState.activeLogo === 'pushpa' ? 'Pushpa: The Rule' : 'Brand'} Logo`}
          className={`absolute w-1/4 ${getPositionClasses(imageState.position)}`}
        />
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          <Download size={20} />
          Download
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
        >
          <Share2 size={20} />
          Share
        </button>
      </div>
    </div>
  );
}