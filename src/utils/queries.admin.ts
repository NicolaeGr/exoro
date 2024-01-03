export const createCardMetaobjectMutation = /* GraphQL */ `
	mutation CreateCardMetaobject(
		$order_id: String!
		$product_type: String!
		$product_variant: String!
	) {
		metaobjectCreate(
			metaobject: {
				type: "card"
				fields: [
					{ key: "order_id", value: $order_id }
					{ key: "type", value: $product_type }
					{ key: "variant", value: $product_variant }
				]
			}
		) {
			metaobject {
				handle
				id
				order_id: field(key: "order_id") {
					value
				}
				profile: field(key: "profile") {
					value
				}
				type: field(key: "type") {
					value
				}
				variant: field(key: "variant") {
					value
				}
			}
			userErrors {
				code
				message
				elementIndex
				elementKey
				field
			}
		}
	}
`;

export const getCustomerCardsMetafieldByIdQuery = /* GraphQL */ `
	query GetCustomerCardsMetafieldById($customer_id: ID!) {
		customer(id: $customer_id) {
			id
			firstName
			lastName
			cards: metafield(namespace: "customer", key: "cards") {
				id
				key
				value
			}
		}
	}
`;

export const updateCustomerCardsMetafieldMutation = /* GraphQL */ `
	mutation UpdateCustomerCardsMetafield($customer_id: ID!, $cards: String!) {
		metafieldsSet(
			metafields: { namespace: "customer", key: "cards", ownerId: $customer_id, value: $cards }
		) {
			metafields {
				id
				key
				value
			}
		}
	}
`;

export const deleteCardMetaobjectByCustomerIdMutation = /* GraphQL */ `
	mutation DeleteCardMetaobjectByCustomerId($card_id: ID!) {
		metaobjectDelete(id: $card_id) {
			deletedId
			userErrors {
				code
				elementIndex
				elementKey
				field
				message
			}
		}
	}
`;

export const getCardMetaobjectQuery = /* GraphQL */ `
	query GetCardMetaobject($card_id: ID!) {
		metaobject(id: $card_id) {
			id
			handle
			order_id: field(key: "order_id") {
				value
			}
			profile: field(key: "profile") {
				value
			}
			type: field(key: "type") {
				value
			}
			variant: field(key: "variant") {
				value
			}
		}
	}
`;

export const getProfilesMetafieldByCustomerIdQuery = /* GraphQL */ `
	query GetProfilesMetafieldByCustomerId($customer_id: ID!) {
		customer(id: $customer_id) {
			id
			firstName
			lastName
			profiles: metafield(namespace: "customer", key: "profiles") {
				id
				key
				value
			}
		}
	}
`;

export const getLinksMetafieldByCustomerIdQuery = /* GraphQL */ `
	query GetLinksMetafieldByCustomerId($customer_id: ID!) {
		customer(id: $customer_id) {
			id
			firstName
			lastName
			links: metafield(namespace: "customer", key: "links") {
				id
				key
				value
			}
		}
	}
`;
