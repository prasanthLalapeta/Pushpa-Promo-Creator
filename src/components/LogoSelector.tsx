import React from 'react';
import { LogoType } from '../types';

interface Props {
  activeLogo: LogoType;
  onLogoChange: (logo: LogoType) => void;
}

export function LogoSelector({ activeLogo, onLogoChange }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Select Logo</h3>
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => onLogoChange('pushpa')}
          className={`px-4 py-2 rounded-md text-sm transition-colors
            ${activeLogo === 'pushpa'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
        >
          Pushpa Logo
        </button>
        <button
          onClick={() => onLogoChange('brand')}
          className={`px-4 py-2 rounded-md text-sm transition-colors
            ${activeLogo === 'brand'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
        >
          Brand Logo
        </button>
      </div>
    </div>
  );
}