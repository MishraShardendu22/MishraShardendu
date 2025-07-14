import Navbar from "@/components/Navbar";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {

  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {children}
    </div>
  );
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Write Anonymously 🤫`,
  description: '5Chan | Write all about Friends and Family what you never could say in person !!',
};