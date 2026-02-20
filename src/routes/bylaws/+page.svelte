<script lang="ts">
  import { FileText, Download } from "lucide-svelte";
</script>

<svelte:head>
  <title>Bylaws — Nebraskache</title>
  <meta
    name="description"
    content="Read or download the official Nebraskache bylaws governing our
    geocaching organization." />
</svelte:head>

<!-- Page header -->
<section
  class="topo-bg bg-gradient-to-b from-prairie-green-25/40 to-prairie-mist">
  <div class="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
    <div class="flex items-center gap-3 mb-3">
      <FileText size={28} class="text-prairie-green" />
      <h1
        class="font-heading text-3xl font-bold text-prairie-green sm:text-4xl">
        Bylaws
      </h1>
    </div>
    <p class="max-w-2xl text-lg text-trail-gray">
      The Nebraskache bylaws outline our organization's structure, membership
      guidelines, election procedures, and committee responsibilities.
    </p>
  </div>
</section>

<!-- Bylaws document -->
<section class="bg-white py-12 sm:py-16">
  <div class="mx-auto max-w-4xl px-4 sm:px-6">
    <div class="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h2 class="font-heading text-xl font-semibold text-prairie-green">
          Nebraskache Bylaws
        </h2>
        <p class="mt-1 text-sm text-trail-gray">
          These bylaws govern all organizational activities and elections.
        </p>
      </div>
      <a
        href="/2015Bylaws.pdf"
        download
        class="inline-flex items-center gap-2 rounded-lg bg-prairie-green px-4
        py-2.5 font-heading text-sm font-semibold text-white shadow-sm
        transition-all hover:-translate-y-0.5 hover:bg-prairie-green/90
        hover:shadow-md">
        <Download size={16} />
        Download PDF
      </a>
    </div>

    <div
      class="overflow-hidden rounded-xl border border-prairie-green-25
      bg-prairie-mist shadow-sm">
      <object
        data="/2015Bylaws.pdf"
        type="application/pdf"
        width="100%"
        height="800"
        title="Nebraskache Bylaws PDF">
        <div class="p-10 text-center">
          <FileText size={40} class="mx-auto mb-4 text-prairie-green-50" />
          <p class="text-trail-gray">
            Your browser doesn't support embedded PDFs.
          </p>
          <a
            href="/2015Bylaws.pdf"
            download
            class="mt-4 inline-flex items-center gap-2 rounded-lg
            bg-prairie-green px-5 py-2.5 font-heading text-sm font-semibold
            text-white shadow-sm transition-all hover:bg-prairie-green/90">
            <Download size={16} />
            Download the Bylaws
          </a>
        </div>
      </object>
    </div>

    <p class="mt-6 text-center text-sm text-trail-gray">
      Questions about the bylaws? Contact the executive committee at
      <a
        href="mailto:nebraskache@gmail.com"
        class="font-medium text-prairie-green hover:text-prairie-gold">
        nebraskache@gmail.com
      </a>
    </p>
  </div>
</section>
