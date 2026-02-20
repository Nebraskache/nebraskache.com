<script lang="ts">
  import { Users, Target, Heart, MapPin } from "lucide-svelte";

  const committee = [
    {
      realName: "Ray Jelinek",
      name: "CRKAT",
      role: "President",
      initials: "CR"
    },
    {
      realName: "Jordan Judt",
      name: "JavaJudt",
      role: "President-Elect",
      initials: "JJ"
    },
    {
      realName: "Janice Hueske",
      name: "LadyGunslinger",
      role: "Secretary/Treasurer",
      initials: "LG"
    },
    {
      realName: "Francis Ibero",
      name: "fsibero",
      role: "Area 1 Representative",
      initials: "FS"
    },
    {
      realName: "Steve Bradley",
      name: "Undertaker54andwife",
      role: "Area 2 Representative",
      initials: "UT"
    },
    {
      realName: "Sharon Mumaugh",
      name: "starsharon + Hubbie",
      role: "Area 3 Representative",
      initials: "SS"
    },
    {
      realName: "Lynn Litherland",
      name: "LadyCache",
      role: "Area 4 Representative",
      initials: "LC"
    },
    {
      realName: "Coby Boring",
      name: "TwoFingersDown",
      role: "Past President",
      initials: "TF"
    },
    {
      realName: "Janet Brandt",
      name: "peteach!",
      role: "Past President",
      initials: "PE"
    }
  ];

  /** Tracks which profile images failed to load; fall back to initials for those. */
  let imageFailures = $state<Record<string, boolean>>({});
</script>

<svelte:head>
  <title>About — Nebraskache</title>
  <meta
    name="description"
    content="Learn about Nebraskache, Nebraska's geocaching organization. Our
    mission, history, and the executive committee behind it all." />
</svelte:head>

<!-- Page header -->
<section
  class="topo-bg bg-gradient-to-b from-prairie-green-25/40 to-prairie-mist">
  <div class="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
    <div class="flex items-center gap-3 mb-3">
      <Users size={28} class="text-prairie-green" />
      <h1 class="font-heading text-3xl font-bold text-prairie-green sm:text-4xl">
        About Nebraskache
      </h1>
    </div>
    <p class="max-w-2xl text-lg text-trail-gray">
      Nebraska's regional geocaching organization, connecting adventurers and
      promoting the hobby we love since 2003.
    </p>
  </div>
</section>

<!-- Mission & Story -->
<section class="bg-white py-12 sm:py-16">
  <div class="mx-auto max-w-6xl px-4 sm:px-6">
    <div class="grid gap-12 lg:grid-cols-2">
      <div>
        <h2 class="font-heading text-2xl font-semibold text-prairie-green">
          Our Mission
        </h2>
        <p class="mt-4 leading-relaxed text-trail-gray">
          Nebraskache exists to promote, support, and grow the geocaching
          community across Nebraska. We organize events, advocate for
          responsible land use, provide resources for new and experienced
          geocachers, and serve as the voice of Nebraska's geocaching community.
        </p>
        <p class="mt-4 leading-relaxed text-trail-gray">
          Whether you're hiding your first cache or you've been on the trail for
          decades, Nebraskache is your home for connecting with fellow
          adventurers who share your passion for exploration and discovery.
        </p>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div
          class="rounded-xl border border-prairie-green-25 bg-prairie-mist p-5">
          <Target size={24} class="mb-3 text-prairie-green" />
          <h3 class="font-heading text-sm font-semibold text-compass-gray">
            Promote Geocaching
          </h3>
          <p class="mt-1 text-sm text-trail-gray">
            Grow awareness and participation across the state.
          </p>
        </div>
        <div
          class="rounded-xl border border-prairie-green-25 bg-prairie-mist p-5">
          <Users size={24} class="mb-3 text-prairie-green" />
          <h3 class="font-heading text-sm font-semibold text-compass-gray">
            Build Community
          </h3>
          <p class="mt-1 text-sm text-trail-gray">
            Connect geocachers through events and shared experiences.
          </p>
        </div>
        <div
          class="rounded-xl border border-prairie-green-25 bg-prairie-mist p-5">
          <MapPin size={24} class="mb-3 text-prairie-green" />
          <h3 class="font-heading text-sm font-semibold text-compass-gray">
            Support Access
          </h3>
          <p class="mt-1 text-sm text-trail-gray">
            Advocate for responsible land use and trail access.
          </p>
        </div>
        <div
          class="rounded-xl border border-prairie-green-25 bg-prairie-mist p-5">
          <Heart size={24} class="mb-3 text-prairie-green" />
          <h3 class="font-heading text-sm font-semibold text-compass-gray">
            Give Back
          </h3>
          <p class="mt-1 text-sm text-trail-gray">
            Organize CITO events and support our parks and trails.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Executive Committee -->
<section class="topo-bg bg-prairie-mist py-12 sm:py-16">
  <div class="mx-auto max-w-6xl px-4 sm:px-6">
    <div class="mb-10 text-center">
      <h2 class="font-heading text-2xl font-semibold text-prairie-green sm:text-3xl">
        2025-26 Executive Committee
      </h2>
      <p class="mx-auto mt-2 max-w-lg text-trail-gray">
        Nebraskache is led by a volunteer executive committee elected by our
        members.
      </p>
    </div>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {#each committee as member}
        <div
          class="flex items-center gap-4 rounded-xl border
          border-prairie-green-25 bg-white p-5 shadow-sm">
          {#if imageFailures[member.name]}
            <div
              class="flex h-14 w-14 shrink-0 items-center justify-center
              rounded-full bg-prairie-green text-lg font-bold text-white">
              {member.initials}
            </div>
          {:else}
            {@const titleAlt = `${member.name} | ${member.realName} | ${member.role}`}
            <img
              src={encodeURI(`/profile-pictures/${member.name}.jpg`)}
              alt={titleAlt}
			  title={titleAlt}
              class="h-14 w-14 shrink-0 rounded-full object-cover"
              onerror={() => (imageFailures = { ...imageFailures, [member.name]: true })} />
          {/if}
          <div>
            <p class="font-heading text-base font-semibold text-compass-gray">
              {member.name}
            </p>
            <p class="text-sm text-trail-gray">{member.realName}</p>
            <p class="text-sm text-trail-gray">{member.role}</p>
          </div>
        </div>
      {/each}
    </div>

    <p class="mt-8 text-center text-sm text-trail-gray">
      Interested in serving on the committee? Learn about
      <a href="/membership" class="font-medium text-prairie-green hover:text-prairie-gold">
        membership
      </a>
      and upcoming elections.
    </p>
  </div>
</section>

<!-- Elections -->
<section class="bg-white py-12 sm:py-16">
  <div class="mx-auto max-w-4xl px-4 text-center sm:px-6">
    <h2 class="font-heading text-2xl font-semibold text-prairie-green">Elections</h2>
    <p class="mx-auto mt-4 max-w-xl leading-relaxed text-trail-gray">
      Nebraskache holds elections annually in March to fill positions on the executive
      committee. All current members who are at least 18 years old and live in Nebraska are eligible to vote. 
	  Anybody who has been a member for at least four months, and is eligible to vote, may run for office.
      Election details and timelines are announced through our
      <a
        href="https://www.facebook.com/groups/107321656812"
        target="_blank"
        rel="noopener noreferrer"
        class="font-medium text-prairie-green hover:text-prairie-gold">
        Facebook group
      </a>
      and via email to members.
    </p>
    <p class="mt-4 leading-relaxed text-trail-gray">
      For full details on election procedures and committee roles, review our
      <a href="/bylaws" class="font-medium text-prairie-green hover:text-prairie-gold">
        bylaws
      </a>
      .
    </p>
  </div>
</section>
