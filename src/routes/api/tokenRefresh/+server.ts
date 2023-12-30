import type { RequestHandler } from '@sveltejs/kit';

import { client } from '$utils/shopify';
import { renewCustomerTokenMutation } from '$utils/queries.storefront';

const refreshAccessToken = async (
	token: string
): Promise<{ accessToken?: string; expiresAt?: string; errors?: any }> => {
	const { data, errors, extensions } = await client.request(renewCustomerTokenMutation, {
		variables: {
			customerAccessToken: token
		}
	});

	if (errors || extensions) {
		return { errors: errors };
	}

	if (!data?.customerAccessTokenCreate?.customerAccessToken) {
		const userErrors = data?.customerAccessTokenCreate?.userErrors;
		console.log(userErrors);

		return { errors: userErrors };
	}

	const { accessToken, expiresAt } = data?.customerAccessTokenCreate?.customerAccessToken;

	return { accessToken, expiresAt };
};

export const POST: RequestHandler = async ({ cookies }) => {
	let expiresAt = cookies.get('userTokenExpiration');
	let accessToken = cookies.get('userToken');

	if (!expiresAt || !accessToken) return new Response();

	let result;

	const remainingTime = Date.parse(expiresAt) - Date.now();
	if (remainingTime <= 3600000) result = await refreshAccessToken(accessToken);

	if (result && result.accessToken && result.expiresAt && !result.errors) {
		accessToken = result.accessToken;
		expiresAt = result.expiresAt;
	}

	cookies.set('userToken', accessToken, {
		path: '/',
		maxAge: 3600,
		secure: true,
		httpOnly: true,
		sameSite: 'lax'
	});

	cookies.set('userTokenExpiration', expiresAt, {
		path: '/',
		maxAge: 3600,
		secure: true,
		httpOnly: true,
		sameSite: 'lax'
	});

	return new Response();
};
