import type { PageServerLoad } from './$types';

import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ request, parent }) => {
	// console.log(await parent());
};
