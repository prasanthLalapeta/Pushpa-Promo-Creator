import toast from 'react-hot-toast';

export const copyToClipboard = async (url: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(url);
    toast.success('Link copied to clipboard!');
  } catch (err) {
    toast.error('Failed to copy link');
  }
};