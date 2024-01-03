const hostUrl = import.meta.env.VERCEL_URL;

import type { Handle } from '@sveltejs/kit';

import { getCustomerDataQuery } from '$utils/queries.storefront';
import { client, admin } from '$utils/shopify';

const getSession = async (token: string): Promise<any | null> => {
	const { data, errors, extensions } = await client.request(getCustomerDataQuery, {
		variables: {
			customerAccessToken: token
		}
	});

	if (errors || extensions) {
		console.log(errors, extensions);
		return null;
	}

	if (!data?.customer) {
		return null;
	}

	return data.customer;
};

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.getSession = () => {
		return getSession(event.cookies.get('userToken') || '');
	};

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
