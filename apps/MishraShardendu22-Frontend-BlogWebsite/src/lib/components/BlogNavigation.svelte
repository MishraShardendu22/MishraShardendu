<script lang="ts">
  import { cn } from "../utils";
  import type { User } from "../api";
  import { authStore } from "../auth";
  import Button from "./ui/button.svelte";
  import Avatar from "./ui/avatar.svelte";
  import { resolveImageUrl } from "../utils/image";
  import { navigateTo } from "../navigation";
  import CompactEmailVerification from "./CompactEmailVerification.svelte";
  import { BookOpen, Plus, LogOut, Menu, X, Glasses, LayoutDashboard, User2, LogIn, BookAIcon } from "lucide-svelte";

  let isMobileMenuOpen = $state(false);
  let currentPath = $state(window.location.pathname);
  let isOwner = $state(false);
  let user = $state<User | null>(null);
  let isAuthenticated = $state(false);

  authStore.subscribe((state) => {
    isOwner = state.user?.isOwner || false;
    user = state.user;
    isAuthenticated = state.isAuthenticated;
  });

  // Listen for URL changes
  $effect(() => {
    const handleLocationChange = () => {
      currentPath = window.location.pathname;
    };

    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  });

  const basePath = '';

  const navigationItems = [
    {
      name: "Read Blogs",
      href: "/read",
      icon: Glasses,
      description: "Read the latest blog posts",
      showForAll: true,
    },
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      description: "Manage your blog posts",
      showForAll: false,
    },
    {
      name: "Create Post",
      href: "/create",
      icon: Plus,
      description: "Write a new blog post",
      showForAll: false,
    },
    {
      name: "Main Website",
      href: "https://mishrashardendu22.is-a.dev",
      icon: User2,
      description: "Go back to the main website",
      showForAll: true,
    },
  ];

  const visibleNavItems = navigationItems.filter((item) => {
    if (item.showForAll) return true;
    return isOwner;
  });

  const isRouteActive = (href: string) => {
    if (href === "/" || href === "https://mishrashardendu22.is-a.dev") {
      return false;
    }

    const normalizedCurrent = currentPath;
    const normalizedHref = href;

    if (normalizedHref === "/read") {
      if (normalizedCurrent === "/dashboard" || normalizedCurrent === "/create") {
        return false;
      }
      return (
        normalizedCurrent === "/" ||
        normalizedCurrent === "" ||
        normalizedCurrent === "/read" ||
        (normalizedCurrent.match(/^\/read\/\d+/) &&
          !normalizedCurrent.includes("/dashboard") &&
          !normalizedCurrent.includes("/create"))
      );
    }

    if (normalizedHref === "/dashboard") {
      return normalizedCurrent === "/dashboard";
    }
    if (normalizedHref === "/create") {
      return normalizedCurrent === "/create";
    }

    return normalizedCurrent === normalizedHref;
  };
</script>

<div class="lg:hidden fixed top-6 right-6 z-50 pointer-events-auto">
  <Button
    variant="outline"
    size="sm"
    onclick={() => (isMobileMenuOpen = !isMobileMenuOpen)}
    className="bg-card/95 backdrop-blur-sm border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 p-2"
    aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
    aria-expanded={isMobileMenuOpen}
    aria-controls="mobile-navigation"
  >
      {#if isMobileMenuOpen}
        <X class="h-5 w-5" aria-hidden="true" />
      {:else}
        <Menu class="h-5 w-5" aria-hidden="true" />
      {/if}
  </Button>
</div>

{#if isMobileMenuOpen}
  <div class="lg:hidden fixed inset-0 z-50 bg-background/60 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="mobile-nav-title" id="mobile-navigation">
    <div class="absolute inset-y-0 left-0 w-72 bg-card/95 border-r border-border p-4 overflow-y-auto">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-3">
          <div>
            <div class="font-bold" id="mobile-nav-title">Blog</div>
            <div class="text-xs text-muted-foreground">Shardendu Mishra</div>
          </div>
        </div>
        <Button variant="ghost" size="sm" onclick={() => (isMobileMenuOpen = false)} aria-label="Close navigation menu">
          <X class="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>

      <!-- Mobile Create button CTA -->
      {#if isOwner}
        <div class="mb-4">
          <Button size="sm" className="w-full bg-linear-to-r from-primary to-primary/90 text-primary-foreground" onclick={() => { isMobileMenuOpen = false; navigateTo('/create'); }}>
            <Plus class="w-4 h-4 mr-2" />
            Create Post
          </Button>
        </div>
      {/if}

      {#if isAuthenticated && user}
        <div class="mb-4">
          <div class="flex items-center gap-3">
            <Avatar src={resolveImageUrl(user.profileImage || user.image || user.avatar || user.profile?.avatar || undefined)} fallback={user.name?.charAt(0) || "U"} class="w-12 h-12" />
            <div>
              <div class="text-sm font-semibold">{user.name}</div>
              <div class="text-xs text-muted-foreground">{user.email}</div>
            </div>
          </div>
        </div>
      {/if}

      <div class="flex flex-col space-y-2">
        {#each visibleNavItems as item}
          {@const isActive = isRouteActive(item.href)}
          <a href={item.href} onclick={(e) => { 
            e.preventDefault(); 
            isMobileMenuOpen = false; 
            if (item.href.startsWith('http')) {
              window.location.href = item.href;
            } else {
              navigateTo(item.href);
            }
          }} class={cn("flex items-center gap-3 p-3 rounded-md", isActive ? "bg-primary/10 text-primary" : "hover:bg-muted/40")}> 
            {#if item.icon}
              {@const Icon = item.icon}
              <Icon class={cn("h-5 w-5", isActive ? "text-primary" : "text-muted-foreground")} />
            {/if}
            <div>
              <div class={cn("text-sm", isActive && "font-semibold")}>{item.name}</div>
              <div class="text-xs text-muted-foreground">{item.description}</div>
            </div>
          </a>
        {/each}
      </div>

      <div class="mt-4 pt-4 border-t border-border">
        {#if isAuthenticated && user}
          <Button size="sm" variant="outline" className="w-full" onclick={() => authStore.logout()}>
            Sign Out
          </Button>
        {:else}
          <Button size="sm" className="w-full" onclick={() => navigateTo('/login')}>
            Sign In
          </Button>
        {/if}
      </div>
    </div>
  </div>
{/if}

<aside
  class="hidden lg:flex fixed left-0 top-0 bottom-0 w-20 border-r border-border bg-card/95 backdrop-blur-sm flex-col z-30 shadow-lg overflow-hidden"
  aria-label="Blog navigation"
>
  <div class="h-20 flex items-center justify-center border-b border-border bg-linear-to-b from-background/50 to-transparent">
    <BookAIcon class="w-6 h-6 text-primary" />
  </div>

  <nav class="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
    {#each visibleNavItems as item}
      {@const isActive = isRouteActive(item.href)}
      <a 
        href={item.href} 
        onclick={(e) => { 
          e.preventDefault(); 
          if (item.href.startsWith('http')) {
            window.location.href = item.href;
          } else {
            navigateTo(item.href);
          }
        }}
        class={cn(
          "group/item flex items-center justify-center h-14 rounded-xl transition-all duration-300 relative",
          isActive 
            ? "bg-linear-to-r from-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/25" 
            : "hover:bg-linear-to-r hover:from-accent/10 hover:to-accent/5 hover:shadow-md"
        )}
      >
        {#if item.icon}
          {@const Icon = item.icon}
          <Icon class={cn(
            "h-6 w-6 transition-all duration-300",
            isActive ? "text-primary-foreground" : "text-muted-foreground"
          )} />
        {/if}
        <div class="absolute left-full ml-2 px-3 py-2 bg-popover text-popover-foreground rounded-lg shadow-lg opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
          <div class="font-semibold text-sm">{item.name}</div>
          <div class="text-xs text-muted-foreground">{item.description}</div>
        </div>
      </a>
    {/each}
  </nav>

  <div class="border-t border-border bg-linear-to-t from-background/50 to-transparent">
    {#if isAuthenticated && user}
      <div class="p-3 border-b border-border/50 flex items-center justify-center group/avatar relative">
        <Avatar
          src={resolveImageUrl(user.profileImage || user.image || user.avatar || user.profile?.avatar || undefined)}
          fallback={user.name?.charAt(0) || "U"}
          class="w-12 h-12 border-2 border-primary/20 shadow-md"
        />
        {#if user.isVerified}
          <div class="absolute bottom-2 right-2 w-4 h-4 bg-emerald-500 rounded-full border-2 border-background flex items-center justify-center" role="img" aria-label="Verified account">
            <svg class="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
          </div>
        {/if}
        <div class="absolute left-full ml-2 px-3 py-2 bg-popover text-popover-foreground rounded-lg shadow-lg opacity-0 invisible group-hover/avatar:opacity-100 group-hover/avatar:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
          <div class="text-sm font-bold">{user.name}</div>
          <div class="text-xs text-muted-foreground">{user.email}</div>
        </div>
      </div>
      
      <div class="p-3">
        <button
          onclick={() => authStore.logout()}
          class="group/logout w-full h-12 flex items-center justify-center rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors relative"
          aria-label="Sign out of your account"
        >
          <LogOut class="w-5 h-5 text-muted-foreground hover:text-red-600 dark:hover:text-red-400 transition-colors" aria-hidden="true" />
          <div class="absolute left-full ml-2 px-3 py-2 bg-popover text-popover-foreground rounded-lg shadow-lg opacity-0 invisible group-hover/logout:opacity-100 group-hover/logout:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
            Sign Out
          </div>
        </button>
      </div>
    {:else}
      <div class="p-3">
        <button
          onclick={() => navigateTo('/login')}
          class="group/login w-full h-12 flex items-center justify-center rounded-lg bg-primary hover:bg-primary/90 transition-colors relative"
          aria-label="Sign in to your account"
        >
          <LogIn class="w-5 h-5 text-primary-foreground" aria-hidden="true" />
          <div class="absolute left-full ml-2 px-3 py-2 bg-popover text-popover-foreground rounded-lg shadow-lg opacity-0 invisible group-hover/login:opacity-100 group-hover/login:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
            Sign In
          </div>
        </button>
      </div>
    {/if}
  </div>
</aside>
