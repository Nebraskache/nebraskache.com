<script lang="ts">
  import { Mail, Facebook, Compass } from "lucide-svelte";
</script>

<footer class="mt-auto bg-prairie-green text-white">
  <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6">
    <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
      <!-- About column -->
      <div>
        <div class="mb-4 flex items-center gap-3">
          <img
            src="/nebraskache-sans.svg"
            alt="Nebraskache logo"
            class="h-10 w-auto" />
          <span class="font-heading text-lg font-bold">Nebraskache</span>
        </div>
        <p class="text-sm leading-relaxed text-white/80">
          Nebraska's geocaching community — promoting adventure, organizing
          events, and connecting geocachers across the Great Plains since 2003.
        </p>
      </div>

      <!-- Quick links -->
      <div>
        <h3
          class="mb-4 font-heading text-sm font-semibold uppercase
          tracking-wider text-prairie-gold">
          Quick Links
        </h3>
        <ul class="space-y-2 text-sm">
          <li>
            <a
              href="/events"
              class="text-white/80 transition-colors hover:text-white">
              Upcoming Events
            </a>
          </li>
          <li>
            <a
              href="/about"
              class="text-white/80 transition-colors hover:text-white">
              About Us
            </a>
          </li>
          <li>
            <a
              href="/membership"
              class="text-white/80 transition-colors hover:text-white">
              Membership
            </a>
          </li>
          <li>
            <a
              href="/feedback"
              class="text-white/80 transition-colors hover:text-white">
              Feedback
            </a>
          </li>
          <li>
            <a
              href="/minutes"
              class="text-white/80 transition-colors hover:text-white">
              Meeting Minutes
            </a>
          </li>
          <li>
            <a
              href="/bylaws"
              class="text-white/80 transition-colors hover:text-white">
              Bylaws
            </a>
          </li>
        </ul>
      </div>

      <!-- Connect -->
      <div>
        <h3
          class="mb-4 font-heading text-sm font-semibold uppercase
          tracking-wider text-prairie-gold">
          Connect
        </h3>
        <ul class="space-y-3 text-sm">
          <li>
            <a
              href="mailto:nebraskache@gmail.com"
              class="flex items-center gap-2 text-white/80 transition-colors
              hover:text-white">
              <Mail size={16} />
              nebraskache@gmail.com
            </a>
          </li>
          <li>
            <a
              href="https://www.facebook.com/groups/107321656812"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2 text-white/80 transition-colors
              hover:text-white">
              <Facebook size={16} />
              Facebook Group
            </a>
          </li>
          <li>
            <a
              href="https://www.geocaching.com/"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2 text-white/80 transition-colors
              hover:text-white">
              <Compass size={16} />
              Geocaching.com
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div
      class="mt-10 border-t border-white/20 pt-6 text-center text-xs
      text-white/60">
      &copy; {new Date().getFullYear()} Nebraskache. All rights reserved.
    </div>
  </div>
</footer>
