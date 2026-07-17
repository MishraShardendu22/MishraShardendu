<script lang="ts">
  import {
    Heart,
    Coffee,
    Home,
    BookOpen,
    Code,
    Code2,
    Award,
    Mail,
    Share2,
    Users,
    Play,
    Camera
  } from "lucide-svelte";

  const SOCIAL_LINKS = [
    { name: "Twitter", url: "https://x.com/Shardendu_M", icon: Share2 },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/shardendumishra22", icon: Users },
    { name: "YouTube", url: "https://www.youtube.com/@Shardendu_Mishra", icon: Play },
    { name: "Instagram", url: "https://www.instagram.com/mishrashardendu22", icon: Camera },
  ];

  const ECOSYSTEM_LINKS = [
    { name: "Portfolio Home", url: "https://mishrashardendu22.is-a.dev", icon: Home },
    { name: "Tech Blog", url: "https://blogs.mishrashardendu22.is-a.dev", icon: BookOpen },
    { name: "Systems Lab", url: "https://github.mishrashardendu22.is-a.dev", icon: Code },
  ];

  const QUICK_LINKS = [
    { name: "GitHub Profile", url: "https://github.com/MishraShardendu22", icon: Code2 },
    { name: "View Resume", url: "https://drive.google.com/drive/folders/1s48wtD34inP2tK5FxQjaj2OtBpFAi7l8?usp=sharing", icon: Award },
    { name: "Contact Me", url: "https://mishrashardendu22.is-a.dev/#contact", icon: Mail },
  ];
</script>

<footer class="w-full bg-[#09090b] border-t border-[#18181b] py-12 px-6 mt-16">
  <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
    <!-- Brand Slot -->
    <div class="space-y-4">
      <div class="flex items-center gap-2">
        <span class="text-white font-bold text-lg font-heading">Shardendu Mishra</span>
        <span class="text-xs px-2 py-0.5 rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/10 text-[#7c3aed] font-mono">
          Ecosystem
        </span>
      </div>
      <p class="text-sm text-[#a1a1aa] leading-relaxed">
        Software Engineer engineering modern, high-impact systems.
      </p>
      <div class="flex items-center gap-2 text-xs text-zinc-500">
        <span>Made with</span>
        <Heart class="w-3.5 h-3.5 text-red-500" />
        <span>and</span>
        <Coffee class="w-3.5 h-3.5 text-[#7c3aed]" />
        <span>by Shardendu Mishra</span>
      </div>
    </div>

    <!-- Sibling Product Links Slot -->
    <div class="space-y-3">
      <h4 class="text-xs uppercase tracking-wider font-semibold text-[#fafafa] font-heading">Ecosystem Products</h4>
      <ul class="space-y-2 text-sm text-[#a1a1aa]">
        {#each ECOSYSTEM_LINKS as link}
          <li class="flex items-center gap-2">
            <svelte:component this={link.icon} class="w-4 h-4 text-zinc-500" />
            <a href={link.url} class="hover:text-[#7c3aed] transition-colors">{link.name}</a>
          </li>
        {/each}
      </ul>
    </div>

    <!-- External Connect Slot -->
    <div class="space-y-3">
      <h4 class="text-xs uppercase tracking-wider font-semibold text-[#fafafa] font-heading">Connect</h4>
      <ul class="space-y-2 text-sm text-[#a1a1aa]">
        {#each QUICK_LINKS as link}
          <li class="flex items-center gap-2">
            <svelte:component this={link.icon} class="w-4 h-4 text-zinc-500" />
            <a href={link.url} class="hover:text-[#7c3aed] transition-colors">{link.name}</a>
          </li>
        {/each}
      </ul>
    </div>
  </div>

  <!-- Bottom Bar -->
  <div class="max-w-7xl mx-auto mt-8 pt-8 border-t border-[#18181b] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#71717a]">
    <p>&copy; 2026 Shardendu Mishra. All rights reserved.</p>
    <div class="flex items-center gap-6">
      <span class="font-mono tracking-wider">VISCA EL BARÇA</span>
      <div class="flex items-center gap-3">
        {#each SOCIAL_LINKS as link}
          <a href={link.url} target="_blank" rel="noopener noreferrer" class="hover:text-[#7c3aed] transition-colors" title={link.name}>
            <svelte:component this={link.icon} class="w-4 h-4" />
          </a>
        {/each}
      </div>
    </div>
  </div>
</footer>
