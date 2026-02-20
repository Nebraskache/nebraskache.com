<script lang="ts">
  import { MapPin, CalendarDays } from "lucide-svelte";
  import EventCard from "$lib/components/EventCard.svelte";

  let { data } = $props();

  // Set filter date to yesterday
  const placedAfterDate = new Date();
  placedAfterDate.setDate(placedAfterDate.getDate() - 1);
  const geoSearchLink = `https://www.geocaching.com/play/results?sort=placeDate&asc=true&st=Nebraska%2C+United+States&ot=region&oid=28&r=10&ct=6%2C13%2C453%2C7005%2C4738%2C3774%2C1304%2C3653&sd=0&pad=${placedAfterDate
    .toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    })
    .split("/")
    .reverse()
    .join("-")}`;
</script>

<svelte:head>
  <title>Upcoming Events — Nebraskache</title>
  <meta
    name="description"
    content="Find upcoming geocaching events across Nebraska. Community
    celebrations, meetups, and adventures organized by geocachers statewide." />
</svelte:head>

<!-- Page header -->
<section
  class="topo-bg bg-gradient-to-b from-prairie-green-25/40 to-prairie-mist">
  <div class="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
    <div class="flex items-center gap-3 mb-3">
      <CalendarDays size={28} class="text-prairie-green" />
      <h1
        class="font-heading text-3xl font-bold text-prairie-green sm:text-4xl">
        Upcoming Events
      </h1>
    </div>
    <p class="max-w-2xl text-lg text-trail-gray">
      Discover geocaching events happening across Nebraska. From community
      celebrations to casual meetups, there's always an adventure waiting.
    </p>
    <p class="mt-2 text-sm text-trail-gray/70">
      Events are updated daily from Geocaching.com. For the most up-to-date
      information, please search
      <a
        href={geoSearchLink}
        target="_blank"
        rel="noopener noreferrer"
        class="font-medium text-prairie-green hover:text-prairie-gold">
        Geocaching.com.
      </a>
    </p>
  </div>
</section>

<!-- Events listing -->
<section class="bg-white py-12 sm:py-16">
  <div class="mx-auto max-w-6xl px-4 sm:px-6">
    {#if data.events.length > 0}
      <div class="grid gap-4">
        {#each data.events as event}
          <EventCard {event} />
        {/each}
      </div>
      <p class="mt-8 text-center text-sm text-trail-gray">
        Showing {data.events.length} upcoming event{data.events.length !== 1 ? 's' : ''}
        in Nebraska.
      </p>
    {:else}
      <div
        class="rounded-xl border border-prairie-green-25 bg-prairie-mist p-14
        text-center">
        <MapPin size={40} class="mx-auto mb-4 text-prairie-green-50" />
        <h2 class="font-heading text-xl font-semibold text-compass-gray">
          No Upcoming Events
        </h2>
        <p class="mx-auto mt-2 max-w-md text-trail-gray">
          We don't know about any upcoming geocaching events in Nebraska right
          now. Check back soon, or visit
          <a
            href={geoSearchLink}
            target="_blank"
            rel="noopener noreferrer"
            class="font-medium text-prairie-green hover:text-prairie-gold">
            Geocaching.com
          </a>
          for the most up-to-date information.
        </p>
      </div>
    {/if}
  </div>
</section>
