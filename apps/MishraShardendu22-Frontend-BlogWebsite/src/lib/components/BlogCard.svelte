<script lang="ts">
  import { marked } from "marked";
  import Avatar from "./ui/avatar.svelte";
  import DOMPurify from "isomorphic-dompurify";
  import type { Blog as ApiBlog } from "../api";
  import { resolveImageUrl } from "../utils/image";
  import OptimizedImage from "./OptimizedImage.svelte";
  import { MessageCircle, Clock } from "lucide-svelte";

  type Blog = ApiBlog;

  let {
    blog,
    onReadMore,
    isFirstCard = false,
    maxExcerptLength = 140,
  }: {
    blog: Blog;
    customActions?: any;
    isFirstCard?: boolean;
    maxExcerptLength?: number;
    onReadMore?: (blogId: string) => void;
  } = $props();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase();
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
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

<button
  type="button"
  class="group flex flex-col bg-card/80 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer border border-border hover:border-primary/30 w-full text-left"
  onclick={() => onReadMore?.(blog.id.toString())}
>
  <!-- Card Image Header -->
  <div class="relative w-full aspect-[16/9] overflow-hidden bg-muted">
    {#if blog.image}
      <OptimizedImage
        src={resolveImageUrl(blog.image)}
        alt={blog.title}
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading={isFirstCard ? "eager" : "lazy"}
        isLCP={isFirstCard}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    {:else}
      <div class="w-full h-full bg-linear-to-br from-primary/20 to-accent/10 flex items-center justify-center">
        <span class="text-primary/40 font-semibold text-lg tracking-widest uppercase">Blog Post</span>
      </div>
    {/if}
    <!-- Overlay for metadata tag if needed in future -->
  </div>

  <!-- Card Body -->
  <div class="flex flex-col flex-1 p-5 md:p-6">
    <div class="flex items-center gap-2 mb-3 text-xs font-medium text-muted-foreground">
      <span class="text-primary">{formatDate(blog.createdAt)}</span>
      <span class="w-1 h-1 rounded-full bg-border-strong"></span>
      <div class="flex items-center gap-1">
        <Clock class="w-3.5 h-3.5" />
        <span>{readingTime} min read</span>
      </div>
    </div>

    <h3 class="text-xl md:text-2xl font-bold mb-3 text-foreground line-clamp-2 leading-tight group-hover:text-primary transition-colors duration-300">
      {blog.title}
    </h3>

    {#if excerpt}
      <p class="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
        {excerpt}
      </p>
    {/if}

    <!-- Footer -->
    <div class="flex items-center justify-between pt-4 border-t border-border mt-auto">
      <div class="flex items-center gap-3 min-w-0">
        <Avatar
          class="w-8 h-8 shrink-0 ring-2 ring-background shadow-sm"
          src={resolveImageUrl(blog.author?.profileImage || blog.author?.image || blog.author?.avatar || blog.author?.profile?.avatar || undefined)}
          fallback={blog.author?.name ? getInitials(blog.author.name, blog.author.name) : blog.author?.email?.charAt(0).toUpperCase() || "U"}
        />
        <div class="flex flex-col min-w-0">
          <span class="text-sm font-medium text-foreground truncate">{blog.author?.name || "Unknown"}</span>
        </div>
      </div>

      <div class="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-2.5 py-1.5 rounded-full transition-colors group-hover:bg-primary/10 group-hover:text-primary">
        <MessageCircle class="w-3.5 h-3.5" />
        <span class="font-medium">{blog.comments ?? 0}</span>
      </div>
    </div>
  </div>
</button>
