<script lang="ts">
  import BlogNavigation from "./lib/components/BlogNavigation.svelte";
  import BlogListPage from "./lib/components/BlogListPage.svelte";
  import BlogCreatePage from "./lib/components/BlogCreatePage.svelte";
  import BlogDetailPage from "./lib/components/BlogDetailPage.svelte";
  import BlogDashboardPage from "./lib/components/BlogDashboardPage.svelte";
  import LoginPage from "./lib/components/LoginPage.svelte";
  import Toast from "./lib/components/Toast.svelte";
  import ConfirmDialog from "./lib/components/ConfirmDialog.svelte";
  import ThemeToggle from "./lib/components/ThemeToggle.svelte";
  import { authStore } from "./lib/auth";
  import { updateSEO } from "./lib/seo";
  import { themeStore } from "./lib/theme";
  import { onMount } from "svelte";

  let currentPath = $state(window.location.pathname);
  let isAuthenticated = $state(false);
  let isOwner = $state(false);
  let isLoading = $state(true);

  onMount(async () => {
    try {
      themeStore.init();
      await authStore.init();
      updatePageSEO();
    } catch (error) {
      console.error('[Blog App] Initialization error:', error);
    }
  });

  authStore.subscribe((state) => {
    isAuthenticated = state.isAuthenticated;
    isOwner = state.user?.isOwner || false;
    isLoading = state.isLoading;
  });

  $effect(() => {
    const handleLocationChange = () => {
      currentPath = window.location.pathname;
      
      if (currentPath === '/' || currentPath === '') {
        window.history.replaceState(null, '', '/read');
        currentPath = '/read';
      }
    };

    const checkPath = window.location.pathname;
    if (checkPath === '/' || checkPath === '') {
      window.history.replaceState(null, '', '/read');
      currentPath = '/read';
    } else {
      currentPath = checkPath;
    }

    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  });

  const normalizedPath = $derived(() => {
    let path = currentPath;
    if (!path || path === '/') {
      path = '/read';
    }
    return path;
  });

  const requiresAuth = $derived(() => {
    const path = normalizedPath();
    return path === "/create" || 
           path === "/dashboard" || 
           path.endsWith("/edit");
  });

  $effect(() => {
    if (!isLoading && requiresAuth() && !isAuthenticated) {
      window.location.href = '/login';
    } else if (!isLoading && requiresAuth() && isAuthenticated && !isOwner && 
               (normalizedPath() === "/create" || normalizedPath() === "/dashboard" || normalizedPath().endsWith("/edit"))) {
      window.location.href = '/read';
    }
  });

  const pageComponent = $derived(() => {
    const path = normalizedPath();
    if (path === "/login" || path === "/register") {
      return "login";
    } else if (path === "/" || path === "" || path === "/read") {
      return "list";
    } else if (path === "/create") {
      return "create";
    } else if (path === "/dashboard") {
      return "dashboard";
    } else if (path.match(/^\/read\/\d+\/edit$/)) {
      return "edit";
    } else if (path.match(/^\/read\/\d+$/)) {
      return "detail";
    }
    return "list";
  });

  const blogId = $derived(() => {
    const path = normalizedPath();
    const match = path.match(/^\/read\/(\d+)(?:\/edit)?$/);
    return match ? match[1] : null;
  });

  function updatePageSEO() {
    const baseUrl = 'https://mishrashardendu22.is-a.dev';
    
    switch (pageComponent()) {
      case 'login':
        updateSEO({
          title: 'Login | Shardendu Mishra Blog | Access Your Dashboard',
          description: 'Sign in to your blog dashboard to create, edit, and publish technical articles. Manage your content and engage with your readers.',
          url: `${baseUrl}/login`,
          keywords: 'blog login, content management, writer dashboard',
        });
        break;
      case 'list':
        updateSEO({
          title: 'Blogs By Shardendu Mishra | Tech Articles & Programming Insights',
          description: 'Explore in-depth technical articles covering web development, software engineering, programming best practices, system design, and modern tech stack insights. Written by Shardendu Mishra, a passionate software engineer and IIIT Dharwad student.',
          url: `${baseUrl}/read`,
          keywords: 'technical articles, programming blog, web development, software engineering, coding tutorials, tech insights',
        });
        break;
      case 'create':
        updateSEO({
          title: 'Create New Post | Shardendu Mishra Blog',
          description: 'Create and publish a new technical blog post. Share your knowledge, insights, and experiences with the developer community.',
          url: `${baseUrl}/create`,
          keywords: 'create blog post, write article, publish content',
        });
        break;
      case 'dashboard':
        updateSEO({
          title: 'Dashboard | Shardendu Mishra Blog | Manage Your Content',
          description: 'Manage your blog posts, view analytics, monitor engagement, and track your content performance. Your central hub for blog management.',
          url: `${baseUrl}/dashboard`,
          keywords: 'blog dashboard, content management, analytics, post management',
        });
        break;
      case 'edit':
        updateSEO({
          title: 'Edit Post - Shardendu Mishra Blog',
          description: 'Edit and update your blog post content. Refine your technical article to ensure accuracy and clarity for your readers.',
          url: `${baseUrl}${currentPath}`,
          keywords: 'edit blog post, update article, content editing',
        });
        break;
      case 'detail':
        updateSEO({
          title: 'Blog Post | Shardendu Mishra',
          description: 'Read this insightful technical article by Shardendu Mishra covering programming concepts, best practices, and real-world development experiences.',
          url: `${baseUrl}${currentPath}`,
          type: 'article',
          keywords: 'technical article, programming tutorial, software development',
        });
        break;
      default:
        updateSEO();
    }
  }

  $effect(() => {
    if (!isLoading) {
      updatePageSEO();
    }
  });
</script>

<div class="min-h-screen bg-background" style="min-height: 100vh;">
  <Toast />
  <ThemeToggle />
  <ConfirmDialog />
  
  {#if isLoading}
    <div class="flex items-center justify-center min-h-screen bg-linear-to-br from-background via-background to-background-secondary" style="min-height: 100vh;">
      <div class="text-center animate-slide-up">
        <div class="relative w-20 h-20 mx-auto mb-6">
          <div class="absolute inset-0 bg-linear-to-br from-primary/20 to-primary/10 rounded-full blur-xl animate-pulse"></div>
          <div class="relative w-20 h-20 border-4 border-primary/30 border-t-primary rounded-full animate-spin shadow-lg"></div>
        </div>
        <p class="text-muted-foreground font-semibold text-lg">Loading...</p>
      </div>
    </div>
  {:else if pageComponent() === "login"}
    <LoginPage />
  {:else}
    <BlogNavigation />
  <main class="lg:ml-20 transition-all duration-300 ease-in-out">
      <div class="mx-auto pl-2 pr-2 sm:pl-3 sm:pr-3 lg:pl-4 lg:pr-4 py-6 sm:py-8 max-w-10xl">
        {#if pageComponent() === "list"}
          <BlogListPage />

      {:else if pageComponent() === "create"}
        <div class="space-y-6 sm:space-y-8 animate-slide-up">
          <div class="relative space-y-3 pb-6 border-b-2 border-border/50">
            <div class="absolute -top-4 -left-4 w-24 h-24 bg-emerald-500/5 rounded-full blur-3xl"></div>
            <h1 class="relative text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-linear-to-r from-emerald-600 dark:from-emerald-400 to-primary bg-clip-text text-transparent">
              Create New Post
            </h1>
            <p class="relative text-base sm:text-lg text-muted-foreground font-medium leading-relaxed">
              Share your thoughts and insights with the world
            </p>
          </div>
          <BlogCreatePage blogId={blogId()} />
        </div>
      {:else if pageComponent() === "dashboard"}
        <BlogDashboardPage />
      {:else if pageComponent() === "detail" && blogId()}
        <BlogDetailPage blogId={blogId() || "1"} />
      {:else if pageComponent() === "edit" && blogId()}
        <div class="space-y-6 sm:space-y-8 animate-slide-up">
          <div class="relative space-y-3 pb-6 border-b-2 border-border/50">
            <div class="absolute -top-4 -left-4 w-24 h-24 bg-amber-500/5 rounded-full blur-3xl"></div>
            <h1 class="relative text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-linear-to-r from-amber-600 dark:from-amber-400 to-primary bg-clip-text text-transparent">
              Edit Post
            </h1>
            <p class="relative text-base sm:text-lg text-muted-foreground font-medium leading-relaxed">
              Update your blog post content
            </p>
          </div>
          <BlogCreatePage blogId={blogId()} />
        </div>
        {/if}
      </div>
    </main>
  {/if}
</div>
