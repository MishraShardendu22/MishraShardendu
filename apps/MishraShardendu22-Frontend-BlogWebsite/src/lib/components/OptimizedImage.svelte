<script lang="ts">
  import { onMount } from "svelte";

  interface Props {
    src: string | undefined;
    alt: string;
    class?: string;
    width?: number;
    height?: number;
    loading?: "lazy" | "eager";
    fetchpriority?: "high" | "low" | "auto";
    sizes?: string;
    decoding?: "async" | "auto" | "sync";
    isLCP?: boolean; // Mark as Largest Contentful Paint element
    aspectRatio?: string;
    objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  }

  let {
    src,
    alt,
    class: className = "",
    width,
    height,
    loading = "lazy",
    fetchpriority = "auto",
    sizes = "100vw",
    decoding = "async",
    isLCP = false,
    aspectRatio,
    objectFit = "cover",
  }: Props = $props();

  let isLoaded = $state(false);
  let hasError = $state(false);
  let imgElement = $state<HTMLImageElement | null>(null);

  // For LCP images, use eager loading and high fetch priority
  const effectiveLoading = $derived(isLCP ? "eager" : loading);
  const effectiveFetchPriority = $derived(isLCP ? "high" : fetchpriority);
  const effectiveDecoding = $derived(isLCP ? "sync" : decoding);

  // Generate srcset for responsive images if the src is from our API
  const generateSrcset = (baseSrc: string | undefined): string => {
    if (!baseSrc) return "";
    
    // If it's an external image or doesn't support srcset, return empty
    if (baseSrc.includes("cloudinary.com")) {
      // Cloudinary transformation for responsive images
      const widths = [320, 640, 768, 1024, 1280, 1920];
      return widths
        .map((w) => {
          const transformed = baseSrc.replace(
            "/upload/",
            `/upload/w_${w},f_auto,q_auto/`
          );
          return `${transformed} ${w}w`;
        })
        .join(", ");
    }
    
    return "";
  };

  const srcset = $derived(generateSrcset(src));

  // Blur placeholder - a tiny base64 placeholder
  const blurPlaceholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTVlN2ViIi8+PC9zdmc+";

  const handleLoad = () => {
    isLoaded = true;
  };

  const handleError = () => {
    hasError = true;
    isLoaded = true;
  };

  onMount(() => {
    // If image is already loaded (from cache), trigger load state
    if (imgElement?.complete) {
      isLoaded = true;
    }
  });

  const containerStyle = $derived(() => {
    const styles: string[] = [];
    if (aspectRatio) {
      styles.push(`aspect-ratio: ${aspectRatio}`);
    }
    return styles.join("; ");
  });

  const imgStyle = $derived(() => {
    const styles: string[] = [`object-fit: ${objectFit}`];
    if (!isLoaded) {
      styles.push("opacity: 0");
    }
    return styles.join("; ");
  });
</script>

<div
  class="optimized-image-container relative overflow-hidden {className}"
  style={containerStyle()}
>
  {#if !isLoaded && !hasError}
    <!-- Blur placeholder while loading -->
    <div
      class="absolute inset-0 bg-muted/50 animate-pulse"
      style="background-image: url({blurPlaceholder}); background-size: cover;"
    ></div>
  {/if}

  {#if hasError}
    <!-- Error fallback -->
    <div class="absolute inset-0 bg-muted/30 flex items-center justify-center">
      <svg
        class="w-8 h-8 text-muted-foreground/50"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    </div>
  {:else if src}
    <img
      bind:this={imgElement}
      {src}
      srcset={srcset || undefined}
      {sizes}
      {alt}
      {width}
      {height}
      loading={effectiveLoading}
      fetchpriority={effectiveFetchPriority}
      decoding={effectiveDecoding}
      onload={handleLoad}
      onerror={handleError}
      class="w-full h-full transition-opacity duration-300 {isLoaded ? 'opacity-100' : 'opacity-0'}"
      style={imgStyle()}
    />
  {/if}
</div>

<style>
  .optimized-image-container {
    contain: layout style;
  }

  .optimized-image-container img {
    will-change: opacity;
  }
</style>
