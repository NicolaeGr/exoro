import { getCustomerDataQuery } from '$utils/queries';
import { client } from '$utils/shopify';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const { data, errors, extensions } = await client.request(getCustomerDataQuery, {
		variables: {
			customerAccessToken: event.cookies.get('userToken')
		}
	});

	if (data) event.locals.user = data.customer;

	return resolve(event);
}
