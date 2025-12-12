<script lang="ts">
  import { onMount } from "svelte";
  import { authStore } from "../auth";
  import Input from "./ui/input.svelte";
  import Button from "./ui/button.svelte";
  import BlogCard from "./BlogCard.svelte";
  import { blogApi, type Blog } from "../api";
  import { BookOpen, Plus, Search } from "lucide-svelte";
  import { navigateTo } from "../navigation";

  let error = $state("");
  let loading = $state(true);
  let searchTerm = $state("");
  let isOwner = $state(false);
  let blogs = $state<Blog[]>([]);
  let currentPage = $state(1);
  const pageSize = 6;
  let isVisible = $state(false);

  const basePath = typeof window !== 'undefined' && window.location.pathname.startsWith('/blog') ? '/blog' : '';

  // Subscribe to auth store
  authStore.subscribe((state) => {
    isOwner = state.user?.isOwner || false;
  });

  // Fetch blogs on mount - only if component is actually visible
  onMount(async () => {
    isVisible = true;
    await loadBlogs();
  });

  const loadBlogs = async () => {
    // Don't load if not visible
    if (!isVisible) {
      loading = false;
      return;
    }

    try {
      loading = true;
      error = "";
      const response = await blogApi.getAllBlogs();
      if (response.success && response.data) {
        blogs = response.data;
      }
    } catch (err: any) {
      console.error("Failed to load blogs:", err);
      error = err.message || "Failed to load blogs";
    } finally {
      loading = false;
    }
  };

  const filteredBlogs = $derived(
    blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Pagination helpers
  const totalPages = $derived(Math.max(1, Math.ceil(filteredBlogs.length / pageSize)));
  $effect(() => {
    // clamp currentPage if filtered results shrink
    if (currentPage > totalPages) currentPage = totalPages;
  });
</script>

<div class="space-y-6 md:space-y-8 animate-slide-up">
  <!-- Page header with inline controls -->
  <div class="flex items-start justify-between gap-4">
    <div class="space-y-2">
      <h1 class="text-3xl sm:text-4xl font-bold tracking-tight bg-linear-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent drop-shadow-sm">Blog Posts</h1>
      <p class="text-base text-muted-foreground font-medium">Explore articles about web development, programming, and tech insights</p>
    </div>

    <div class="flex items-center gap-3">
  <div class="relative flex-1 min-w-0 hidden lg:block" style="min-width: 360px;">
        <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
        <Input
          placeholder="Search blogs..."
          bind:value={searchTerm}
          class="pl-10 pr-4 h-12 bg-card/80 backdrop-blur-sm border-2 border-border/60 focus:border-primary/50 hover:border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground transition-all duration-300 shadow-sm w-full font-medium"
        />
      </div>

      {#if isOwner}
        <Button
          onclick={() => (window.location.href = `${basePath}/create`)}
          className="h-12 px-5 bg-linear-to-r from-primary to-primary/90 text-primary-foreground font-bold shadow-lg rounded-xl text-sm shrink-0 hidden lg:inline-flex"
        >
          <Plus class="w-4 h-4" />
          <span class="ml-2">Create</span>
        </Button>
      {/if}
    </div>
  </div>
  {#if error}
    <div class="p-4 bg-destructive/10 border-2 border-destructive/30 rounded-xl shadow-lg backdrop-blur-sm">
      <p class="text-destructive text-sm font-semibold">{error}</p>
    </div>
  {/if}

  <!-- legacy search area removed (controls moved into header) -->

  {#if loading}
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
      {#each Array(6) as _, i}
        <div
          class="bg-card/80 backdrop-blur-sm border border-border/60 rounded-xl overflow-hidden shadow-lg p-5 space-y-4 animate-pulse"
        >
          <div class="w-10 h-10 bg-linear-to-br from-muted/70 to-muted/50 rounded-full"></div>
          <div class="h-5 w-5/6 bg-linear-to-r from-muted/70 to-muted/50 rounded-lg"></div>
          <div class="h-4 w-full bg-linear-to-r from-muted/70 to-muted/50 rounded-lg"></div>
          <div class="flex gap-2">
            <div class="h-6 w-16 bg-linear-to-r from-muted/70 to-muted/50 rounded-full"></div>
            <div class="h-6 w-20 bg-linear-to-r from-muted/70 to-muted/50 rounded-full"></div>
          </div>
        </div>
      {/each}
    </div>
  {:else if filteredBlogs.length === 0}
    <div class="text-center py-12 sm:py-16 md:py-24 px-4 animate-slide-up">
      <div class="relative w-20 h-20 sm:w-28 sm:h-28 mx-auto mb-6 sm:mb-8">
        <div
          class="absolute inset-0 bg-linear-to-br from-primary/20 via-primary/10 to-accent/10 rounded-3xl blur-2xl animate-pulse-soft"
        ></div>
        <div
          class="relative w-20 h-20 sm:w-28 sm:h-28 bg-linear-to-br from-primary/20 via-primary/10 to-accent/5 rounded-3xl flex items-center justify-center shadow-2xl border-2 border-primary/20"
        >
          <BookOpen class="w-10 h-10 sm:w-14 sm:h-14 text-primary drop-shadow-md" />
        </div>
      </div>
      <h3 class="text-2xl sm:text-3xl font-bold bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-3 sm:mb-4">
        {searchTerm ? "No blogs found" : "No blogs yet"}
      </h3>
      <p class="text-muted-foreground text-sm sm:text-base mb-8 sm:mb-10 max-w-md mx-auto leading-relaxed px-4 font-medium">
        {searchTerm
          ? "Try adjusting your search terms or browse all blogs"
          : "Create your first blog post to share your thoughts and insights with the world"}
      </p>
      {#if !searchTerm && isOwner}
        <Button
          onclick={() => navigateTo(`${basePath}/create`)}
          className="h-12 sm:h-13 px-7 sm:px-9 bg-linear-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-bold shadow-xl hover:shadow-2xl shadow-primary/30 transition-all duration-300 gap-2 sm:gap-2.5 rounded-xl text-sm sm:text-base hover:scale-105 hidden lg:inline-flex"
        >
          <Plus class="w-5 h-5 sm:w-6 sm:h-6" />
          Create First Post
        </Button>
      {/if}
    </div>
  {:else}
    <div class="blog-grid">
      {#each filteredBlogs.slice((currentPage-1)*pageSize, currentPage*pageSize) as blog, index (blog.id)}
        <BlogCard 
          {blog} 
          onReadMore={(blogId) => navigateTo(`${basePath}/read/${blogId}`)}
          isFirstCard={currentPage === 1 && index === 0}
        />
      {/each}
    </div>

    <!-- Pagination -->
    {#if filteredBlogs.length > pageSize}
      <div class="mt-6 flex items-center justify-center gap-3">
        <Button size="sm" variant="outline" onclick={() => currentPage = Math.max(1, currentPage - 1)} className="px-3">
          Prev
        </Button>

        {#each Array(totalPages) as _, i}
          {@const page = i + 1}
          <!-- svelte-ignore event_directive_deprecated -->
          <button
            class={page === currentPage ? 'px-3 py-1 rounded-lg bg-primary text-primary-foreground font-semibold' : 'px-3 py-1 rounded-lg bg-card/80 border border-border'}
            on:click={() => (currentPage = page)}
          >
            {page}
          </button>
        {/each}

        <Button size="sm" variant="outline" onclick={() => currentPage = Math.min(totalPages, currentPage + 1)} className="px-3">
          Next
        </Button>
      </div>
    {/if}
  {/if}
</div>
