export type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'bottom-center' | 'center';
export type LogoType = 'pushpa' | 'brand';

export interface ImageState {
  file: File | null;
  preview: string | null;
  position: Position;
  activeLogo: LogoType;
}