import { fail, redirect } from '@sveltejs/kit';

import { getCustomerTokenMutation } from '$utils/queries';
import { client } from '$utils/shopify.js';

/** @type {import('./$types').PageServerLoad} */
export function load(event) {
	return {
		user: event.locals.user
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	login: async ({ cookies, request, url }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		if (!email) {
			return fail(400, { email, mail_missing: true });
		}
		if (!password) {
			return fail(400, { email, password_missing: true });
		}

		const {
			data: queryData,
			errors,
			extensions
		} = await client.request(getCustomerTokenMutation, {
			variables: {
				input: {
					email,
					password
				}
			}
		});

		if (errors || extensions) {
			console.log(errors, extensions);

			return { email, error: true };
		}

		if (!queryData?.customerAccessTokenCreate?.customerAccessToken) {
			const userErrors = queryData?.customerAccessTokenCreate?.customerUserErrors;
			console.log(userErrors);

			return { email, incorrect: true };
		}

		const { accessToken, expiresAt } = queryData?.customerAccessTokenCreate?.customerAccessToken;

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

		const redirectUrl = url.searchParams.get('redirectTo');
		if (redirectUrl) {
			redirect(303, redirectUrl);
		}

		redirect(303, 'dashboard');

		return { success: true };
	}
};
