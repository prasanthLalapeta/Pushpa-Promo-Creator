import React from 'react';
import { Position } from '../types';

interface Props {
  position: Position;
  onPositionChange: (position: Position) => void;
}

export function PositionControls({ position, onPositionChange }: Props) {
  const positions: Position[] = ['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right', 'bottom-center'];

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Logo Position</h3>
      <div className="grid grid-cols-2 gap-2">
        {positions.map((pos) => (
          <button
            key={pos}
            onClick={() => onPositionChange(pos)}
            className={`px-4 py-2 rounded-md text-sm transition-colors
              ${position === pos
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
          >
            {pos.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </button>
        ))}
      </div>
    </div>
  );
}