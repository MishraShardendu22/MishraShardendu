"use client";
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";

const HeaderProfileButton = () => {
  return (
    <div className="flex flex-col items-center gap-6">
      <SignedIn>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="p-1.5 bg-slate-800/20 hover:bg-slate-700/30 rounded-xl transition-all duration-300 ring-1 ring-slate-700/30 hover:ring-purple-400/50 shadow-lg cursor-pointer">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <UserButton
                appearance={{
                  elements: {
                    rootBox: "w-full h-full",
                    avatarBox: "w-full h-full",
                  },
                }}
              />
            </div>
          </div>

          {/* Sign Out Button - Adjusted spacing */}
          <div className="mt-2">
            <SignOutButton>
              <button className="flex items-center px-6 py-3 text-sm font-medium text-red-400 hover:text-red-300 bg-slate-800/20 hover:bg-slate-700/30 rounded-xl transition-all duration-200 ring-1 ring-red-500/20 hover:ring-red-400/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Sign out
              </button>
            </SignOutButton>
          </div>
        </div>
      </SignedIn>

      <SignedOut>
        <SignInButton>
          <button className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-slate-300 hover:text-purple-300 bg-slate-800/20 hover:bg-slate-700/30 rounded-xl transition-all duration-300 ring-1 ring-slate-700/30 hover:ring-purple-400/50 shadow-lg">
            <span>Sign in</span>
          </button>
        </SignInButton>
      </SignedOut>
    </div>
  );
};

export default HeaderProfileButton;
