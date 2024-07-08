import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="p-4 justify-center flex flex-col items-center">{children}</div>;
};

export default layout;
