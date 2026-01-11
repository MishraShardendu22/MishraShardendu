<script lang="ts">
  import {
    Edit,
    Trash2,
    Search,
    BookOpen,
    BarChart3,
    MessageCircle,
    Plus,
  } from "lucide-svelte";
  import { toast } from "../toast";
  import { onMount } from "svelte";
  import { confirm } from "../confirm";
  import Badge from "./ui/badge.svelte";
  import Input from "./ui/input.svelte";
  import Button from "./ui/button.svelte";
  import { getBasePath } from "../navigation";
  import { Loading, ErrorState, EmptyState } from "./shared";
  import { blogApi, statsApi, type Blog, type BlogStats } from "../api";

  const basePath = getBasePath();
  
  let stats = $state<BlogStats>({ 
    totalBlogs: 0, 
    popularTags: [],
    recentPosts: [],
    totalComments: 0,
  });
  let error = $state("");
  let loading = $state(true);
  let searchTerm = $state("");
  let isVisible = $state(false);
  let blogs = $state<Blog[]>([]);
  let deletingBlogId = $state<number | null>(null);

  onMount(async () => {
    isVisible = true;
    await loadData();
  });

  const loadData = async () => {
    // Don't load if not visible
    if (!isVisible) {
      loading = false;
      return;
    }

    try {
      loading = true;
      error = "";
      
      // Load blogs and stats in parallel
      const [blogsResponse, statsResponse] = await Promise.all([
        blogApi.getAllBlogs(),
        statsApi.getBlogStats(),
      ]);

      if (blogsResponse.success && blogsResponse.data) {
        blogs = blogsResponse.data;
      }

      if (statsResponse.success && statsResponse.data) {
        stats = statsResponse.data;
      }
    } catch (err: any) {
      console.error("Failed to load dashboard data:", err);
      error = err.message || "Failed to load dashboard data";
    } finally {
      loading = false;
    }
  };

  const filteredBlogs = $derived(
    blogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalComments = $derived(stats.totalComments);

  const handleDelete = async (blogId: number) => {
    const ok = await confirm("Are you sure you want to delete this blog post?", "Delete post")
    if (!ok) return;

    try {
      deletingBlogId = blogId;
      await blogApi.deleteBlog(blogId);
      toast.success("Blog post deleted");
      await loadData();
    } catch (err: any) {
      console.error("Failed to delete blog:", err);
      toast.error(err.message || "Failed to delete blog");
    } finally {
      deletingBlogId = null;
    }
  };
</script>

<div class="space-y-3 md:space-y-4">
  {#if loading}
    <Loading title="Loading dashboard..." size="lg" />
  {:else if error}
    <ErrorState message={error} onRetry={loadData} />
  {:else}
    <!-- Header with actions -->
    <div class="space-y-4 md:space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div class="space-y-1">
          <h1 class="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">Dashboard</h1>
          <p class="text-sm sm:text-base text-muted-foreground">Manage your blog posts and view analytics</p>
        </div>
        <!-- Desktop Create button -->
        <Button onclick={() => (window.location.href = `${basePath}/create`)} className="h-11 px-6 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-lg hidden lg:inline-flex gap-2">
          <Plus class="w-4 h-4" />
          Create Post
        </Button>
      </div>

      <!-- Search bar - full width on mobile -->
      <div class="relative w-full">
        <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input placeholder="Search your posts..." bind:value={searchTerm} class="pl-10 h-11 w-full" />
      </div>
    </div>
    
    <!-- Stats Cards -->
    <div class="modern-stats mt-6">
      <div class="stat-card">
        <div class="flex items-center justify-between">
          <div>
            <p class="stat-label">Total Posts</p>
            <p class="stat-number">{blogs.length}</p>
          </div>
          <div class="stat-icon">
            <div class="stat-icon-inner">
              <BookOpen class="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div class="stat-card">
        <div class="flex items-center justify-between">
          <div>
            <p class="stat-label">Total Comments</p>
            <p class="stat-number">{totalComments}</p>
          </div>
          <div class="stat-icon">
            <div class="stat-icon-inner from-blue-500 to-blue-700">
              <MessageCircle class="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div class="stat-card">
        <div class="flex items-center justify-between">
          <div>
            <p class="stat-label">Avg. Comments</p>
            <p class="stat-number">{blogs.length > 0 ? (totalComments / blogs.length).toFixed(1) : "0"}</p>
          </div>
          <div class="stat-icon">
            <div class="stat-icon-inner from-emerald-400 to-emerald-600">
              <BarChart3 class="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Blog List -->
    {#if filteredBlogs.length === 0}
      <EmptyState
        icon={BookOpen}
        title="No posts found"
        description={searchTerm ? "Try a different search term" : "Create your first blog post"}
        actionLabel={!searchTerm ? "Create First Post" : undefined}
        onAction={!searchTerm ? () => (window.location.href = `${basePath}/create`) : undefined}
      />
    {:else}
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {#each filteredBlogs as blog (blog.id)}
          <div class="blog-card-dashboard">
            <!-- Title and metadata -->
            <div class="mb-4">
              <h4 class="text-base sm:text-lg font-semibold text-foreground mb-2 line-clamp-2">
                {blog.title}
              </h4>
              <div class="flex items-center gap-3 text-xs text-muted-foreground">
                <span class="flex items-center gap-1">
                  <BookOpen class="w-3 h-3" />
                  {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                {#if blog.comments !== undefined}
                  <span class="flex items-center gap-1">
                    <MessageCircle class="w-3 h-3" />
                    {blog.comments} comments
                  </span>
                {/if}
              </div>
            </div>

            <!-- Tags and buttons -->
            <div class="flex flex-col sm:flex-row items-start gap-3">
              <div class="tags flex-1 w-full sm:w-auto">
                {#if blog.tags && blog.tags.length > 0}
                  <div class="flex flex-wrap gap-2">
                    {#each blog.tags.slice(0, 3) as tag}
                      <Badge variant="secondary" class="text-xs px-2 py-0.5">{tag}</Badge>
                    {/each}
                    {#if blog.tags.length > 3}
                      <Badge variant="outline" class="text-xs px-2 py-0.5">+{blog.tags.length - 3}</Badge>
                    {/if}
                  </div>
                {/if}
              </div>

              <div class="actions flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  class="flex-1 sm:flex-initial"
                  onclick={() => (window.location.href = `${basePath}/read/${blog.id}`)}
                >
                  View
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onclick={() => (window.location.href = `${basePath}/read/${blog.id}/edit`)} 
                  aria-label="Edit blog post"
                >
                  <Edit class="w-4 h-4" aria-hidden="true" />
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive"
                  onclick={() => handleDelete(blog.id)} 
                  disabled={deletingBlogId === blog.id} 
                  aria-label="Delete blog post"
                >
                  <Trash2 class="w-4 h-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  {/if}
</div>
