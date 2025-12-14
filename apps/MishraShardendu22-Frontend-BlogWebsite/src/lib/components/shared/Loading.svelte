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
      icon: "h-6 w-6",
      title: "text-sm",
      description: "text-xs",
    },
    md: {
      container: "min-h-[40vh]",
      icon: "h-10 w-10",
      title: "text-base",
      description: "text-sm",
    },
    lg: {
      container: "min-h-[70vh]",
      icon: "h-12 w-12",
      title: "text-lg",
      description: "text-base",
    },
  };

  const config = $derived(sizeConfig[size]);
</script>

<div class="flex flex-col items-center justify-center space-y-4 {config.container} {className}">
  <Loader2 class="text-primary animate-spin {config.icon}" />
  <div class="space-y-1 text-center">
    <p class="font-medium text-foreground {config.title}">{title}</p>
    {#if description}
      <p class="text-muted-foreground {config.description}">{description}</p>
    {/if}
  </div>
</div>
