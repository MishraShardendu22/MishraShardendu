<script lang="ts">
  import { AlertCircle, RefreshCw } from "lucide-svelte";
  import Button from "../ui/button.svelte";

  interface Props {
    /** Error title */
    title?: string;
    /** Error message to display */
    message: string;
    /** Show retry button */
    showRetry?: boolean;
    /** Retry button handler */
    onRetry?: () => void;
    /** Size variant */
    size?: "sm" | "md" | "lg";
    /** Additional className */
    class?: string;
  }

  let {
    title = "Something went wrong",
    message,
    showRetry = true,
    onRetry,
    size = "md",
    class: className = "",
  }: Props = $props();

  const sizeConfig = {
    sm: {
      container: "min-h-[20vh] gap-4 px-2",
      icon: "w-12 h-12",
      iconInner: "h-5 w-5",
      title: "text-base",
      message: "text-xs",
    },
    md: {
      container: "min-h-[40vh] gap-6 px-4",
      icon: "w-16 h-16",
      iconInner: "h-8 w-8",
      title: "text-xl",
      message: "text-sm",
    },
    lg: {
      container: "min-h-[70vh] gap-6 px-4",
      icon: "w-20 h-20",
      iconInner: "h-10 w-10",
      title: "text-2xl",
      message: "text-base",
    },
  };

  const config = $derived(sizeConfig[size]);

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };
</script>

<div class="flex flex-col items-center justify-center {config.container} {className}">
  <!-- Error icon with visual emphasis -->
  <div class="relative">
    <div
      class="rounded-full bg-linear-to-br from-destructive/20 via-destructive/10 to-transparent flex items-center justify-center shadow-lg shadow-destructive/10 ring-2 ring-destructive/20 ring-offset-2 ring-offset-background {config.icon}"
    >
      <AlertCircle class="text-destructive {config.iconInner}" />
    </div>
  </div>

  <div class="text-center space-y-3 max-w-md">
    <h2 class="font-bold text-foreground tracking-tight {config.title}">{title}</h2>
    <p class="text-muted-foreground leading-relaxed {config.message}">{message}</p>
    {#if showRetry}
      <Button
        onclick={handleRetry}
        variant="outline"
        className="mt-4 gap-2 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 transition-colors"
      >
        <RefreshCw class="w-4 h-4" />
        Try Again
      </Button>
    {/if}
  </div>
</div>
