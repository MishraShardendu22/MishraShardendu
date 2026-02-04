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
          <a href={item.href} onclick={(e) => { e.preventDefault(); isMobileMenuOpen = false; navigateTo(item.href); }} class={cn("flex items-center gap-3 p-3 rounded-md", isActive ? "bg-primary/10 text-primary" : "hover:bg-muted/40")}> 
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
  class="hidden lg:flex group fixed left-0 top-0 bottom-0 w-20 hover:w-72 border-r border-border bg-card/95 backdrop-blur-sm flex-col z-30 shadow-lg transition-[width] duration-300 ease-in-out"
  aria-label="Blog navigation"
>
  <div class="h-20 flex items-center justify-between px-4 border-b border-border bg-linear-to-b from-background/50 to-transparent shrink-0">
    <div class="nav-label">
      <h1 class="font-bold text-lg whitespace-nowrap">Blog</h1>
      <p class="text-xs text-muted-foreground whitespace-nowrap">Shardendu Mishra</p>
    </div>
    <div class="w-12 h-12 p-2.5  flex items-center justify-center shrink-0">
      <BookAIcon />
    </div>
  </div>

  <nav class="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
    {#each visibleNavItems as item}
      {@const isActive = isRouteActive(item.href)}
      <a 
        href={item.href} 
        title={item.name}
        onclick={(e) => { e.preventDefault(); navigateTo(item.href); }}
        class={cn(
          "flex items-center h-14 rounded-xl transition-all duration-300 relative",
          isActive 
            ? "bg-linear-to-r from-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/25" 
            : "hover:bg-linear-to-r hover:from-accent/10 hover:to-accent/5 hover:shadow-md"
        )}
      >
        <div class="w-16 h-14 flex items-center justify-center shrink-0">
          {#if item.icon}
            {@const Icon = item.icon}
            <Icon class={cn(
              "h-6 w-6 transition-all duration-300",
              isActive ? "text-primary-foreground" : "text-muted-foreground group-hover/item:text-primary"
            )} />
          {/if}
        </div>
        <div class="nav-label flex flex-col justify-center pr-4 flex-1 min-w-0">
          <div class={cn("font-semibold text-sm whitespace-nowrap")}>{item.name}</div>
          <div class={cn("text-xs whitespace-nowrap truncate", isActive ? "text-primary-foreground/80" : "text-muted-foreground")}>{item.description}</div>
        </div>
      </a>
    {/each}
  </nav>

  <div class="border-t border-border bg-linear-to-t from-background/50 to-transparent shrink-0">
    {#if isAuthenticated && user}
      <!-- User Avatar Section -->
      <div class="p-3 border-b border-border/50">
        <div class="flex items-center">
          <div class="w-14 h-14 flex items-center justify-center shrink-0">
            <div class="relative">
              <Avatar
                src={resolveImageUrl(user.profileImage || user.image || user.avatar || user.profile?.avatar || undefined)}
                fallback={user.name?.charAt(0) || "U"}
                class="w-12 h-12 border-2 border-primary/20 shadow-md"
              />
              {#if user.isVerified}
                <div class="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-background flex items-center justify-center" role="img" aria-label="Verified account">
                  <svg class="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
              {/if}
            </div>
          </div>
          <div class="nav-label flex-1 min-w-0 ml-2">
            <p class="text-sm font-bold truncate">{user.name}</p>

            {#if !user.isVerified}
              <span class="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/50 px-1.5 py-0.5 rounded-md mt-1">
                <span class="w-1 h-1 rounded-full bg-amber-500 animate-pulse"></span>
                Not verified
              </span>
            {/if}
          </div>
        </div>
        
        {#if !user.isVerified}
          <div class="mt-3 pt-3 border-t border-border/50 nav-label">
            <CompactEmailVerification email={user.email} />
          </div>
        {/if}
      </div>
      
      <!-- Logout Section -->
      <div class="p-3">
        <div class="flex items-center h-12">
          <div class="w-14 h-12 flex items-center justify-center shrink-0">
            <button
              onclick={() => authStore.logout()}
              class="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
              title="Sign Out"
              aria-label="Sign out of your account"
            >
              <LogOut class="w-5 h-5 text-muted-foreground hover:text-red-600 dark:hover:text-red-400 transition-colors" aria-hidden="true" />
            </button>
          </div>
          <div class="nav-label flex-1 ml-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="w-full hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 dark:hover:text-red-400 hover:border-red-300 dark:hover:border-red-800 transition-all" 
              onclick={() => authStore.logout()}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    {:else}
      <!-- Sign In Section -->
      <div class="p-3">
        <div class="flex items-center h-12">
          <div class="w-14 h-12 flex items-center justify-center shrink-0">
            <button
              onclick={() => navigateTo('/login')}
              class="w-10 h-10 flex items-center justify-center rounded-lg bg-primary hover:bg-primary/90 transition-colors"
              title="Sign In"
              aria-label="Sign in to your account"
            >
              <LogIn class="w-5 h-5 text-primary-foreground" aria-hidden="true" />
            </button>
          </div>
          <div class="nav-label flex-1 ml-2">
            <Button 
              size="default" 
              className="w-full bg-linear-to-r from-primary to-primary/90" 
              onclick={() => navigateTo('/login')}
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    {/if}
  </div>
</aside>
