'use client';

import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import { LogOut, LogIn, User, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const handleSignOut = () => {
    signOut();
  };

  return (
    <nav className="bg-gray-900/80 backdrop-blur-lg border-b border-purple-500/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link 
              href="/"
              className="flex items-center space-x-2"
            >
              <MessageSquare className="h-6 w-6 text-purple-400" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
                5Chan
              </span>
            </Link>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-4">
            {session ? (
              <div className="flex items-center space-x-4">
                {/* Welcome Message - Hide on mobile */}
                <span className="hidden md:block text-gray-300">
                  Welcome, {user?.name || user?.email?.split('@')[0]}
                </span>

                {/* User Menu Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-purple-600">
                          {(user?.name?.[0] || user?.email?.[0] || '?').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    className="w-56" 
                    align="end"
                    sideOffset={5}
                  >
                    <DropdownMenuLabel className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span>My Account</span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={handleSignOut}
                      className="text-red-400 focus:text-red-400 cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Link href="/api/auth/signin">
                <Button 
                  variant="ghost" 
                  className="flex items-center space-x-2 hover:bg-purple-500/10"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Sign in</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;