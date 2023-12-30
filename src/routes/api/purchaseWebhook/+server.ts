import type { RequestHandler, RequestEvent } from '@sveltejs/kit';

import { admin } from '$utils/shopify';
import {
	createCardMetaobjectMutation,
	deleteCustomerCardMutation,
	getCustomerCardsByIdQuery,
	updateCustomerCardsMutation
} from '$utils/queries.admin';

export const POST: RequestHandler = async (event: RequestEvent) => {
	const resBody = await event.request.json();

	const cardIds = [];

	for (const item of resBody.line_items) {
		const cardCreationResponse = await admin.request(createCardMetaobjectMutation, {
			variables: {
				order_id: `${resBody.id}`,
				product_type: `gid://shopify/Product/${item.product_id}`,
				product_variant: `gid://shopify/ProductVariant/${item.variant_id}`
			}
		});

		const cardMetaobject = cardCreationResponse.data.metaobjectCreate.metaobject;

		cardIds.push(cardMetaobject.id);
	}

	const customerCardsResponse = await admin.request(getCustomerCardsByIdQuery, {
		variables: {
			customer_id: `gid://shopify/Customer/${resBody.customer.id}`
		}
	});

	if (!customerCardsResponse.data) {
		admin.request(deleteCustomerCardMutation, { variables: { card_id: cardIds } });
	}

	const customerCardsData = customerCardsResponse.data.customer;
	const customerCards = (customerCardsData.cards as Array<any>) || [];

	customerCards.push(...cardIds);

	const customerCardsUpdateResponse = await admin.request(updateCustomerCardsMutation, {
		variables: {
			customer_id: `gid://shopify/Customer/${resBody.customer.id}`,
			cards: JSON.stringify(customerCards)
		}
	});

	if (!customerCardsUpdateResponse.data) {
		admin.request(deleteCustomerCardMutation, { variables: { card_id: cardIds } });
	}

	return new Response();
};
