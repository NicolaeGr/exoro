import type { RequestHandler, RequestEvent } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ cookies }) => {
	cookies.delete('userToken', {
		path: '/',
		secure: true,
		httpOnly: true,
		sameSite: 'lax'
	});

	cookies.delete('userTokenExpiration', {
		path: '/',
		secure: true,
		httpOnly: true,
		sameSite: 'lax'
	});

	return new Response();
};
