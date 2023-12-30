import type { PageServerLoad } from './$types';

type ProfileType = {
	[key: string]: {
		value: any;
	};
};

import { error, type NumericRange } from '@sveltejs/kit';

import { client } from '$utils/shopify.js';
import { profileListQuery } from '$utils/queries.storefront.js';

export const load: PageServerLoad = async ({ url }) => {
	const { data, errors, extensions } = await client.request(profileListQuery);

	if (data) {
		const profiles: [ProfileType] = data.metaobjects?.nodes;

		if (profiles) return { profiles };
		else return { profiles: [] };
	} else {
		throw error(errors?.networkStatusCode as NumericRange<400, 599>);
	}
};
