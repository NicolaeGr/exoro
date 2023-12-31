import type { PageServerLoad, Actions } from './$types';

import { fail, redirect } from '@sveltejs/kit';

import { getCustomerTokenMutation } from '$utils/queries.storefront';
import { client } from '$utils/shopify.js';

export const load: PageServerLoad = async ({ locals }) => {
	const user = await locals.getSession();

	if (user) redirect(302, '/dashboard');
};

export const actions: Actions = {
	login: async ({ cookies, request, url }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		if (!email) {
			return fail(400, { email, mail_missing: true });
		}
		if (!password) {
			return fail(400, { email, password_missing: true });
		}

		const { data, errors, extensions } = await client.request(getCustomerTokenMutation, {
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

		if (!data?.customerAccessTokenCreate?.customerAccessToken) {
			const userErrors = data?.customerAccessTokenCreate?.customerUserErrors;
			console.log(userErrors);

			return { email, incorrect: true };
		}

		const { accessToken, expiresAt } = data?.customerAccessTokenCreate?.customerAccessToken;

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

		redirect(303, '/dashboard');

		return { success: true };
	}
};
