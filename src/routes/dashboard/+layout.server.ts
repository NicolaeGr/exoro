import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import {
	getLinksMetafieldByCustomerIdQuery,
	getProfilesMetafieldByCustomerIdQuery
} from '$utils/queries.admin';
import { admin } from '$utils/shopify';

export const load: LayoutServerLoad = async ({ locals }) => {
	const user = await locals.getSession();

	if (!user) redirect(302, '/login');

	const resultData: any = { user: user };

	const [profilesResponse, linksResponse] = await Promise.all([
		admin.request(getProfilesMetafieldByCustomerIdQuery, {
			variables: {
				customer_id: user.id
			}
		}),
		admin.request(getLinksMetafieldByCustomerIdQuery, {
			variables: {
				customer_id: user.id
			}
		})
	]);

	if (!profilesResponse.data || !linksResponse.data) {
		console.log(JSON.stringify(profilesResponse, null, 2));
		console.log(JSON.stringify(linksResponse, null, 2));
	}

	const profiles = JSON.parse(profilesResponse.data.customer.profiles?.value || '[]');
	const links = JSON.parse(linksResponse.data.customer.links?.value || '[]');

	resultData.profiles = profiles;
	resultData.links = links;

	return resultData;
};
