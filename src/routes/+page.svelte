<script lang="ts">
  import {
    CalendarDays,
    Users,
    Award,
    MessageSquare,
    ChevronRight,
    MapPin,
    ArrowRight
  } from "lucide-svelte";
  import EventCard from "$lib/components/EventCard.svelte";

  let { data } = $props();
</script>

<svelte:head>
  <title>Nebraskache — Nebraska's Geocaching Community</title>
  <meta
    property="og:title"
    content="Nebraskache — Nebraska's Geocaching Community" />
  <meta
    property="og:description"
    content="Join Nebraska's geocaching community. Events, membership,
    resources, and adventure across the Great Plains." />
  <meta property="og:image" content="/nebraskache.svg" />
</svelte:head>

<!-- Hero -->
<section
  class="topo-bg relative overflow-hidden bg-gradient-to-b
  from-prairie-green-25/40 to-prairie-mist">
  <div
    class="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:py-36">
    <img
      src="/nebraskache.svg"
      alt="Nebraskache logo"
      class="mx-auto mb-6 h-20 w-auto sm:h-24 lg:h-28" />
    <h1
      class="font-heading text-3xl font-bold text-prairie-green sm:text-4xl
      lg:text-5xl">
      Discover Nebraska, One Cache at a Time
    </h1>
    <p class="mx-auto mt-4 max-w-2xl text-lg text-trail-gray sm:text-xl">
      Nebraskache is the state's premier geocaching community — organizing
      events, supporting members, and connecting adventurers across the Great
      Plains.
    </p>
    <div class="mt-8 flex flex-wrap justify-center gap-4">
      <a
        href="/events"
        class="inline-flex items-center gap-2 rounded-lg bg-prairie-green px-6
        py-3 font-heading text-sm font-semibold text-white shadow-md
        transition-all hover:-translate-y-0.5 hover:bg-prairie-green/90
        hover:shadow-lg">
        <CalendarDays size={18} />
        View Upcoming Events
      </a>
      <a
        href="/membership"
        class="inline-flex items-center gap-2 rounded-lg border-2
        border-prairie-gold bg-white px-6 py-3 font-heading text-sm
        font-semibold text-compass-gray shadow-sm transition-all
        hover:-translate-y-0.5 hover:bg-prairie-gold-25 hover:shadow-md">
        <Users size={18} />
        Become a Member
      </a>
    </div>
  </div>
</section>

<!-- Upcoming Events Preview -->
<section class="bg-white py-16 sm:py-20">
  <div class="mx-auto max-w-6xl px-4 sm:px-6">
    <div class="mb-10 flex items-end justify-between">
      <div>
        <h2
          class="font-heading text-2xl font-semibold text-prairie-green
          sm:text-3xl">
          Upcoming Events
        </h2>
        <p class="mt-2 text-trail-gray">
          Join fellow geocachers at community events across Nebraska.
        </p>
      </div>
      <a
        href="/events"
        class="hidden items-center gap-1 font-heading text-sm font-medium
        text-prairie-green transition-colors hover:text-prairie-gold sm:flex">
        See all events
        <ChevronRight size={16} />
      </a>
    </div>

    {#if data.upcomingEvents.length > 0}
      <div class="grid gap-4">
        {#each data.upcomingEvents as event}
          <EventCard {event} />
        {/each}
      </div>
    {:else}
      <div
        class="rounded-xl border border-prairie-green-25 bg-prairie-mist p-10
        text-center">
        <MapPin size={32} class="mx-auto mb-3 text-prairie-green-50" />
        <p class="text-trail-gray">
          No upcoming events right now. Check back soon!
        </p>
      </div>
    {/if}

    <div class="mt-6 text-center sm:hidden">
      <a
        href="/events"
        class="inline-flex items-center gap-1 font-heading text-sm font-medium
        text-prairie-green hover:text-prairie-gold">
        See all events
        <ChevronRight size={16} />
      </a>
    </div>
  </div>
</section>

<!-- Why Join Nebraskache -->
<section class="topo-bg bg-prairie-mist py-16 sm:py-20">
  <div class="mx-auto max-w-6xl px-4 sm:px-6">
    <div class="mb-10 text-center">
      <h2
        class="font-heading text-2xl font-semibold text-prairie-green
        sm:text-3xl">
        Why Join Nebraskache?
      </h2>
      <p class="mx-auto mt-2 max-w-xl text-trail-gray">
        Membership connects you with a passionate community of geocachers across
        the state.
      </p>
    </div>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div
        class="rounded-xl border border-prairie-green-25 bg-white p-6 shadow-sm">
        <div
          class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg
          bg-prairie-green/10">
          <CalendarDays size={24} class="text-prairie-green" />
        </div>
        <h3 class="mb-2 font-heading text-base font-semibold text-compass-gray">
          Community Events
        </h3>
        <p class="text-sm leading-relaxed text-trail-gray">
          Access to exclusive Nebraskache-organized events, meetups, and
          geocaching adventures.
        </p>
      </div>

      <div
        class="rounded-xl border border-prairie-green-25 bg-white p-6 shadow-sm">
        <div
          class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg
          bg-prairie-gold/10">
          <MessageSquare size={24} class="text-prairie-gold" />
        </div>
        <h3 class="mb-2 font-heading text-base font-semibold text-compass-gray">
          Your Voice Matters
        </h3>
        <p class="text-sm leading-relaxed text-trail-gray">
          Help shape the direction of geocaching in Nebraska through voting and
          community input.
        </p>
      </div>

      <div
        class="rounded-xl border border-prairie-green-25 bg-white p-6 shadow-sm">
        <div
          class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg
          bg-prairie-green/10">
          <Award size={24} class="text-prairie-green" />
        </div>
        <h3 class="mb-2 font-heading text-base font-semibold text-compass-gray">
          Stay Informed
        </h3>
        <p class="text-sm leading-relaxed text-trail-gray">
          Receive updates on geocaching news, trail changes, land-use
          guidelines, and community happenings.
        </p>
      </div>

      <div
        class="rounded-xl border border-prairie-green-25 bg-white p-6 shadow-sm">
        <div
          class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg
          bg-prairie-gold/10">
          <Users size={24} class="text-prairie-gold" />
        </div>
        <h3 class="mb-2 font-heading text-base font-semibold text-compass-gray">
          Connect & Collaborate
        </h3>
        <p class="text-sm leading-relaxed text-trail-gray">
          Join a network of geocachers from across Nebraska — from the Missouri
          River to the Sandhills.
        </p>
      </div>
    </div>

    <div class="mt-10 text-center">
      <a
        href="/membership"
        class="inline-flex items-center gap-2 rounded-lg bg-prairie-green px-6
        py-3 font-heading text-sm font-semibold text-white shadow-md
        transition-all hover:-translate-y-0.5 hover:bg-prairie-green/90
        hover:shadow-lg">
        Join Nebraskache
        <ArrowRight size={18} />
      </a>
    </div>
  </div>
</section>

<!-- Get Involved -->
<section class="bg-white py-16 sm:py-20">
  <div class="mx-auto max-w-4xl px-4 text-center sm:px-6">
    <h2
      class="font-heading text-2xl font-semibold text-prairie-green sm:text-3xl">
      Get Involved
    </h2>
    <p class="mx-auto mt-3 max-w-xl text-trail-gray">
      Whether you're a seasoned cacher or just getting started, there's a place
      for you in the Nebraskache community. Here's how you can participate.
    </p>
    <div class="mt-8 flex flex-wrap justify-center gap-4">
      <a
        href="/feedback"
        class="inline-flex items-center gap-2 rounded-lg border
        border-prairie-green-25 bg-white px-5 py-2.5 text-sm font-medium
        text-compass-gray shadow-sm transition-all hover:-translate-y-0.5
        hover:shadow-md">
        <MessageSquare
          size={16}
          class="text-prairie-green hover:text-prairie-gold" />
        Share Feedback
      </a>
      <a
        href="https://www.facebook.com/groups/107321656812"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 rounded-lg border
        border-prairie-green-25 bg-white px-5 py-2.5 text-sm font-medium
        text-compass-gray shadow-sm transition-all hover:-translate-y-0.5
        hover:shadow-md">
        <Users size={16} class="text-prairie-green hover:text-prairie-gold" />
        Join Our Facebook Group
      </a>
      <a
        href="/about"
        class="inline-flex items-center gap-2 rounded-lg border
        border-prairie-green-25 bg-white px-5 py-2.5 text-sm font-medium
        text-compass-gray shadow-sm transition-all hover:-translate-y-0.5
        hover:shadow-md">
        <Award size={16} class="text-prairie-green hover:text-prairie-gold" />
        Meet the Committee
      </a>
    </div>
  </div>
</section>
