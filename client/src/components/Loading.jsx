import React from 'react';

const Loading = ({ text = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] w-full p-8">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-blue-500/20 animate-ping"></div>
        <div className="w-16 h-16 rounded-full border-4 border-blue-500 border-t-yellow-400 animate-spin"></div>
      </div>
      <p className="mt-4 text-sm font-medium text-slate-400 tracking-wider uppercase">{text}</p>
    </div>
  );
};

export default Loading;
