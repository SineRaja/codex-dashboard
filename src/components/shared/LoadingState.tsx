import React from 'react';

interface LoadingStateProps {
  message?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Loading data...' }) => {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-400">{message}</p>
    </div>
  );
};

export default LoadingState;