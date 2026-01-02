<script lang="ts">
  import { confirmStore } from "../confirm";
  import { X } from 'lucide-svelte';

  let state: any = { open: false, message: '', title: '' };

  confirmStore.subscribe((s) => (state = s));

  const onConfirm = () => {
    confirmStore.close(true);
  };

  const onCancel = () => {
    confirmStore.close(false);
  };
</script>

{#if state.open}
  <div class="fixed inset-0 z-60 flex items-end sm:items-center justify-center px-4 py-6 sm:p-0">
    <div
      class="absolute inset-0 bg-black/40 backdrop-blur-sm"
      role="button"
      tabindex="0"
      aria-label="Close dialog"
      on:click={onCancel}
      on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') onCancel(); }}
    ></div>
    <div class="relative w-full max-w-md bg-card border border-border rounded-lg shadow-lg p-4 pointer-events-auto">
      <div class="flex items-start justify-between gap-3">
        <div class="flex-1">
          {#if state.title}
            <h3 class="text-lg font-semibold mb-1">{state.title}</h3>
          {/if}
          <p class="text-sm text-muted-foreground">{state.message}</p>
        </div>
        <button class="p-1 rounded-md hover:bg-muted/20" aria-label="Close dialog" on:click={onCancel}><X class="w-4 h-4" aria-hidden="true" /></button>
      </div>

      <div class="mt-4 flex justify-end gap-2">
        <button class="px-4 py-2 rounded-md bg-muted text-muted-foreground" on:click={onCancel}>Cancel</button>
        <button class="px-4 py-2 rounded-md bg-destructive text-destructive-foreground" on:click={onConfirm}>Delete</button>
      </div>
    </div>
  </div>
{/if}

<style>
  :global(.bg-muted) { background: var(--muted); }
  :global(.text-muted-foreground) { color: var(--muted-foreground); }
  :global(.bg-destructive) { background: var(--destructive); }
  :global(.text-destructive-foreground) { color: var(--destructive-foreground); }
</style>
