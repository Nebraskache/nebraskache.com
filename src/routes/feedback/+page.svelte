<script lang="ts">
  import { MessageSquare, ArrowDown } from "lucide-svelte";
</script>

<svelte:head>
  <title>Feedback — Nebraskache</title>
  <meta
    name="description"
    content="Share your suggestions, ideas, and feedback with the Nebraskache
    executive committee. We value your input." />
</svelte:head>

<!-- Page header -->
<section
  class="topo-bg bg-gradient-to-b from-prairie-green-25/40 to-prairie-mist">
  <div class="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
    <div class="flex items-center gap-3 mb-3">
      <MessageSquare size={28} class="text-prairie-green" />
      <h1
        class="font-heading text-3xl font-bold text-prairie-green sm:text-4xl">
        Suggestions & Feedback
      </h1>
    </div>
    <p class="max-w-2xl text-lg text-trail-gray">
      Your voice shapes the future of Nebraskache. Whether it's an idea for an
      event, a suggestion for improvement, or general feedback — we want to hear
      from you.
    </p>
  </div>
</section>

<!-- Feedback form -->
<section class="bg-white py-12 sm:py-16">
  <div class="mx-auto max-w-3xl px-4 sm:px-6">
    <div class="text-center mb-8">
      <h2 class="font-heading text-2xl font-semibold text-prairie-green">
        Share Your Thoughts
      </h2>
      <p class="mt-2 text-trail-gray">
        All feedback is reviewed by the executive committee. Responses are
        optional but appreciated if you'd like us to follow up.
      </p>
      <div class="mt-3 flex justify-center">
        <ArrowDown size={20} class="animate-bounce text-prairie-green" />
      </div>
    </div>

    <div
      class="overflow-hidden rounded-xl border border-prairie-green-25 bg-white
      shadow-sm">
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLScv4ogylm0TX1I-zm6LpB20iWbhYnY5vuZRAeL7ksjciKUhYw/viewform?embedded=true"
        width="100%"
        height="800"
        frameborder="0"
        marginheight="0"
        marginwidth="0"
        title="Nebraskache Feedback Form">
        Loading feedback form...
      </iframe>
    </div>
    <p class="mt-4 text-center text-sm text-trail-gray">
      Prefer email? Reach us at
      <a
        href="mailto:nebraskache@gmail.com"
        class="font-medium text-prairie-green hover:text-prairie-gold">
        nebraskache@gmail.com.
      </a>
      You may also message us on
      <a
        href="https://www.geocaching.com/account/messagecenter?recipientId=049ae45d-ae04-4ee3-aa96-98317e31ba6a"
        class="font-medium text-prairie-green hover:text-prairie-gold"
        target="_blank"
        rel="noopener noreferrer">
        Geocaching.com,
      </a>
      or reach out directly to any committee member.
    </p>
  </div>
</section>
