import Nav from '@/components/common/Navbar';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Nav />
      <div className="p-4 justify-center flex flex-col items-center">{children}</div>
    </div>
  );
};

export default layout;
