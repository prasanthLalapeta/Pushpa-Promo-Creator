import React, { useState } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { ImageEditor } from './components/ImageEditor';
import { PositionControls } from './components/PositionControls';
import { LogoSelector } from './components/LogoSelector';
import { ImageState, Position, LogoType } from './types';
import { Toaster } from 'react-hot-toast';
import { Camera } from 'lucide-react';

function App() {
  const [imageState, setImageState] = useState<ImageState>({
    file: null,
    preview: null,
    position: 'bottom-right',
    activeLogo: 'pushpa'
  });

  const handleImageUpload = (file: File) => {
    const preview = URL.createObjectURL(file);
    setImageState(prev => ({
      ...prev,
      file,
      preview
    }));
  };

  const handlePositionChange = (position: Position) => {
    setImageState(prev => ({
      ...prev,
      position
    }));
  };

  const handleLogoChange = (logo: LogoType) => {
    setImageState(prev => ({
      ...prev,
      activeLogo: logo
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-center" />
      
      {/* Header */}
      <header className="bg-orange-500 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3">
            <Camera size={32} />
            <h1 className="text-2xl font-bold">Pushpa: The Rule - Promo Creator</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {!imageState.preview ? (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <ImageUploader onImageUpload={handleImageUpload} />
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-[1fr,300px]">
              <ImageEditor
                imageState={imageState}
                onPositionChange={handlePositionChange}
              />
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <LogoSelector
                    activeLogo={imageState.activeLogo}
                    onLogoChange={handleLogoChange}
                  />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <PositionControls
                    position={imageState.position}
                    onPositionChange={handlePositionChange}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;