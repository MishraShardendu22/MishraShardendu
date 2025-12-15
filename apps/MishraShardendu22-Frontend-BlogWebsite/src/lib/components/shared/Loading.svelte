<script lang="ts">
  import { Loader2 } from "lucide-svelte";

  interface Props {
    /** Custom title text */
    title?: string;
    /** Custom description text */
    description?: string;
    /** Size variant */
    size?: "sm" | "md" | "lg";
    /** Additional className */
    class?: string;
  }

  let {
    title = "Loading",
    description = "Please wait...",
    size = "md",
    class: className = "",
  }: Props = $props();

  const sizeConfig = {
    sm: {
      container: "min-h-[20vh]",
      iconWrapper: "w-12 h-12",
      icon: "h-5 w-5",
      title: "text-sm",
      description: "text-xs",
    },
    md: {
      container: "min-h-[40vh]",
      iconWrapper: "w-16 h-16",
      icon: "h-8 w-8",
      title: "text-base",
      description: "text-sm",
    },
    lg: {
      container: "min-h-[70vh]",
      iconWrapper: "w-20 h-20",
      icon: "h-10 w-10",
      title: "text-lg",
      description: "text-base",
    },
  };

  const config = $derived(sizeConfig[size]);
</script>

<div class="flex flex-col items-center justify-center space-y-6 {config.container} {className}">
  <!-- Animated spinner with linear ring -->
  <div class="relative">
    <div
      class="rounded-full bg-linear-to-br from-primary/20 via-primary/10 to-transparent flex items-center justify-center shadow-lg shadow-primary/10 ring-2 ring-primary/20 ring-offset-2 ring-offset-background {config.iconWrapper}"
    >
      <Loader2 class="text-primary animate-spin {config.icon}" />
    </div>
    <!-- Pulsing ring effect -->
    <div
      class="absolute inset-0 rounded-full bg-primary/5 animate-ping {config.iconWrapper}"
      style="animation-duration: 2s;"
    ></div>
  </div>

  <div class="space-y-2 text-center">
    <p class="font-semibold text-foreground tracking-tight {config.title}">{title}</p>
    {#if description}
      <p class="text-muted-foreground {config.description}">{description}</p>
    {/if}
  </div>
</div>
