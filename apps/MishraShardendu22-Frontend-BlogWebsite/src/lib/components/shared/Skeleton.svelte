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

{#each Array(count) as _, i (i)}
  {#if variant === "card"}
    <div
      class="bg-card/90 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden shadow-lg p-6 space-y-4 animate-pulse {className}"
    >
      <!-- Header with avatar and title -->
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-linear-to-br from-muted/80 to-muted/40 rounded-full"></div>
        <div class="flex-1 space-y-2">
          <div class="h-4 w-24 bg-linear-to-r from-muted/70 to-muted/40 rounded-md"></div>
          <div class="h-3 w-16 bg-linear-to-r from-muted/50 to-muted/30 rounded-md"></div>
        </div>
      </div>
      <!-- Title -->
      <div class="h-5 w-4/5 bg-linear-to-r from-muted/70 to-muted/40 rounded-lg"></div>
      <!-- Description lines -->
      <div class="space-y-2">
        <div class="h-4 w-full bg-linear-to-r from-muted/60 to-muted/30 rounded-md"></div>
        <div class="h-4 w-3/4 bg-linear-to-r from-muted/50 to-muted/25 rounded-md"></div>
      </div>
      <!-- Tags -->
      <div class="flex gap-2 pt-2">
        <div class="h-6 w-16 bg-linear-to-r from-muted/60 to-muted/40 rounded-full"></div>
        <div class="h-6 w-20 bg-linear-to-r from-muted/50 to-muted/30 rounded-full"></div>
        <div class="h-6 w-14 bg-linear-to-r from-muted/40 to-muted/20 rounded-full"></div>
      </div>
    </div>
  {:else if variant === "list"}
    <div
      class="flex items-center gap-4 p-4 bg-card/80 border border-border/50 rounded-xl animate-pulse shadow-sm {className}"
    >
      <div class="w-12 h-12 bg-linear-to-br from-muted/70 to-muted/40 rounded-full"></div>
      <div class="flex-1 space-y-2">
        <div class="h-4 w-3/4 bg-linear-to-r from-muted/60 to-muted/30 rounded-md"></div>
        <div class="h-3 w-1/2 bg-linear-to-r from-muted/50 to-muted/25 rounded-md"></div>
      </div>
      <div class="h-8 w-20 bg-linear-to-r from-muted/50 to-muted/30 rounded-md"></div>
    </div>
  {:else if variant === "text"}
    <div class="space-y-3 animate-pulse {className}">
      <div class="h-4 w-full bg-linear-to-r from-muted/60 to-muted/30 rounded-md"></div>
      <div class="h-4 w-11/12 bg-linear-to-r from-muted/55 to-muted/28 rounded-md"></div>
      <div class="h-4 w-4/5 bg-linear-to-r from-muted/50 to-muted/25 rounded-md"></div>
      <div class="h-4 w-3/5 bg-linear-to-r from-muted/45 to-muted/20 rounded-md"></div>
    </div>
  {:else if variant === "avatar"}
    <div
      class="w-12 h-12 bg-linear-to-br from-muted/70 to-muted/40 rounded-full animate-pulse ring-2 ring-border/30 {className}"
    ></div>
  {/if}
{/each}
