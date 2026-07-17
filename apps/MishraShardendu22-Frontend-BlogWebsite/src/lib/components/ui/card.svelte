<script lang="ts">
  import { cn } from "../../utils";

  let {
    class: className,
    children,
    ...restProps
  }: {
    class?: string;
    children?: any;
    [key: string]: any;
  } = $props();
</script>

<div
  class={cn("rounded-xl border bg-card text-card-foreground shadow-sm", className)}
  {...restProps}
>
  {@render children?.()}
</div>
