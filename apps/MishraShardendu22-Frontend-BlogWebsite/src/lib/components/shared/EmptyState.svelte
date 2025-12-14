<script lang="ts">
  import { FileQuestion, Plus } from "lucide-svelte";
  import Button from "../ui/button.svelte";
  import type { Snippet } from "svelte";

  interface Props {
    /** Title text */
    title: string;
    /** Description text */
    description?: string;
    /** Icon component (lucide-svelte icon) */
    icon?: typeof FileQuestion;
    /** Action button text */
    actionLabel?: string;
    /** Action button handler */
    onAction?: () => void;
    /** Size variant */
    size?: "sm" | "md" | "lg";
    /** Additional className */
    class?: string;
    /** Custom children content */
    children?: Snippet;
  }

  let {
    title,
    description,
    icon: Icon = FileQuestion,
    actionLabel,
    onAction,
    size = "md",
    class: className = "",
    children,
  }: Props = $props();

  const sizeConfig = {
    sm: {
      container: "py-8",
      icon: "w-12 h-12",
      iconInner: "h-6 w-6",
      title: "text-base",
      description: "text-xs",
    },
    md: {
      container: "py-12",
      icon: "w-16 h-16",
      iconInner: "h-8 w-8",
      title: "text-lg",
      description: "text-sm",
    },
    lg: {
      container: "py-16",
      icon: "w-20 h-20",
      iconInner: "h-10 w-10",
      title: "text-xl",
      description: "text-base",
    },
  };

  const config = $derived(sizeConfig[size]);
</script>

<div
  class="flex flex-col items-center justify-center text-center border rounded-lg bg-muted/20 {config.container} {className}"
>
  <div class="rounded-lg bg-muted flex items-center justify-center mb-4 {config.icon}">
    <Icon class="text-muted-foreground {config.iconInner}" />
  </div>
  <h3 class="font-medium text-foreground mb-1 {config.title}">{title}</h3>
  {#if description}
    <p class="text-muted-foreground max-w-sm {config.description}">{description}</p>
  {/if}
  {#if actionLabel && onAction}
    <Button onclick={onAction} className="mt-4">
      <Plus class="w-4 h-4 mr-2" />
      {actionLabel}
    </Button>
  {/if}
  {#if children}
    {@render children()}
  {/if}
</div>
