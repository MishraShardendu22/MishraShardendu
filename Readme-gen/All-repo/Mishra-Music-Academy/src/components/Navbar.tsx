'use client'
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "../components/ui/navbar-menu";
import { cn } from "@/lib/utils";

function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    return (
      <div className={cn("fixed top-10 inset-x-0 max-w-2xl px-4 mx-auto z-50", className)}>
        <Menu setActive={setActive}>
          <MenuItem setActive={setActive} active={active} item="🏠 Home">
            <div className="flex flex-col space-y-4 text-sm"><hr/>
              <HoveredLink href="/">🏠 Home</HoveredLink><hr/>
              <HoveredLink href="/all">📚 All Courses</HoveredLink><hr/>
            </div>
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item="💻 Online Instrument Courses">
            <div className="flex flex-col space-y-4 text-sm"><hr/>
              <HoveredLink href="/guitar">🎸 Guitar - Online</HoveredLink><hr/>
              <HoveredLink href="/sitar">🎶 Sitar - Online</HoveredLink><hr/>
              <HoveredLink href="/Tabla">🥁 Tabla - Online</HoveredLink><hr/>
              <HoveredLink href="/Piano">🎹 Piano - Online</HoveredLink><hr/>
            </div>
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item="📬 Contact The Creator !!">
            <div className="flex flex-col space-y-4 text-sm"><hr/>         
              <HoveredLink href="https://www.linkedin.com/in/shardendumishra22/">🔗 LinkedIn</HoveredLink><hr/>
              <HoveredLink href="https://gravatar.com/shardendumishra22">👤 Gravatar</HoveredLink><hr/>
            </div>
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item="🌟 Creator's Accounts !!">
            <div className="flex flex-col space-y-4 text-sm"><hr/>
              <HoveredLink href="https://leetcode.com/u/ShardenduMishra22/">💻 LeetCode</HoveredLink><hr/>
              <HoveredLink href="https://github.com/MishraShardendu22">📁 GitHub Projects</HoveredLink><hr/>
              <HoveredLink href="https://github.com/ShardenduMishra22">🔧 GitHub Main Account</HoveredLink><hr/>
              <HoveredLink href="https://codeforces.com/profile/ShardenduMishra_22">🏅 Codeforces</HoveredLink><hr/>
              <HoveredLink href="https://www.codechef.com/users/shardendu22">🍴 CodeChef</HoveredLink><hr/>
            </div>
          </MenuItem>
        </Menu>
      </div>
    );
}

export default Navbar;
