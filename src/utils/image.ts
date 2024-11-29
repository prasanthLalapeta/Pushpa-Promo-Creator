import { Position } from '../types';

export const getPositionClasses = (position: Position): string => {
  switch (position) {
    case 'top-left': return 'top-4 left-4';
    case 'top-right': return 'top-4 right-4';
    case 'bottom-left': return 'bottom-4 left-4';
    case 'bottom-right': return 'bottom-4 right-4';
    case 'bottom-center': return 'top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2';
    case 'center': return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
  }
};