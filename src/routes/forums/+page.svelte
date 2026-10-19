<script lang="ts">
  import { MessagesSquare, Facebook, MessageSquare } from "lucide-svelte";
</script>

<svelte:head>
  <title>Forums — Nebraskache</title>
  <meta
    name="description"
    content="The Nebraskache forums are closed. Join the conversation in our
    Facebook group." />
</svelte:head>

<!-- Page header -->
<section
  class="topo-bg bg-gradient-to-b from-prairie-green-25/40 to-prairie-mist">
  <div class="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
    <div class="flex items-center gap-3 mb-3">
      <MessagesSquare size={28} class="text-prairie-green" />
      <h1
        class="font-heading text-3xl font-bold text-prairie-green sm:text-4xl">
        Forums
      </h1>
    </div>
    <p class="max-w-2xl text-lg text-trail-gray">
      The Nebraskache forums have been retired, but the conversation lives on.
    </p>
  </div>
</section>

<!-- Closed notice -->
<section class="bg-white py-12 sm:py-16">
  <div class="mx-auto max-w-3xl px-4 text-center sm:px-6">
    <h2 class="font-heading text-2xl font-semibold text-prairie-green">
      The Forums Are Closed
    </h2>
    <p class="mx-auto mt-3 max-w-xl text-trail-gray">
      Thanks to everyone who shared logs, tips, and event plans on the forums
      over the years. These days the community gathers in our Facebook group —
      come say hello, ask questions, and stay up to date on upcoming events.
    </p>
    <div class="mt-8 flex flex-wrap justify-center gap-4">
      <a
        href="https://www.facebook.com/groups/107321656812"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 rounded-lg bg-prairie-green px-5
        py-2.5 text-sm font-medium text-white shadow-sm transition-all
        hover:-translate-y-0.5 hover:shadow-md">
        <Facebook size={16} />
        Join Our Facebook Group
      </a>
      <a
        href="/feedback"
        class="inline-flex items-center gap-2 rounded-lg border
        border-prairie-green-25 bg-white px-5 py-2.5 text-sm font-medium
        text-compass-gray shadow-sm transition-all hover:-translate-y-0.5
        hover:shadow-md">
        <MessageSquare size={16} class="text-prairie-green" />
        Share Feedback
      </a>
    </div>
  </div>
</section>
