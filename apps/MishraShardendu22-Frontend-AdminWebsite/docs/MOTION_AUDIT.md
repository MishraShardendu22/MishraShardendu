# Motion Audit: MishraShardendu22-Frontend-AdminWebsite (React Admin)

## 1. Existing Motion Grep Analysis
* **Grep Hits**: 24 files reference standard CSS transitions on buttons and dialog overlays.
* **Missing Animations**: Table row enter/exit transitions, sort order reorder animations, dashboard metric counter animations, and modal dialog origin-scaled transitions.

## 2. High-Value Targeted Additions
* **Library**: `framer-motion` (React Vite client).
* **Target Interactions**:
  1. Data table row enter/exit stagger (`AnimatePresence` + `motion.tr`).
  2. Kanban column card drag/drop & reorder transitions (`layout`).
  3. Dashboard stat metric cards count-up on load.
  4. Dialog & sheet modal scale+fade enter/exit matched to trigger origin.
  5. Action button press micro-interaction (`whileTap={{ scale: 0.98 }}`).
* **Accessibility**: Respect `prefers-reduced-motion: reduce`.
