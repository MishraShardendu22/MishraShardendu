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
    maxExcerptLength = 150,
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

<button
  type="button"
  class="group relative rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer h-52 border-2 border-primary/50 w-full text-left"
  onclick={() => onReadMore?.(blog.id.toString())}
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
    <div class="absolute inset-0 bg-linear-to-t from-black/90 via-black/60 to-black/40"></div>
  </div>

  <div class="relative h-full flex flex-col justify-end px-4 pb-4 z-10">
    <h3 class="text-3xl font-bold mb-2 line-clamp-2 text-white drop-shadow-lg transition-colors">
      {blog.title}
    </h3>

    {#if excerpt}
      <p class="text-white/90 text-xs line-clamp-2 mb-3 leading-relaxed drop-shadow-md">
        {excerpt}
      </p>
    {/if}

    <!-- Footer -->
    <div class="flex items-center justify-between text-white/90">
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
          <div class="flex items-center gap-1 text-[10px] bg-white/20 backdrop-blur-md px-2 py-1 rounded-full" aria-label="{readingTime} minute read">
            <Clock class="w-3 h-3" aria-hidden="true" />
            <span>{readingTime}m</span>
          </div>
        {/if}
        <div class="flex items-center gap-1 text-[10px] bg-white/20 backdrop-blur-md px-2 py-1 rounded-full" aria-label="{blog.comments ?? 0} comments">
          <MessageCircle class="w-3 h-3" aria-hidden="true" />
          <span>{blog.comments ?? 0}</span>
        </div>
      </div>
    </div>
  </div>
</button>
