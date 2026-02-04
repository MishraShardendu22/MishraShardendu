<script lang="ts">
  import { marked } from "marked";
  import { toast } from "../toast";
  import { onMount } from "svelte";
  import { authStore } from "../auth";
  import { confirm } from "../confirm";
  import Badge from "./ui/badge.svelte";
  import Button from "./ui/button.svelte";
  import Avatar from "./ui/avatar.svelte";
  import { navigateTo } from "../navigation";
  import { Loading, ErrorState } from "./shared";
  import OptimizedImage from "./OptimizedImage.svelte";
  import { validateCommentContent } from "../validation";
  import { blogApi, commentApi, type Blog, type Comment } from "../api";
  import { updateSEO, generateBlogPostStructuredData, insertStructuredData, truncateDescription } from "../seo";
  import { Calendar, MessageCircle, Send, Trash, Share2, Check, Edit, ChevronDown, ChevronUp } from "lucide-svelte";

  const basePath = '';
  import { resolveImageUrl } from "../utils/image";

  let { blogId }: { blogId: string } = $props();

  let blog = $state<Blog | null>(null);
  let renderedContent = $state<string>("");
  let comments = $state<Comment[]>([]);
  let loading = $state(true);
  let shareSuccess = $state(false);
  let error = $state("");
  let newComment = $state("");
  let isSubmittingComment = $state(false);
  let currentUser = $state<any>(null);
  let commentError = $state("");
  let showInfoPanel = $state(false);
  let showTags = $state(false);
  let textareaRef = $state<HTMLTextAreaElement | null>(null);
  let isVisible = $state(false);

  authStore.subscribe((state) => {
    currentUser = state.user;
  });

  onMount(async () => {
    isVisible = true;
    await loadBlog();
    await loadComments();
  });

  const loadBlog = async () => {
    // Don't load if not visible
    if (!isVisible) {
      loading = false;
      return;
    }

    try {
      loading = true;
      error = "";
      const response = await blogApi.getBlogById(parseInt(blogId));
      if (response.success && response.data) {
        blog = response.data;
        const result = marked(blog.content || "");
        if (result instanceof Promise) {
          result.then(html => { renderedContent = html; });
        } else {
          renderedContent = result;
        }
        
        const baseUrl = 'https://blogs.mishrashardendu22.is-a.dev';
        const blogUrl = `${baseUrl}/read/${blogId}`;
        const description = truncateDescription(blog.content, 160);
        const authorName = blog.author?.name || 'Shardendu Mishra';
        const tags = Array.isArray(blog.tags) ? blog.tags : [];
        const keywords = tags.length > 0 
          ? `${tags.join(', ')}, programming, software development, tech article` 
          : 'programming, software development, tech article, coding tutorial';
        
        updateSEO({
          title: `${blog.title} | Shardendu Mishra Blog`,
          description: description,
          url: blogUrl,
          type: 'article',
          author: authorName,
          publishedTime: blog.createdAt,
          modifiedTime: blog.updatedAt,
          tags: tags,
          keywords: keywords,
        });

        const structuredData = generateBlogPostStructuredData({
          title: blog.title,
          description: description,
          author: authorName,
          datePublished: blog.createdAt,
          dateModified: blog.updatedAt,
          url: blogUrl,
        });
        insertStructuredData(structuredData);
      }
    } catch (err: any) {
      console.error("Failed to load blog:", err);
      error = err.message || "Failed to load blog";
      toast.error(err.message || "Failed to load blog");
    } finally {
      loading = false;
    }
  };

  const loadComments = async () => {
    try {
      const response = await commentApi.getCommentsByBlogId(parseInt(blogId));
      if (response.success && response.data) {
        comments = response.data;
      }
    } catch (err: any) {
      console.error("Failed to load comments:", err);
    }
  };

  const handleSubmitComment = async () => {
    if (!currentUser) {
      toast.warning("Please login to comment");
      return;
    }

    commentError = "";

    const validation = validateCommentContent(newComment);
    if (!validation.isValid) {
      commentError = validation.error || "Invalid comment";
      return;
    }

    try {
      isSubmittingComment = true;
      const response = await commentApi.createComment(parseInt(blogId), newComment.trim());
      if (response.success) {
        toast.success("Comment added successfully!");
        await loadComments();
        newComment = "";
        if (textareaRef) {
          textareaRef.style.height = 'auto';
        }
      }
    } catch (err: any) {
      console.error("Failed to submit comment:", err);
      
      if (err.message?.includes("verif")) {
        toast.error("Please verify your email before commenting");
      } else {
        toast.error(err.message || "Failed to submit comment");
      }
    } finally {
      isSubmittingComment = false;
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    const ok = await confirm("Are you sure you want to delete this comment?", "Delete comment")
    if (!ok) return;

    try {
      await commentApi.deleteComment(parseInt(blogId), commentId);
      toast.success("Comment deleted successfully");
      await loadComments();
    } catch (err: any) {
      console.error("Failed to delete comment:", err);
      toast.error(err.message || "Failed to delete comment");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
      shareSuccess = true;
      setTimeout(() => (shareSuccess = false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const scrollToComments = () => {
    const commentsSection = document.getElementById('comments-section');
    if (commentsSection) {
      commentsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const autoResize = (e: Event) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = 'auto';
    target.style.height = target.scrollHeight + 'px';
  };

  const editUrl = $derived(() => {
    if (!blog) return '';
    return `/read/${blog.id}/edit`;
  });

  const canEdit = $derived(() => {
    return blog && currentUser && (currentUser.isOwner || currentUser.id === blog.authorId);
  });
</script>

{#if blog}
  <!-- Floating Info Button: bottom-left on mobile/tablet, top-right on lg+ -->
  <div class="fixed z-50">

    {#if showInfoPanel}
      <!-- Info Panel Popover: adapt position based on screen size -->
      <div class="absolute z-50">
        <div class="lg:fixed lg:top-20 lg:right-6 lg:w-80 w-72 right-4 bottom-20 bg-card border border-border rounded-lg shadow-xl overflow-hidden">
          <div class="p-4 space-y-4">
            <!-- Author Section -->
            <div class="pb-3 border-b border-border">
              <p class="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Author</p>
              <div class="flex items-center gap-3">
                <Avatar
                  src={resolveImageUrl(blog.author?.profileImage || blog.author?.image || blog.author?.avatar || blog.author?.profile?.avatar || undefined)}
                  fallback={blog.author?.name?.charAt(0) || "U"}
                  class="w-12 h-12 border-2 border-primary/20"
                />
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-sm truncate">{blog.author?.name || "Unknown"}</p>
                  <p class="text-xs text-muted-foreground truncate">{blog.author?.email || ""}</p>
                </div>
              </div>
            </div>

            <!-- Post Details -->
            <div class="space-y-2 pb-3 border-b border-border">
              <p class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Details</p>
              
              <div class="flex items-center gap-2 text-sm">
                <Calendar class="w-4 h-4 text-muted-foreground" />
                <span class="text-muted-foreground">{formatDate(blog.createdAt)}</span>
              </div>

              <div class="flex items-center gap-2 text-sm">
                <MessageCircle class="w-4 h-4 text-muted-foreground" />
                <span class="text-muted-foreground">{comments.length} comments</span>
              </div>
            </div>

            <!-- Tags Section -->
            {#if blog.tags && blog.tags.length > 0}
              <div class="pb-3 border-b border-border">
                <button
                  type="button"
                  class="w-full flex items-center justify-between text-left mb-2"
                  onclick={() => showTags = !showTags}
                >
                  <p class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Tags ({blog.tags.length})
                  </p>
                  {#if showTags}
                    <ChevronUp class="w-4 h-4 text-muted-foreground" />
                  {:else}
                    <ChevronDown class="w-4 h-4 text-muted-foreground" />
                  {/if}
                </button>

                {#if showTags}
                  <div class="flex flex-wrap gap-1.5 mt-2">
                    {#each blog.tags as tag}
                      <Badge variant="secondary" class="text-xs px-2 py-0.5">{tag}</Badge>
                    {/each}
                  </div>
                {/if}
              </div>
            {/if}

            <!-- Action Buttons -->
            <div class="space-y-2">
              {#if canEdit()}
                <Button 
                  variant="secondary" 
                  onclick={() => window.location.href = editUrl()} 
                  size="sm"
                  className="w-full"
                >
                  <Edit class="w-4 h-4 mr-2" />
                  Edit Post
                </Button>
              {/if}

              <Button 
                variant="outline" 
                onclick={handleShare} 
                size="sm"
                className="w-full"
              >
                {#if shareSuccess}
                  <Check class="w-4 h-4 mr-2" />
                  Copied!
                {:else}
                  <Share2 class="w-4 h-4 mr-2" />
                  Share Post
                {/if}
              </Button>

              <Button 
                variant="default" 
                onclick={scrollToComments} 
                size="sm"
                className="w-full"
              >
                <MessageCircle class="w-4 h-4 mr-2" />
                Go to Comments
              </Button>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
{/if}

<!-- Mobile back button (fixed) -->
<div class="lg:hidden fixed top-4 left-4 z-50">
  <Button variant="ghost" size="icon" onclick={() => history.back()} className="w-10 h-10" aria-label="Go back to previous page">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0L3.586 10l4.707-4.707a1 1 0 011.414 1.414L6.414 10l3.293 3.293a1 1 0 010 1.414z" clip-rule="evenodd"/></svg>
  </Button>
</div>

<div class="w-full max-w-7xl mx-auto px-2 py-8 lg:px-3 overflow-x-hidden">
  {#if loading}
    <Loading title="Loading blog post..." size="lg" />
  {:else if error && !blog}
    <ErrorState message={error} onRetry={loadBlog} />
  {:else if blog}

<article>
  {#if blog.image}
    <div class="group relative rounded-lg overflow-hidden border border-border mb-8 h-62.5">
      <OptimizedImage
        src={resolveImageUrl(blog.image)}
        alt={blog.title}
        class="w-full h-full transition-all duration-300 group-hover:blur-sm group-hover:scale-110"
        objectFit="cover"
        isLCP={true}
        loading="eager"
        fetchpriority="high"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
      />
      <div class="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>
      <header class="absolute inset-0 flex items-center justify-center p-6">
        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center leading-tight drop-shadow-2xl">
          {blog.title}
        </h1>
      </header>
    </div>
  {:else}
    <header class="mb-8">
      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
        {blog.title}
      </h1>
    </header>
  {/if}

  <!-- Article Content -->
  <div class="prose prose-lg dark:prose-invert max-w-none mb-12
              prose-headings:font-bold prose-headings:tracking-tight
              prose-h1:text-5xl prose-h1:mt-12 prose-h1:mb-8
              prose-h2:text-4xl prose-h2:mt-10 prose-h2:mb-6 prose-h2:border-b prose-h2:border-border prose-h2:pb-3
              prose-h3:text-3xl prose-h3:mt-8 prose-h3:mb-5
              prose-h4:text-2xl prose-h4:mt-6 prose-h4:mb-4
              prose-h5:text-xl prose-h5:mt-5 prose-h5:mb-3
              prose-h6:text-lg prose-h6:mt-4 prose-h6:mb-2
              prose-p:text-base prose-p:leading-relaxed prose-p:mb-5
              prose-strong:font-semibold prose-strong:text-foreground
              prose-code:text-sm prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-primary
              prose-pre:bg-muted prose-pre:border prose-pre:border-border
              prose-a:text-primary prose-a:font-medium hover:prose-a:underline prose-a:no-underline
              prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground
              prose-ul:my-5 prose-ol:my-5 prose-li:my-2
              prose-img:rounded-lg prose-img:my-8">
    {@html renderedContent}
  </div>
</article>


    <!-- Comments Section -->
    <section id="comments-section" class="bg-card border border-border rounded-xl p-5 sm:p-6 scroll-mt-20 shadow-sm">
      <h2 class="text-xl font-bold mb-5 flex items-center gap-2">
        <MessageCircle class="w-5 h-5" />
        Comments ({comments.length})
      </h2>

      {#if error}
        <div class="mb-4 p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
          <p class="text-destructive text-sm">{error}</p>
        </div>
      {/if}

      {#if currentUser && currentUser.isVerified}
        <div class="mb-6 p-4 bg-muted/30 border border-border rounded-lg">
          <div class="flex items-center gap-3">
            <Avatar
              src={resolveImageUrl(currentUser.profileImage || currentUser.image || currentUser.profile?.avatar || undefined)}
              fallback={currentUser?.name?.charAt(0) || "U"}
              class="w-9 h-9 border-2 border-primary/20 shrink-0"
            />
            <textarea
              bind:this={textareaRef}
              bind:value={newComment}
              oninput={autoResize}
              placeholder="Share your thoughts..."
              class="flex-1 text-sm bg-background border border-input rounded-md px-3 py-2 resize-none overflow-hidden min-h-9 focus:outline-none focus:ring-2 focus:ring-ring"
            ></textarea>
            <Button 
              onclick={handleSubmitComment}
              disabled={isSubmittingComment || !newComment.trim()}
              size="sm"
              className="shrink-0 h-9"
            >
              <Send class="w-3.5 h-3.5 mr-1.5" />
              Post
            </Button>
          </div>
        </div>
      {:else if currentUser && !currentUser.isVerified}
        <div class="mb-6 p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 rounded-lg">
          <p class="text-amber-800 dark:text-amber-200 text-xs">
            Please verify your email to post comments.
          </p>
        </div>
      {:else}
        <div class="mb-6 p-3 bg-muted border border-border rounded-lg">
          <p class="text-muted-foreground text-xs">
            Please <a href="/login" class="text-primary font-medium hover:underline">log in</a> to post comments.
          </p>
        </div>
      {/if}

      {#if comments.length > 0}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          {#each comments as comment}
            <div class="p-3 bg-muted/20 border border-border/50 rounded-lg hover:bg-muted/40 hover:border-border transition-all">
              <div class="flex items-start justify-between mb-2">
                <div class="flex items-center gap-2 min-w-0 flex-1">
                  <Avatar
                    src={resolveImageUrl(comment.user?.profileImage || comment.user?.image || comment.user?.profile?.avatar || undefined)}
                    fallback={comment.user?.name?.charAt(0) || "U"}
                    class="w-8 h-8 shrink-0"
                  />
                  <div class="min-w-0 flex-1">
                    <p class="font-semibold text-xs truncate">{comment.user?.name || "Unknown"}</p>
                    <p class="text-[10px] text-muted-foreground">{formatDate(comment.createdAt)}</p>
                  </div>
                </div>
                {#if currentUser && (currentUser.id === comment.userId || currentUser.isOwner)}
                  <Button
                    variant="ghost"
                    size="sm"
                    onclick={() => handleDeleteComment(comment.id)}
                    className="hover:bg-destructive/10 hover:text-destructive h-7 w-7 p-0 shrink-0"
                  >
                    <Trash class="w-3 h-3" />
                  </Button>
                {/if}
              </div>
              <p class="text-xs whitespace-pre-wrap leading-relaxed text-muted-foreground">{comment.content}</p>
            </div>
          {/each}
        </div>
      {:else}
        <div class="text-center py-10 bg-muted/10 rounded-lg border border-dashed border-border/50">
          <MessageCircle class="w-10 h-10 mx-auto mb-2 text-muted-foreground/40" />
          <p class="text-xs text-muted-foreground">No comments yet. Be the first to share your thoughts!</p>
        </div>
      {/if}
    </section>
  {:else}     
    <div class="text-center py-12">
      <h2 class="text-2xl font-bold mb-4">Blog not found</h2>
    </div>
  {/if}
</div>

<style>
  :global(.prose) {
    overflow-wrap: anywhere;
    word-break: break-word;
    -webkit-hyphens: auto;
    hyphens: auto;
  }

  :global(.prose pre) {
    white-space: pre-wrap;
    word-break: break-word;
    overflow: auto;
    padding: 0.75rem;
    border-radius: 0.5rem;
  }

  :global(.prose code) {
    word-break: break-word;
  }

  :global(.prose img),
  :global(.prose iframe) {
    max-width: 100%;
    height: auto;
  }
</style>
