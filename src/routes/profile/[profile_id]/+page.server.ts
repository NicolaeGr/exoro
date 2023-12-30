import type { PageServerLoad } from './$types';

import { error, type NumericRange } from '@sveltejs/kit';

import { client } from '$utils/shopify';
import { profileQuery } from '$utils/queries.storefront';

export const load: PageServerLoad = async ({ params }) => {
	const { data, errors, extensions } = await client.request(profileQuery, {
		variables: { profile_id: params.profile_id }
	});
	if (data) {
		const profile = data.metaobject;

		if (profile) return { profile };
	} else {
		throw error(errors?.networkStatusCode as NumericRange<400, 599>);
	}
};
