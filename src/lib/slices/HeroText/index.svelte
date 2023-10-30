<script>
	import { PrismicRichText } from '@prismicio/svelte';
	/** @type {import("@prismicio/client").Content.HeroTextSlice} */
	export let slice;
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<!-- Placeholder component for {slice.slice_type} (variation: {slice.variation}) Slices -->
	<PrismicRichText field={slice.primary.title} />
	<PrismicRichText field={slice.primary.subtitle} />
</section>

<style>
	section :global(h1) {
		color: var(--red-5);
		text-align: right;
		font-size: var(--size-11);
		line-height: var(--size-11);
		width: min-content;
	}

	section :global(p) {
		color: black;
		text-align: left;
		font-size: var(--size-7);
		font-family: var(--font-serif);
		color: var(--purple-11);
		font-size: var(--size-8);
		line-height: 120%;
		width: min-content;
	}
</style>
