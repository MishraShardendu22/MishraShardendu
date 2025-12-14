<script lang="ts">
  /**
   * Skeleton loading component for content placeholders
   */
  interface Props {
    /** Skeleton variant */
    variant?: "card" | "list" | "text" | "avatar";
    /** Number of skeleton items to show */
    count?: number;
    /** Additional className */
    class?: string;
  }

  let { variant = "card", count = 1, class: className = "" }: Props = $props();
</script>

{#each Array(count) as _, i}
  {#if variant === "card"}
    <div
      class="bg-card/80 backdrop-blur-sm border border-border/60 rounded-xl overflow-hidden shadow-lg p-5 space-y-4 animate-pulse {className}"
    >
      <div class="w-10 h-10 bg-linear-to-br from-muted/70 to-muted/50 rounded-full"></div>
      <div class="h-5 w-5/6 bg-linear-to-r from-muted/70 to-muted/50 rounded-lg"></div>
      <div class="h-4 w-full bg-linear-to-r from-muted/70 to-muted/50 rounded-lg"></div>
      <div class="flex gap-2">
        <div class="h-6 w-16 bg-linear-to-r from-muted/70 to-muted/50 rounded-full"></div>
        <div class="h-6 w-20 bg-linear-to-r from-muted/70 to-muted/50 rounded-full"></div>
      </div>
    </div>
  {:else if variant === "list"}
    <div class="flex items-center gap-4 p-4 bg-card border border-border/60 rounded-lg animate-pulse {className}">
      <div class="w-12 h-12 bg-muted/50 rounded-full"></div>
      <div class="flex-1 space-y-2">
        <div class="h-4 w-3/4 bg-muted/50 rounded"></div>
        <div class="h-3 w-1/2 bg-muted/50 rounded"></div>
      </div>
    </div>
  {:else if variant === "text"}
    <div class="space-y-2 animate-pulse {className}">
      <div class="h-4 w-full bg-muted/50 rounded"></div>
      <div class="h-4 w-5/6 bg-muted/50 rounded"></div>
      <div class="h-4 w-4/6 bg-muted/50 rounded"></div>
    </div>
  {:else if variant === "avatar"}
    <div class="w-12 h-12 bg-muted/50 rounded-full animate-pulse {className}"></div>
  {/if}
{/each}
