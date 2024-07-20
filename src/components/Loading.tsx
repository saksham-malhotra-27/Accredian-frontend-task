import React from 'react';

interface LoadingOverlayProps {
  loading: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white z-50">
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-white"></div>
      <div className=' text-4xl'> Please wait, the backend server might be reloading</div>
    </div>
  );
};

export default LoadingOverlay;
