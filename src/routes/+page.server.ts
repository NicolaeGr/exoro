import { error, type NumericRange } from '@sveltejs/kit';
import { client } from '$utils/shopify.js';
import { profileListQuery } from '$utils/queries.js';

export async function load({ url }) {
	const { data, errors, extensions } = await client.request(profileListQuery);

	if (data) {
		const profiles = data.metaobjects?.nodes;

		if (profiles) return { profiles };
	} else {
		throw error(errors?.networkStatusCode as NumericRange<400, 599>);
	}
}
