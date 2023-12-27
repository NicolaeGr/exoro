const publicKey = import.meta.env.VITE_SHOPIFY_STOREFRONT_API_TOKEN;

import '@shopify/shopify-api/adapters/node';
import { createStorefrontApiClient } from '@shopify/storefront-api-client';

import { default as nodeFetch, type RequestInfo, type RequestInit } from 'node-fetch';

const intermediateFetch = async (url: URL | RequestInfo, init?: RequestInit): Promise<any> => {
	return nodeFetch(url, init) as any;
};

export const client = createStorefrontApiClient({
	storeDomain: 'd8fb57.myshopify.com',
	apiVersion: '2023-10',
	publicAccessToken: publicKey,
	customFetchApi: intermediateFetch
});
