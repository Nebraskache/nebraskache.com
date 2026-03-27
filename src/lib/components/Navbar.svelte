<script lang="ts">
  import { page } from "$app/stores";
  import { Menu, X } from "lucide-svelte";

  let mobileOpen = $state(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/about", label: "About" },
    { href: "/membership", label: "Membership" },
    { href: "/feedback", label: "Feedback" },
    { href: "/minutes", label: "Meeting Minutes" },
    { href: "/bylaws", label: "Bylaws" }
  ];

  function closeMobile() {
    mobileOpen = false;
  }
</script>

<nav
  class="sticky top-0 z-50 border-b border-prairie-green-25 bg-white/90
  backdrop-blur-md">
  <div
    class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
    <a href="/" class="flex items-center gap-3" onclick={closeMobile}>
      <img
        src="/nebraskache-sans.svg"
        alt="Nebraskache logo"
        class="h-10 w-auto" />
      <span class="font-heading text-xl font-bold text-prairie-green">
        Nebraskache
      </span>
    </a>

    <!-- Desktop nav -->
    <div class="hidden items-center gap-1 md:flex">
      {#each links as link}
        <a
          href={link.href}
          class="rounded-lg px-3 py-2 text-sm font-medium transition-colors {$page.url.pathname === link.href ? 'bg-prairie-green/10 text-prairie-green' : 'text-trail-gray hover:bg-prairie-mist hover:text-compass-gray'}">
          {link.label}
        </a>
      {/each}
    </div>

    <!-- Mobile toggle -->
    <button
      class="rounded-lg p-2 text-trail-gray transition-colors
      hover:bg-prairie-mist md:hidden"
      onclick={() => (mobileOpen = !mobileOpen)}
      aria-label="Toggle navigation menu"
      aria-expanded={mobileOpen}>
      {#if mobileOpen}
        <X size={24} />
      {:else}
        <Menu size={24} />
      {/if}
    </button>
  </div>

  <!-- Mobile menu -->
  {#if mobileOpen}
    <div
      class="border-t border-prairie-green-25 bg-white px-4 pb-4 pt-2 md:hidden">
      {#each links as link}
        <a
          href={link.href}
          onclick={closeMobile}
          class="block rounded-lg px-3 py-2.5 text-sm font-medium
          transition-colors {$page.url.pathname === link.href ? 'bg-prairie-green/10 text-prairie-green' : 'text-trail-gray hover:bg-prairie-mist hover:text-compass-gray'}">
          {link.label}
        </a>
      {/each}
    </div>
  {/if}
</nav>
