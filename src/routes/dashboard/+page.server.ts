import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { admin } from '$utils/shopify';
import { getCustomerCardsMetafieldByIdQuery } from '$utils/queries.admin';

export const load: PageServerLoad = ({ request, parent }) => {};
