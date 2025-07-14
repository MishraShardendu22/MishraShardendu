import { ReactNode } from 'react';
import Navbar from '../Navbar';
import Nav2 from '../Nav2';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="flex flex-col h-screen">
        <Navbar />
        <Nav2 />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
