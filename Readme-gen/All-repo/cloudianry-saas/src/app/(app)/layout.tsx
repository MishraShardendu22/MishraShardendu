"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  LogOutIcon,
  MenuIcon,
  LayoutDashboardIcon,
  Share2Icon,
  UploadIcon,
  ImageIcon,
} from "lucide-react";
import Image from "next/image";
import { toast } from "react-toastify";

const sidebarItems = [
  { href: "/home", icon: LayoutDashboardIcon, label: "Home Page" },
  { href: "/social-share", icon: Share2Icon, label: "Social Share" },
  { href: "/video-upload", icon: UploadIcon, label: "Video Upload" },
];

import { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();
  const { user } = useUser();

  const handleLogoClick = () => {
    router.push("/");
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log("There was an error in signing out", error);
      toast.error("Sign out failed. Please try again.");
    }
  };

  return (
    <div className="drawer lg:drawer-open">
      <input
        id="sidebar-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={sidebarOpen}
        onChange={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="drawer-content flex flex-col bg-gray-900">
        <header className="w-full bg-gray-800 shadow-md">
          <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="sidebar-drawer"
                className="btn btn-square btn-ghost drawer-button"
              >
                <MenuIcon className="text-white" />
              </label>
            </div>
            <div className="flex-1">
              <Link href="/home" onClick={handleLogoClick}>
                <h1 className="text-3xl font-bold text-gray-200 hover:text-primary transition-colors duration-200 tracking-tight cursor-pointer">
                  Media Hub
                </h1>
              </Link>
            </div>
            <div className="flex-none flex items-center space-x-4">
              {user && (
                <>
                  <div className="avatar">
                    <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-2">
                      <Image
                        src={user.imageUrl}
                        alt={user.username || user.emailAddresses[0].emailAddress}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </div>
                  </div>
                  <span className="text-sm truncate max-w-xs lg:max-w-md text-white">
                    {user.username || user.emailAddresses[0].emailAddress}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="btn btn-ghost btn-circle"
                    aria-label="Sign out"
                  >
                    <LogOutIcon className="h-6 w-6 text-white" />
                  </button>
                </>
              )}
            </div>
          </div>
        </header>
        <main className="flex-grow p-6 bg-gray-900">
          <div className="max-w-7xl mx-auto w-full text-white">{children}</div>
        </main>
      </div>
      <div className="drawer-side">
        <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>
        <aside className="bg-gradient-to-b from-gray-800 to-gray-900 w-64 h-full flex flex-col">
          <div className="flex items-center justify-center py-4">
            <ImageIcon className="w-10 h-10 text-primary" />
          </div>
          <ul className="menu p-4 w-full text-white flex-grow">
            {sidebarItems.map((item) => (
              <li key={item.href} className="mb-2">
                <Link
                  href={item.href}
                  className={`flex items-center space-x-4 px-4 py-2 rounded-lg transition-colors duration-200 ${
                    pathname === item.href
                      ? "bg-primary text-white font-bold"
                      : "hover:bg-gray-700"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-6 h-6 text-white" />
                  <span className="text-white">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          {user && (
            <div className="p-4">
              <button
                onClick={handleSignOut}
                className="btn btn-outline btn-error w-full"
              >
                <LogOutIcon className="mr-2 h-5 w-5" />
                Sign Out
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
