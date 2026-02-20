<script lang="ts">
  import {
    CheckCircle,
    Users,
    CalendarDays,
    Vote,
    Newspaper,
    Heart,
    ArrowDown
  } from "lucide-svelte";

  const benefits = [
    {
      icon: CalendarDays,
      title: "Exclusive Events",
      description:
        "Access to Nebraskache-organized events, meetups, and geocaching gatherings throughout the year."
    },
    {
      icon: Vote,
      title: "Voting Rights",
      description:
        "Vote in annual elections and help choose the leadership that guides our organization."
    },
    {
      icon: Newspaper,
      title: "Community Updates",
      description:
        "Stay informed with geocaching news in Nebraska, trail and land-use updates, and community happenings across the state."
    },
    {
      icon: Users,
      title: "Network",
      description:
        "Connect with a passionate community of geocachers from across the Great Plains."
    },
    {
      icon: Heart,
      title: "Support the Hobby",
      description:
        "Your membership helps support events, maintain relationships with land managers, and grow geocaching in Nebraska."
    },
    {
      icon: CheckCircle,
      title: "Run for Office",
      description:
        "Eligible to run for positions on the executive committee and help shape the future of Nebraskache."
    }
  ];
</script>

<svelte:head>
  <title>Membership — Nebraskache</title>
  <meta
    name="description"
    content="Join Nebraskache and become part of Nebraska's geocaching
    community. Learn about member benefits and sign up today." />
</svelte:head>

<!-- Page header -->
<section
  class="topo-bg bg-gradient-to-b from-prairie-green-25/40 to-prairie-mist">
  <div class="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
    <div class="flex items-center gap-3 mb-3">
      <Users size={28} class="text-prairie-green" />
      <h1
        class="font-heading text-3xl font-bold text-prairie-green sm:text-4xl">
        Become a Member
      </h1>
    </div>
    <p class="max-w-2xl text-lg text-trail-gray">
      Membership is free. Join Nebraskache and be part of a community that
      promotes, organizes, and supports geocaching across the state.
    </p>
  </div>
</section>

<!-- Benefits -->
<section class="bg-white py-12 sm:py-16">
  <div class="mx-auto max-w-6xl px-4 sm:px-6">
    <h2
      class="mb-8 text-center font-heading text-2xl font-semibold
      text-prairie-green sm:text-3xl">
      Member Benefits
    </h2>
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {#each benefits as benefit}
        <div
          class="rounded-xl border border-prairie-green-25 bg-prairie-mist/50
          p-6">
          <div
            class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg
            bg-prairie-green/10">
            <benefit.icon size={20} class="text-prairie-green" />
          </div>
          <h3
            class="mb-2 font-heading text-base font-semibold text-compass-gray">
            {benefit.title}
          </h3>
          <p class="text-sm leading-relaxed text-trail-gray">
            {benefit.description}
          </p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Signup Form -->
<section class="topo-bg bg-prairie-mist py-12 sm:py-16">
  <div class="mx-auto max-w-3xl px-4 sm:px-6">
    <div class="text-center mb-8">
      <h2
        class="font-heading text-2xl font-semibold text-prairie-green
        sm:text-3xl">
        Sign Up
      </h2>
      <p class="mt-2 text-trail-gray">
        Ready to join? Fill out the form below to become a Nebraskache member.
      </p>
      <div class="mt-3 flex justify-center">
        <ArrowDown size={20} class="animate-bounce text-prairie-green" />
      </div>
    </div>

    <div
      class="overflow-hidden rounded-xl border border-prairie-green-25 bg-white
      shadow-sm">
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSdYtoxxxQg95hZgJjS0zvnTkIv1K6LmYv9yRFbaqukFpGg93A/viewform?embedded=true"
        width="100%"
        height="800"
        frameborder="0"
        marginheight="0"
        marginwidth="0"
        title="Nebraskache Membership Form">
        Loading membership form...
      </iframe>
    </div>
    <p class="mt-4 text-center text-sm text-trail-gray">
      Having trouble with the form?
      <a
        href="mailto:nebraskache@gmail.com"
        class="font-medium text-prairie-green hover:text-prairie-gold">
        Email us directly
      </a>
      and we'll get you signed up.
    </p>
  </div>
</section>
