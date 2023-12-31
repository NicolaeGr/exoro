export const createCardMetaobjectMutation = /* GraphQL */ `
	mutation createCardMetaobject(
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

export const getCustomerCardsByIdQuery = /* GraphQL */ `
	query GetCustomerMetafields($customer_id_id: ID!) {
		customer(id: $customer_id_id) {
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

export const updateCustomerCardsMutation = /* GraphQL */ `
	mutation UpdateCustomerMetafields($customer_id: ID!, $cards: String!) {
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

export const deleteCustomerCardMutation = /* GraphQL */ `
	mutation DeleteCustomerCard($card_id: ID!) {
		metafieldDelete(input: { id: $card_id }) {
			deletedId
			userErrors {
				code
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
