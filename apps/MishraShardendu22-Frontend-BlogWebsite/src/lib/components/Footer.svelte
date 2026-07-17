<script lang="ts">
  import {
    Heart,
    Coffee,
    ArrowUpRight,
    Users,
    Rss,
    Folder,
    Award,
    Code,
    BookOpen,
    Shield,
    Package,
    Share2,
    Play,
    Camera,
    Terminal
  } from "lucide-svelte";

  const QUICK_LINKS = [
    { name: "Social Media", url: "https://mishrashardendu22.is-a.dev/links", icon: Users },
    { name: "RSS Feed", url: "https://mishrashardendu22.is-a.dev/feed.xml", icon: Rss },
    { name: "Project", url: "https://mishrashardendu22.is-a.dev/projects", icon: Folder },
    { name: "Certification", url: "https://mishrashardendu22.is-a.dev/certificates", icon: Award },
  ];

  const MY_WEBSITES = [
    { name: "Github Backup Lab", url: "https://github.mishrashardendu22.is-a.dev", icon: Code },
    { name: "Main", url: "https://mishrashardendu22.is-a.dev", icon: BookOpen },
    { name: "Admin Portal", url: "https://admin.mishrashardendu22.is-a.dev", icon: Shield },
    { name: "My UI Library", url: "https://pixel-art-8-bit.mishrashardendu22.is-a.dev", icon: Package },
  ];

  const SOCIAL_MEDIA = [
    { name: "Twitter", url: "https://x.com/Shardendu_M", icon: Share2 },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/shardendumishra22", icon: Users },
    { name: "YouTube", url: "https://www.youtube.com/@Shardendu_Mishra", icon: Play },
    { name: "Instagram", url: "https://www.instagram.com/mishrashardendu22", icon: Camera },
  ];

  const CODING_PROFILES = [
    { name: "LeetCode", url: "https://leetcode.com/u/ShardenduMishra22/", icon: Award },
    { name: "GitHub Main", url: "https://github.com/MishraShardendu22", icon: Code },
    { name: "GitHub Learning", url: "https://github.com/ShardenduMishra22", icon: Folder },
    { name: "Codeforces", url: "https://codeforces.com/profile/MishraShardendu22", icon: Terminal },
  ];

  function handleScrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
</script>

<footer class="w-full bg-[#09090b] border-t border-[#18181b] py-16 px-6 mt-16 relative overflow-hidden">
  <div class="max-w-7xl mx-auto relative z-10">
    <!-- Top section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
      <div class="space-y-8">
        <div>
          <div class="flex items-center gap-3 mb-4">
            <span class="text-3xl font-bold text-white font-heading">Shardendu Mishra</span>
            <span class="text-xs px-2.5 py-0.5 rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/10 text-[#7c3aed] font-mono">
              Ecosystem
            </span>
          </div>
          <p class="text-[#a1a1aa] text-lg leading-relaxed max-w-xl">
            Software Engineer engineering modern, high-impact systems.
          </p>
        </div>

        <div class="flex items-center gap-2 text-sm text-zinc-500">
          <span>Made with</span>
          <Heart class="w-4 h-4 text-red-500" />
          <span>and</span>
          <Coffee class="w-4 h-4 text-[#7c3aed]" />
          <span>by Shardendu Mishra</span>
        </div>

        <div class="flex flex-wrap gap-3">
          <span class="px-4 py-2 bg-[#18181b] border border-[#27272a] rounded-lg text-xs text-zinc-300 font-semibold">
            Go
          </span>
          <span class="px-4 py-2 bg-[#7c3aed]/10 border border-[#7c3aed]/25 rounded-lg text-xs text-[#7c3aed] font-semibold">
            Svelte
          </span>
          <span class="px-4 py-2 bg-[#18181b] border border-[#27272a] rounded-lg text-xs text-zinc-300 font-semibold">
            Kubernetes
          </span>
          <span class="px-4 py-2 bg-[#18181b] border border-[#27272a] rounded-lg text-xs text-zinc-300 font-semibold">
            AI/ML
          </span>
        </div>

        <p class="text-xs text-zinc-650">
          &copy; 2026 Shardendu Mishra. All rights reserved.
        </p>
      </div>

      <!-- Right column contact prompt / quote -->
      <div class="flex flex-col justify-center space-y-6 lg:pl-12">
        <div class="border border-[#18181b] bg-[#09090b]/50 p-8 rounded-2xl">
          <h3 class="text-xl font-bold text-white mb-2 font-heading">Keep in Touch</h3>
          <p class="text-sm text-[#a1a1aa] mb-6">
            If you want to chat about engineering, technology, or have questions about my work, feel free to reach out.
          </p>
          <a
            href="https://mishrashardendu22.is-a.dev/#contact"
            class="inline-flex items-center gap-2 px-5 py-2.5 bg-[#7c3aed] hover:bg-[#8b5cf6] text-white text-sm font-semibold rounded-lg transition-colors duration-200"
          >
            <span>Send a Message</span>
            <ArrowUpRight class="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>

    <!-- 4-Column Links Grid -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-12 pt-12 border-t border-[#18181b]">
      <!-- Quick Links -->
      <div>
        <h4 class="text-sm font-semibold text-zinc-200 mb-6 uppercase tracking-wider font-heading">Quick Links</h4>
        <ul class="space-y-4">
          {#each QUICK_LINKS as link}
            <li>
              <a
                href={link.url}
                class="flex items-center gap-2.5 text-sm text-[#a1a1aa] hover:text-[#7c3aed] transition-colors duration-200 group"
              >
                <svelte:component this={link.icon} class="w-4 h-4 text-zinc-500 group-hover:text-[#7c3aed] transition-colors" />
                <span>{link.name}</span>
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- My Websites -->
      <div>
        <h4 class="text-sm font-semibold text-zinc-200 mb-6 uppercase tracking-wider font-heading">My Websites</h4>
        <ul class="space-y-4">
          {#each MY_WEBSITES as link}
            <li>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2.5 text-sm text-[#a1a1aa] hover:text-[#7c3aed] transition-colors duration-200 group"
              >
                <svelte:component this={link.icon} class="w-4 h-4 text-zinc-500 group-hover:text-[#7c3aed] transition-colors" />
                <span>{link.name}</span>
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Social Media -->
      <div>
        <h4 class="text-sm font-semibold text-zinc-200 mb-6 uppercase tracking-wider font-heading">Social Media</h4>
        <ul class="space-y-4">
          {#each SOCIAL_MEDIA as link}
            <li>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2.5 text-sm text-[#a1a1aa] hover:text-[#7c3aed] transition-colors duration-200 group"
              >
                <svelte:component this={link.icon} class="w-4 h-4 text-zinc-500 group-hover:text-[#7c3aed] transition-colors" />
                <span>{link.name}</span>
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Coding Profiles -->
      <div>
        <h4 class="text-sm font-semibold text-zinc-200 mb-6 uppercase tracking-wider font-heading">Coding</h4>
        <ul class="space-y-4">
          {#each CODING_PROFILES as link}
            <li>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2.5 text-sm text-[#a1a1aa] hover:text-[#7c3aed] transition-colors duration-200 group"
              >
                <svelte:component this={link.icon} class="w-4 h-4 text-zinc-500 group-hover:text-[#7c3aed] transition-colors" />
                <span>{link.name}</span>
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </div>

    <!-- Visca Barça Banner & Scroll To Top -->
    <div class="mt-16 pt-8 border-t border-[#18181b] flex flex-col items-center gap-8">
      <div class="text-center w-full">
        <h2 class="font-black text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] xl:text-[14rem] tracking-wider leading-none">
          <span class="text-[#3b82f6] italic font-heading">VISCA</span>
          <span class="text-[#ef4444] italic font-heading">BARÇA</span>
        </h2>
      </div>

      <div class="w-full flex justify-between items-center text-xs text-zinc-500">
        <span>&copy; 2026 Shardendu Mishra</span>
        <button
          type="button"
          on:click={handleScrollToTop}
          class="flex items-center gap-1.5 hover:text-[#7c3aed] transition-colors duration-200"
        >
          <span>Back to Top</span>
          <span>&uarr;</span>
        </button>
      </div>
    </div>
  </div>
</footer>
