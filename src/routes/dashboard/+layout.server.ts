import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import {
	getCustomerCardsMetafieldByIdQuery,
	getLinksMetafieldByCustomerIdQuery,
	getProfilesMetafieldByCustomerIdQuery
} from '$utils/queries.admin';
import { admin } from '$utils/shopify';

export const load: LayoutServerLoad = async ({ locals }) => {
	const user = await locals.getSession();

	if (!user) redirect(302, '/login');

	const resultData: any = { user: user };

	const [profilesResponse, linksResponse, cardsResponse] = await Promise.all([
		admin.request(getProfilesMetafieldByCustomerIdQuery, {
			variables: {
				customer_id: user.id
			}
		}),
		admin.request(getLinksMetafieldByCustomerIdQuery, {
			variables: {
				customer_id: user.id
			}
		}),
		admin.request(getCustomerCardsMetafieldByIdQuery, {
			variables: {
				customer_id: user.id
			}
		})
	]);

	const profiles = JSON.parse(profilesResponse.data?.customer?.profiles?.value || '[]');
	const links = JSON.parse(linksResponse.data?.customer?.links?.value || '[]');
	const cards = JSON.parse(cardsResponse.data?.customer?.cards?.value || '[]');

	resultData.profileIds = profiles;
	resultData.linkIds = links;
	resultData.cardIds = cards;

	return resultData;
};
