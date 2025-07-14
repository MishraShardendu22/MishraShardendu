'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { signOut, useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import {
 Sheet,
 SheetContent,
 SheetHeader,
 SheetTitle,
 SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import ThemeToggle from './store/themeStore';

const Navbar = () => {
 const router = useRouter();
 const pathname = usePathname();
 const { data: session } = useSession();

 const hideSignIn = pathname === '/sign-in' || pathname === '/sign-up';

 const handleSignOut = async () => {
  try {
   await signOut();
   toast.success('Signed out successfully');
   router.push('/');
  } catch (error) {
   console.error('Sign out error:', error);
   toast.error('Failed to sign out');
  }
 };

 const NavItems = ({ className = '', onClick = () => {} }) => (
  <div className={`flex flex-wrap gap-2 ${className}`}>
   <Button
    variant={pathname === '/dashboard' || pathname === '/' ? 'default' : 'ghost'}
    className="w-full md:w-auto justify-start"
    onClick={() => {
     router.push('/');
     onClick();
    }}
   >
    Home
   </Button>
   <Button
    variant={pathname === '/about' ? 'default' : 'ghost'}
    className="w-full md:w-auto justify-start"
    onClick={() => {
     router.push('/about');
     onClick();
    }}
   >
    About
   </Button>
   <Button
    variant={pathname === '/contact' ? 'default' : 'ghost'}
    className="w-full md:w-auto justify-start"
   >
    <Link href="/contact">Contact</Link>
   </Button>
  </div>
 );

 return (
  <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
   <div className="container flex h-16 items-center justify-between px-4 md:px-6">
    {/* Logo & Navigation */}
    <div className="flex items-center gap-4 md:gap-6 w-full max-w-full">
     <Image
      src="/project.png"
      alt="logo"
      width={80}
      height={80}
      className="cursor-pointer hover:opacity-80 transition-opacity"
      onClick={() => router.push('/')}
     />
     <div className="hidden md:flex items-center gap-2">
      <NavItems className="space-x-2" />
     </div>
    </div>

    {/* Theme & Auth Buttons */}
    <div className="flex items-center gap-3 md:gap-4">
     <ThemeToggle />
     {session ? (
      <Button
       variant="default"
       onClick={handleSignOut}
       className="hidden md:inline-flex"
      >
       Sign Out
      </Button>
     ) : (
      !hideSignIn && (
       <Button
        variant="default"
        onClick={() => router.push('/sign-in')}
        className="hidden md:inline-flex"
       >
        Sign In
       </Button>
      )
     )}

     {/* Mobile Menu */}
     <Sheet>
      <SheetTrigger asChild className="md:hidden">
       <Button variant="ghost" size="icon">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
       </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[85vw] max-w-xs sm:max-w-sm">
       <SheetHeader>
        <SheetTitle>Menu</SheetTitle>
       </SheetHeader>
       <div className="flex flex-col gap-4 mt-4">
        <NavItems className="flex-col space-y-2" onClick={() => {}} />
        {session ? (
         <Button variant="default" onClick={handleSignOut}>
          Sign Out
         </Button>
        ) : (
         !hideSignIn && (
          <Button variant="default" onClick={() => router.push('/sign-in')}>
           Sign In
          </Button>
         )
        )}
       </div>
      </SheetContent>
     </Sheet>
    </div>
   </div>
  </nav>
 );
};

export default Navbar;
