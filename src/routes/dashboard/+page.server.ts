import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { admin } from '$utils/shopify';
import { getCustomerCardsMetafieldByIdQuery } from '$utils/queries.admin';

export const load: PageServerLoad = async ({ request, parent }) => {
	const data = await parent();

	const cardsResponse = await admin.request(getCustomerCardsMetafieldByIdQuery, {
		variables: {
			customer_id: data.user.id
		}
	});

	const cards = JSON.parse(cardsResponse.data.customer.cards.value || '[]');
	if (cards) return { cards };
	return {};
};
