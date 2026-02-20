<script lang="ts">
	import { MapPin, Calendar, ExternalLink, Users } from 'lucide-svelte';
	import type { GeoEvent } from '$lib/types';

	let { event }: { event: GeoEvent } = $props();

	let date = $derived(new Date(event.date));
	let month = $derived(date.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' }));
	let day = $derived(date.getUTCDate());
	let year = $derived(date.getUTCFullYear());
	let time = $derived(date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'UTC' }));
	let weekday = $derived(date.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' }));

	let startTime = $derived(new Date(event.startTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'UTC' }));
	let endTime = $derived(new Date(event.endTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'UTC' }));

	function formatCoord(lat: number, lon: number): string {
		const latDir = lat >= 0 ? 'N' : 'S';
		const lonDir = lon >= 0 ? 'E' : 'W';
		const absLat = Math.abs(lat);
		const absLon = Math.abs(lon);
		const latDeg = Math.floor(absLat);
		const latMin = ((absLat - latDeg) * 60).toFixed(3);
		const lonDeg = Math.floor(absLon);
		const lonMin = ((absLon - lonDeg) * 60).toFixed(3);
		return `${latDir} ${latDeg}\u00B0 ${latMin}\u2032 ${lonDir} ${lonDeg}\u00B0 ${lonMin}\u2032`;
	}
</script>

<article class="group flex overflow-hidden rounded-xl border border-prairie-green-25 bg-white shadow-sm transition-shadow hover:shadow-md">
	<!-- Date badge -->
	<div class="flex w-20 shrink-0 flex-col items-center justify-center bg-prairie-green p-3 text-white sm:w-24">
		<span class="font-heading text-xs font-semibold uppercase tracking-wide text-prairie-gold">{month}</span>
		<span class="font-heading text-2xl font-bold leading-tight sm:text-3xl">{day}</span>
		<span class="text-xs text-white/70">{year}</span>
	</div>

	<!-- Content -->
	<div class="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
		<div class="mb-1">
			<span class="inline-block rounded-full bg-prairie-gold-25 px-2.5 py-0.5 text-xs font-medium text-prairie-green">
				{event.type}
			</span>
		</div>

		<h3 class="font-heading text-base font-semibold text-compass-gray group-hover:text-prairie-green sm:text-lg">
			{event.name}
		</h3>

		<div class="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-trail-gray sm:text-sm">
			<span class="flex items-center gap-1">
				<Calendar size={14} class="text-prairie-green-50" />
				{weekday}, {startTime} - {endTime}
			</span>
			{#if event.placedBy}
				<span class="flex items-center gap-1">
					<Users size={14} class="text-prairie-green-50" />
					{event.placedBy}
				</span>
			{/if}
		</div>

		<div class="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-trail-gray sm:text-sm">
			<span class="flex items-center gap-1">
				<MapPin size={14} class="text-prairie-green-50" />
				{formatCoord(event.lat, event.lon)}
			</span>
		</div>

		<div class="mt-3">
			<a
				href={event.url}
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-1 text-sm font-medium text-prairie-green transition-colors hover:text-prairie-gold"
			>
				View on Geocaching.com
				<ExternalLink size={14} />
			</a>
		</div>
	</div>
</article>
