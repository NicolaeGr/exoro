const endpoint = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const publicKey = import.meta.env.VITE_SHOPIFY_STOREFRONT_API_TOKEN;
const privateKey = import.meta.env.VITE_SHOPIFY_ADMIN_API_TOKEN;
const API_VERSION = '2023-10';

import '@shopify/shopify-api/adapters/node';
import { createStorefrontApiClient } from '@shopify/storefront-api-client';
import { createAdminApiClient } from '@shopify/admin-api-client';

import { default as nodeFetch, type RequestInfo, type RequestInit } from 'node-fetch';

const intermediateFetch = async (url: URL | RequestInfo, init?: RequestInit): Promise<any> => {
	return nodeFetch(url, init) as any;
};

export const client = createStorefrontApiClient({
	storeDomain: endpoint,
	apiVersion: API_VERSION,
	publicAccessToken: publicKey,
	customFetchApi: intermediateFetch
});

export const admin = createAdminApiClient({
	storeDomain: endpoint,
	apiVersion: API_VERSION,
	accessToken: privateKey,
	customFetchApi: intermediateFetch
});
