import { asText } from '@prismicio/client';
import { createClient } from '$lib/prismicio';
import { fail } from '@sveltejs/kit';
import { dev } from '$app/environment';

export async function load({ params, fetch, cookies }) {
	const client = createClient({ fetch, cookies });

	const page = await client.getByUID('page', params.uid);

	return {
		page,
		title: asText(page.data.title),
		meta_description: page.data.meta_description,
		meta_title: page.data.meta_title,
		meta_image: page.data.meta_image.url
	};
}

export async function entries() {
	const client = createClient();

	const pages = await client.getAllByType('page');

	return pages.map((page) => {
		return { uid: page.uid };
	});
}

export const actions = {
	default: async ({ request, fetch }) => {
		// Access the form data
		const data = await request.formData();
		// Retrieve the user's email
		const email = data.get("email");
		// Retrieve the user's message
		const message = data.get("message");

		// Send the email and message to an external API
		// Update this endpoint to send the data wherever you want
		const response = await fetch("https://monkey-elephant.free.beeceptor.com", {
			method: "post",
			body: JSON.stringify({
				email,
				message,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		// Simulate a 1s loading time in development
		if (dev) {
			await new Promise((resolve) => setTimeout(resolve, 1000));
		}

		// Return an error if the API request is not successful
		if (response.status !== 200) {
			return fail(500);
		}

		// Return a success message
		return {
			success: true,
		};
	},
};
