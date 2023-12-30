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
		for (let i = 0; i < item.quantity; i++) {
			const cardCreationResponse = await admin.request(createCardMetaobjectMutation, {
				variables: {
					order_id: `${resBody.id}`,
					product_type: `gid://shopify/Product/${item.product_id}`,
					product_variant: `gid://shopify/ProductVariant/${item.variant_id}`
				}
			});

			const cardMetaobject = cardCreationResponse.data.metaobjectCreate.metaobject;

			cardIds.push(cardMetaobject.id);
			console.log(cardIds);
		}
	}

	const customerCardsResponse = await admin.request(getCustomerCardsByIdQuery, {
		variables: {
			customer_id: `gid://shopify/Customer/${resBody.customer.id}`
		}
	});

	if (!customerCardsResponse.data) {
		console.log(JSON.stringify(customerCardsResponse, null, 2));
		for (const cardId of cardIds) {
			admin.request(deleteCustomerCardMutation, { variables: { card_id: cardId } });
		}
		return new Response();
	}

	const customerCardsData = customerCardsResponse.data.customer;
	const customerCards = (JSON.parse(customerCardsData.cards.value) as Array<String>) || [];

	customerCards.push(...cardIds);
	console.log('Final:', customerCards);

	const customerCardsUpdateResponse = await admin.request(updateCustomerCardsMutation, {
		variables: {
			customer_id: `gid://shopify/Customer/${resBody.customer.id}`,
			cards: JSON.stringify(customerCards)
		}
	});

	if (!customerCardsUpdateResponse.data) {
		console.log(JSON.stringify(customerCardsUpdateResponse, null, 2));
		for (const cardId of cardIds) {
			admin.request(deleteCustomerCardMutation, { variables: { card_id: cardId } });
		}
		return new Response();
	}

	return new Response();
};
