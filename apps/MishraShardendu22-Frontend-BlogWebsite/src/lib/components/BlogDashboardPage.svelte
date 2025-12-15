<script lang="ts">
  import {
    Edit,
    Trash2,
    Search,
    BookOpen,
    BarChart3,
    MessageCircle,
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
    <div class="flex items-start justify-between gap-4">
      <div>
    <h1 class="text-3xl sm:text-4xl font-bold tracking-tight bg-linear-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">Dashboard</h1>
        <p class="text-sm text-muted-foreground">Manage your blog posts and view analytics</p>
      </div>

      <div class="flex items-center gap-3">
          <!-- hide large search on very small screens -->
            <div class="relative hidden lg:block" style="min-width:280px;">
          <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input placeholder="Search your posts..." bind:value={searchTerm} class="pl-10 h-11" />
        </div>
          <!-- Desktop Create button; on small screens show smaller icon handled by mobile menu -->
        <Button onclick={() => (window.location.href = `${basePath}/create`)} className="h-11 px-6 bg-linear-to-r from-primary to-primary/90 text-primary-foreground rounded-lg hidden lg:inline-flex">Create Post</Button>
      </div>
    </div>
    
    <!-- Stats Cards -->
    <div class="modern-stats mt-4">
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
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {#each filteredBlogs as blog (blog.id)}
          <div class="blog-card-improved">
            <!-- Title above -->
            <div class="mb-2">
              <div class="flex items-center gap-3 min-w-0">
                <div class="min-w-0">
                  <h4 class="text-sm sm:text-base font-semibold text-foreground mb-0 line-clamp-2 truncate">
                    {blog.title}
                  </h4>
                </div>
              </div>
            </div>

            <!-- Tags (1/4) and buttons (3/4) below title -->
            <div class="mt-3 flex items-start gap-3 flex-wrap">
              <div class="tags w-full sm:w-1/4">
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

              <div class="actions w-full sm:w-3/4 flex justify-end">
                <div class="card-actions w-full max-w-none flex gap-2 flex-wrap justify-end">
                  <button type="button" class="view-btn px-3 py-2 rounded-md bg-primary/10 text-primary" onclick={() => (window.location.href = `${basePath}/read/${blog.id}`)}>View</button>
                  <button type="button" class="edit-btn p-2 rounded-md border" onclick={() => (window.location.href = `${basePath}/read/${blog.id}/edit`)}><Edit class="w-4 h-4" /></button>
                  <button type="button" class="delete-btn p-2 rounded-md border text-destructive" onclick={() => handleDelete(blog.id)} disabled={deletingBlogId === blog.id}><Trash2 class="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  {/if}
</div>
