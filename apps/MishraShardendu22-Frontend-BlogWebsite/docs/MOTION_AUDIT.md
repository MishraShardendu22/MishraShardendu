# Motion Audit: MishraShardendu22-Frontend-BlogWebsite (Svelte Blog)

## 1. Existing Motion Grep Analysis
* **Grep Hits**: 7 files reference CSS transitions and `Toast.svelte` `fly` transition.
* **Missing Animations**: Article card grid entrance choreography, reading progress bar indicator, post list filter tab transition, code block copy feedback, article hero scroll fade.

## 2. High-Value Targeted Additions
* **Library / Strategy**: Svelte Native Primitives (`svelte/transition` `fade`, `fly`, `scale`, `slide`; `svelte/motion` `tweened`, `spring`).
* **Target Interactions**:
  1. Article list stagger reveal using Svelte `transition:fly={{ y: 15, duration: 250, delay: i * 40 }}`.
  2. Reading progress bar smooth width animation using `svelte/motion` `tweened`.
  3. Image load fade-in transition (`transition:fade`).
  4. Search input focus ring & clear button scale transition (`transition:scale`).
* **Accessibility**: Respect `prefers-reduced-motion: reduce`.
