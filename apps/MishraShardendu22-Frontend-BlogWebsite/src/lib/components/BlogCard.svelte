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
  class="group relative rounded-xl border border-border overflow-hidden max-h-[520px] transition-all duration-300 hover:border-border/80"
>
  {#if blog.image}
    <div class="absolute inset-0">
      <OptimizedImage
        src={resolveImageUrl(blog.image)}
        alt={blog.title}
        class="w-full h-full"
        objectFit="cover"
        loading={isFirstCard ? "eager" : "lazy"}
        isLCP={isFirstCard}
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div class="absolute inset-0 backdrop-blur-xl bg-black/60"></div>
    </div>
  {:else}
    <div class="absolute inset-0 bg-linear-to-br from-primary/10 to-background"></div>
  {/if}

  <div class="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  
  <div class="relative z-10 p-4 lg:p-4 h-full flex flex-col">
    <div class="flex items-center gap-3 text-xs mb-4">
      <div class="flex items-center gap-2 min-w-0">
        <Avatar
          class="w-7 h-7 shrink-0 ring-2 ring-primary/10"
          src={resolveImageUrl(blog.author?.profileImage || blog.author?.image || blog.author?.avatar || blog.author?.profile?.avatar || undefined)}
          fallback={blog.author?.name ? getInitials(blog.author.name, blog.author.name) : blog.author?.email?.charAt(0).toUpperCase() || "U"}
        />
        <div class="min-w-0">
          <div class="text-sm font-semibold text-white truncate">{blog.author?.name || blog.author?.email || "Unknown"}</div>
          <div class="flex items-center gap-2 text-xs text-white/80 truncate">
            <span>{formatDate(blog.createdAt)}</span>
            {#if readingTime > 0}
              <span>• {readingTime} min</span>
            {/if}
          </div>
        </div>
      </div>

      {#if blog.tags && blog.tags.length > 0}
        <div class="flex items-center gap-2 ml-2">
          {#each blog.tags.slice(0,2) as tag}
            <Badge variant="secondary" class="text-xs px-2 py-0.5 bg-white/20 text-white border-white/30">{tag}</Badge>
          {/each}
          {#if blog.tags.length > 2}
            <Badge variant="outline" class="text-xs px-2 py-0.5 bg-white/10 text-white border-white/30">+{blog.tags.length - 2}</Badge>
          {/if}
        </div>
      {/if}

      <div class="ml-auto flex items-center gap-3">
        <div class="flex items-center gap-1 text-sm text-white/90">
          <MessageCircle class="w-4 h-4" />
          <span class="font-medium">{blog.comments ?? 0}</span>
        </div>

        {#if customActions}
          {@render customActions?.()}
        {/if}

        <Button
          variant="outline"
          size="sm"
          onclick={() => onReadMore?.(blog.id.toString())}
          className="h-9 px-3 bg-white/10 hover:bg-white/20 text-white border-white/30"
        >
          Read
          <ArrowRight class="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>

    <h3 class="text-base lg:text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-primary-200 transition-colors leading-tight">
      {blog.title}
    </h3>

    {#if excerpt}
      <p class="hidden md:block text-sm text-white/80 mt-3 line-clamp-3 leading-relaxed">
        {excerpt}
      </p>
    {/if}
  </div>
</article>
