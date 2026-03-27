<script lang="ts">
  import { ClipboardList, FileText, Download, Calendar } from "lucide-svelte";

  let { data } = $props();
</script>

<svelte:head>
  <title>Meeting Minutes — Nebraskache</title>
  <meta
    name="description"
    content="Executive committee meeting minutes for the Nebraskache geocaching organization." />
</svelte:head>

<!-- Page header -->
<section
  class="topo-bg bg-gradient-to-b from-prairie-green-25/40 to-prairie-mist">
  <div class="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
    <div class="flex items-center gap-3 mb-3">
      <ClipboardList size={28} class="text-prairie-green" />
      <h1
        class="font-heading text-3xl font-bold text-prairie-green sm:text-4xl">
        Meeting Minutes
      </h1>
    </div>
    <p class="max-w-2xl text-lg text-trail-gray">
      Minutes from the Nebraskache executive committee meetings, organized by
      year.
    </p>
  </div>
</section>

<!-- Minutes listing -->
<section class="bg-white py-12 sm:py-16">
  <div class="mx-auto max-w-4xl px-4 sm:px-6">
    {#if data.years.length > 0}
      {#each data.years as { year, entries }}
        <div class="mb-10 last:mb-0">
          <h2
            class="mb-4 flex items-center gap-2 font-heading text-2xl font-semibold text-prairie-green">
            <Calendar size={22} class="text-prairie-green/70" />
            {year}
          </h2>
          <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {#each entries as entry}
              <a
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                class="group flex items-center gap-4 rounded-xl border
                border-prairie-green-25 bg-prairie-mist p-4 shadow-sm
                transition-all hover:-translate-y-0.5 hover:border-prairie-green/30
                hover:shadow-md">
                <div
                  class="flex h-11 w-11 shrink-0 items-center justify-center
                  rounded-lg bg-prairie-green/10 text-prairie-green
                  transition-colors group-hover:bg-prairie-green
                  group-hover:text-white">
                  <FileText size={20} />
                </div>
                <div class="min-w-0">
                  <p
                    class="font-heading text-sm font-semibold text-compass-gray">
                    {entry.monthName} {entry.day}
                  </p>
                  <p class="text-xs text-trail-gray">
                    {entry.monthName}
                    {entry.day}, {entry.year}
                  </p>
                </div>
                <Download
                  size={16}
                  class="ml-auto shrink-0 text-trail-gray/50
                  transition-colors group-hover:text-prairie-green" />
              </a>
            {/each}
          </div>
        </div>
      {/each}

      <p class="mt-8 text-center text-sm text-trail-gray">
        {data.totalCount} set{data.totalCount !== 1 ? "s" : ""} of meeting minutes
        available.
      </p>
    {:else}
      <div
        class="rounded-xl border border-prairie-green-25 bg-prairie-mist p-14
        text-center">
        <ClipboardList size={40} class="mx-auto mb-4 text-prairie-green-50" />
        <h2 class="font-heading text-xl font-semibold text-compass-gray">
          No Meeting Minutes Available
        </h2>
        <p class="mx-auto mt-2 max-w-md text-trail-gray">
          There are no meeting minutes posted yet. Check back after the next
          executive committee meeting.
        </p>
      </div>
    {/if}

    <p class="mt-6 text-center text-sm text-trail-gray">
      Questions about meeting minutes? Contact the executive committee at
      <a
        href="mailto:nebraskache@gmail.com"
        class="font-medium text-prairie-green hover:text-prairie-gold">
        nebraskache@gmail.com
      </a>
    </p>
  </div>
</section>
