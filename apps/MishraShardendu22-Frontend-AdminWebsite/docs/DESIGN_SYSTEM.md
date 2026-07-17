# Shared Design System & Brand Specification

This document details the unified visual system and design tokens for the federated product ecosystem, ensuring independent surfaces look and feel like a single cohesive product family.

> [!NOTE]
> This repository implements the shared design specification independently. No shared package or dependency is imported; this file is for documentation purposes only. It is safe to edit locally if this repository's needs diverge intentionally in the future.

---

## 1. Design Token System

### 1.1 Neutral Palette (10-Step Zinc Scale)
*   **Background (Global Canvas)**: `zinc-950` (`#09090b`)
*   **Surface Primary (Cards, Headers, Sidebars)**: `zinc-900` (`#18181b`)
*   **Surface Elevated (Inputs, Secondary Areas)**: `zinc-800` (`#27272a`)
*   **Borders (Subtle)**: `zinc-800` (`#27272a`)
*   **Borders (Elevated/Hover)**: `zinc-700` (`#3f3f46`)
*   **Text (Primary)**: `zinc-50` (`#fafafa`)
*   **Text (Secondary/Muted)**: `zinc-400` (`#a1a1aa`)

### 1.2 Locked Accent Color (Violet)
*   **Accent Primary**: `#7c3aed` (violet-600)
*   **Accent Hover/Light**: `#8b5cf6` (violet-500)
*   **Accent Active/Dark**: `#6d28d9` (violet-700)
*   **Accent Muted/Glow**: `rgba(124, 58, 237, 0.15)`

### 1.3 Typography Pairings
*   **Headings/Titles**: `Space Grotesk` (Geometric, sharp sans-serif)
*   **Body & User Interface**: `IBM Plex Sans` (Technical sans-serif)
*   **Code & Logs / Data**: `IBM Plex Mono` (Technical monospace)

### 1.4 Spacing & Border Radius
*   **Spacing Base**: 4px scale (`4px` xs / `8px` sm / `16px` md / `24px` lg / `48px` xl)
*   **Buttons & Inputs Radius**: `6px` to `8px`
*   **Cards, Dialogs, & Modals Radius**: `12px`

### 1.5 Motion Timing & Easing
*   **Standard Transition**: `200ms` using standard ease-in-out easing (`cubic-bezier(0.4, 0, 0.2, 1)`)
*   **Sidebar Slide Transition**: `300ms` using snappy ease-out-quint easing (`cubic-bezier(0.16, 1, 0.3, 1)`)

### 1.6 Icon Standard
*   **Icon Library**: Lucide Icons
*   **Stroke Width**: `1.5px`
