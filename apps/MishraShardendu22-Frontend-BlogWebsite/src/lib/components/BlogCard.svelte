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
  class="group relative rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer h-[280px] border-2 border-primary/50"
  onclick={() => onReadMore?.(blog.id.toString())}
  role="button"
  tabindex="0"
  onkeydown={(e) => e.key === 'Enter' && onReadMore?.(blog.id.toString())}
>
  <!-- Background Image with Blur -->
  <div class="absolute inset-0">
    {#if blog.image}
      <OptimizedImage
        src={resolveImageUrl(blog.image)}
        alt={blog.title}
        class="w-full h-full object-cover scale-110 blur-sm"
        loading={isFirstCard ? "eager" : "lazy"}
        isLCP={isFirstCard}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    {:else}
      <div class="w-full h-full bg-linear-to-br from-primary/40 via-primary/30 to-accent/20"></div>
    {/if}
    <!-- Dark overlay for better text contrast -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40"></div>
  </div>

  <!-- Content Overlay -->
  <div class="relative h-full flex flex-col justify-end p-4 z-10">
    <!-- Tags -->
    {#if blog.tags && blog.tags.length > 0}
      <div class="flex flex-wrap gap-1.5 mb-3">
        {#each blog.tags.slice(0, 2) as tag}
          <Badge variant="secondary" class="text-[10px] font-medium px-2 py-0.5 bg-white/20 backdrop-blur-md text-white border-white/30 hover:bg-white/30">
            {tag}
          </Badge>
        {/each}
        {#if blog.tags.length > 2}
          <Badge variant="secondary" class="text-[10px] font-medium px-2 py-0.5 bg-white/20 backdrop-blur-md text-white border-white/30">
            +{blog.tags.length - 2}
          </Badge>
        {/if}
      </div>
    {/if}

    <!-- Title -->
    <h3 class="text-lg font-bold mb-2 line-clamp-2 text-white drop-shadow-lg transition-colors">
      {blog.title}
    </h3>

    <!-- Excerpt -->
    {#if excerpt}
      <p class="text-white/90 text-xs line-clamp-2 mb-3 leading-relaxed drop-shadow-md">
        {excerpt}
      </p>
    {/if}

    <!-- Footer -->
    <div class="flex items-center justify-between gap-2 text-white/90">
      <div class="flex items-center gap-2 min-w-0">
        <Avatar
          class="w-6 h-6 shrink-0 ring-2 ring-white/30"
          src={resolveImageUrl(blog.author?.profileImage || blog.author?.image || blog.author?.avatar || blog.author?.profile?.avatar || undefined)}
          fallback={blog.author?.name ? getInitials(blog.author.name, blog.author.name) : blog.author?.email?.charAt(0).toUpperCase() || "U"}
        />
        <div class="flex flex-col min-w-0">
          <span class="text-xs font-medium truncate drop-shadow-md">{blog.author?.name || "Unknown"}</span>
          <span class="text-[10px] text-white/70 drop-shadow-md">{formatDate(blog.createdAt)}</span>
        </div>
      </div>

      <div class="flex items-center gap-3 shrink-0">
        {#if readingTime > 0}
          <div class="flex items-center gap-1 text-[10px] bg-white/20 backdrop-blur-md px-2 py-1 rounded-full">
            <Clock class="w-3 h-3" />
            <span>{readingTime}m</span>
          </div>
        {/if}
        <div class="flex items-center gap-1 text-[10px] bg-white/20 backdrop-blur-md px-2 py-1 rounded-full">
          <MessageCircle class="w-3 h-3" />
          <span>{blog.comments ?? 0}</span>
        </div>
      </div>
    </div>
  </div>
</article>
