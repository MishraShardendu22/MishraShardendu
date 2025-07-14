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

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "What people think about you?",
  description: '5Chan | What people say about you, when no you arent there ,Share the link and find out !!',
 };