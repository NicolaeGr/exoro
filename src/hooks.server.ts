const hostUrl = import.meta.env.VERCEL_URL;

import type { Handle } from '@sveltejs/kit';

import { getCustomerDataQuery } from '$utils/queries.storefront';
import { client, admin } from '$utils/shopify';

export const handle: Handle = async ({ event, resolve }) => {
	const { data } = await client.request(getCustomerDataQuery, {
		variables: {
			customerAccessToken: event.cookies.get('userToken')
		}
	});

	if (data) event.locals.user = data.customer;

	return resolve(event);
};

const reqQuery = /* GraphQL */ `
	mutation webhookSubscriptionCreate($topic: WebhookSubscriptionTopic!, $callbackUrl: URL!) {
		webhookSubscriptionCreate(
			topic: $topic
			webhookSubscription: { callbackUrl: $callbackUrl, format: JSON }
		) {
			userErrors {
				field
				message
			}
			webhookSubscription {
				callbackUrl
				createdAt
				format
				id
				includeFields
				topic
				updatedAt
			}
		}
	}
`;

const orderPaidWebHook = await admin.request(reqQuery, {
	variables: {
		topic: 'ORDERS_PAID',
		// topic: 'ORDERS_FULFILLED',
		callbackUrl: `${hostUrl}/api/purchaseWebhook`
	}
});

// console.log(JSON.stringify(orderPaidWebHook, null, 2));
