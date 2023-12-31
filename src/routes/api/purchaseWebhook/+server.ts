import type { RequestHandler, RequestEvent } from '@sveltejs/kit';

import { admin } from '$utils/shopify';
import {
	createCardMetaobjectMutation,
	deleteCustomerCardMutation,
	getCardMetaobjectQuery,
	getCustomerCardsByIdQuery,
	updateCustomerCardsMutation
} from '$utils/queries.admin';

export const POST: RequestHandler = async (event: RequestEvent) => {
	const resBody = await event.request.json();

	const customerCardsResponse = await admin.request(getCustomerCardsByIdQuery, {
		variables: {
			customer_id: `gid://shopify/Customer/${resBody.customer.id}`
		}
	});

	if (!customerCardsResponse.data) {
		console.log(JSON.stringify(customerCardsResponse, null, 2));

		return new Response();
	}

	const customerCards = JSON.parse(customerCardsResponse.data.customer.cards.value) || [];

	for (const cardId of customerCards) {
		const card = await admin.request(getCardMetaobjectQuery, {
			variables: {
				card_id: cardId
			}
		});

		if (!card.data) {
			console.log(JSON.stringify(card, null, 2));
			return new Response();
		}

		const cardData = card.data.metaobject;
		const cardOrder = parseInt(cardData.order_id.value);
		const cardProductType = parseInt(cardData.type.value.split('/')[4]);
		const cardProductVariant = parseInt(cardData.variant.value.split('/')[4]);

		if (cardOrder === resBody.id) {
			for (const item of resBody.line_items) {
				if (item.product_id === cardProductType && item.variant_id === cardProductVariant) {
					if (item.quantity === 1) {
						const index = resBody.line_items.indexOf(item);
						resBody.line_items.splice(index, 1);
					} else {
						item.quantity--;
					}
					break;
				}
			}
		}
	}

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

	if (!customerCardsResponse.data) {
		console.log(JSON.stringify(customerCardsResponse, null, 2));
		for (const cardId of cardIds) {
			admin.request(deleteCustomerCardMutation, { variables: { card_id: cardId } });
		}
		return new Response();
	}

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

	console.log('Done');

	return new Response();
};
