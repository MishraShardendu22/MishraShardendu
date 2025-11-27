<script lang="ts">
  import Badge from "./ui/badge.svelte";
  import Avatar from "./ui/avatar.svelte";
  import Button from "./ui/button.svelte";
  import OptimizedImage from "./OptimizedImage.svelte";
  import { MessageCircle, Calendar, ArrowRight, Clock } from "lucide-svelte";
  import { marked } from "marked";
  import DOMPurify from "dompurify";
  import type { Blog as ApiBlog } from "../api";
  import { resolveImageUrl } from "../utils/image";

  type Blog = ApiBlog;

  let {
    blog,
    onReadMore,
    customActions,
    maxExcerptLength = 150,
    isFirstCard = false,
  }: {
    blog: Blog;
    onReadMore?: (blogId: string) => void;
    customActions?: any;
    maxExcerptLength?: number;
    isFirstCard?: boolean; // Mark first card for LCP optimization
  } = $props();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase();
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  const parseMarkdownExcerpt = (markdown: string): string => {
    if (!markdown) return "";
    
    const html = marked.parse(markdown, { async: false }) as string;
    const sanitized = DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
    const cleaned = sanitized.replace(/\s+/g, " ").trim();
    
    if (cleaned.length <= maxExcerptLength) return cleaned;
    return cleaned.substring(0, maxExcerptLength).trim() + "...";
  };

  const excerpt = $derived(
    blog.content ? parseMarkdownExcerpt(blog.content) : ""
  );
  
  const readingTime = $derived(
    blog.content ? getReadingTime(blog.content) : 0
  );
</script>

<article
  class="group relative flex flex-col rounded-xl border border-border bg-card text-card-foreground shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/50 h-full"
>
  <!-- Image Section -->
  <div class="relative aspect-video w-full overflow-hidden bg-muted">
    {#if blog.image}
      <OptimizedImage
        src={resolveImageUrl(blog.image)}
        alt={blog.title}
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading={isFirstCard ? "eager" : "lazy"}
        isLCP={isFirstCard}
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    {:else}
      <div class="w-full h-full bg-linear-to-br from-primary/10 to-muted flex items-center justify-center">
        <span class="text-4xl opacity-20">📝</span>
      </div>
    {/if}
    
    <!-- Overlay Badge for Reading Time -->
    {#if readingTime > 0}
      <div class="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
        <Clock class="w-3 h-3" />
        <span>{readingTime} min</span>
      </div>
    {/if}
  </div>

  <!-- Content Section -->
  <div class="flex flex-1 flex-col p-5">
    <!-- Tags -->
    {#if blog.tags && blog.tags.length > 0}
      <div class="flex flex-wrap gap-2 mb-3">
        {#each blog.tags.slice(0, 3) as tag}
          <Badge variant="secondary" class="text-xs font-medium px-2 py-0.5 bg-secondary/10 text-secondary-foreground hover:bg-secondary/20 border-transparent">
            {tag}
          </Badge>
        {/each}
        {#if blog.tags.length > 3}
          <span class="text-xs text-muted-foreground self-center">+{blog.tags.length - 3}</span>
        {/if}
      </div>
    {/if}

    <!-- Title -->
    <h3 class="text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
      {blog.title}
    </h3>

    <!-- Excerpt -->
    {#if excerpt}
      <p class="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1 leading-relaxed">
        {excerpt}
      </p>
    {/if}

    <!-- Footer -->
    <div class="mt-auto pt-4 border-t border-border flex items-center justify-between gap-4">
      <div class="flex items-center gap-2 min-w-0">
        <Avatar
          class="w-8 h-8 shrink-0 ring-2 ring-background"
          src={resolveImageUrl(blog.author?.profileImage || blog.author?.image || blog.author?.avatar || blog.author?.profile?.avatar || undefined)}
          fallback={blog.author?.name ? getInitials(blog.author.name, blog.author.name) : blog.author?.email?.charAt(0).toUpperCase() || "U"}
        />
        <div class="flex flex-col min-w-0">
          <span class="text-sm font-medium truncate">{blog.author?.name || "Unknown"}</span>
          <span class="text-xs text-muted-foreground">{formatDate(blog.createdAt)}</span>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <div class="flex items-center gap-1 text-xs text-muted-foreground mr-2" title="Comments">
          <MessageCircle class="w-3.5 h-3.5" />
          <span>{blog.comments ?? 0}</span>
        </div>

        {#if customActions}
          {@render customActions?.()}
        {/if}
        
        <Button
          variant="ghost"
          size="sm"
          onclick={() => onReadMore?.(blog.id.toString())}
          className="shrink-0 hover:bg-primary/10 hover:text-primary group/btn"
        >
          Read
          <ArrowRight class="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </div>
    </div>
  </div>
</article>
