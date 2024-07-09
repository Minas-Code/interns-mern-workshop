import Nav from '@/components/common/Navbar';
import React, { Suspense } from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense>
      <Nav />
      <div className="p-4 justify-center flex flex-col items-center">{children}</div>
    </Suspense>
  );
};

export default layout;
