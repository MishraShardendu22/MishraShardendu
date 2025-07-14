import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/5">
      <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-slate-800 dark:border-slate-700 dark:border-t-slate-300 animate-spin"></div>
    </div>
  );
};

export default Loader;