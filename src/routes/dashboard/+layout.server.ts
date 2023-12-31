import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const user = await locals.getSession();

	if (!user) redirect(302, '/login');

	return { user: user };
};
