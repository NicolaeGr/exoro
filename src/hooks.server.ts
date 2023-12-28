import type { Handle } from '@sveltejs/kit';

import { getCustomerDataQuery } from '$utils/queries';
import { client } from '$utils/shopify';

export const handle: Handle = async ({ event, resolve }) => {
	const { data } = await client.request(getCustomerDataQuery, {
		variables: {
			customerAccessToken: event.cookies.get('userToken')
		}
	});

	if (data) event.locals.user = data.customer;

	return resolve(event);
};
