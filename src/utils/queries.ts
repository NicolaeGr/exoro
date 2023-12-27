export const profileListQuery = /* GraphQL */ `
	query GetUserProfiles {
		metaobjects(type: "profile", first: 25) {
			pageInfo {
				hasNextPage
				hasPreviousPage
				startCursor
			}
			nodes {
				handle
				name: field(key: "name") {
					value
				}
				surname: field(key: "surname") {
					value
				}
				description: field(key: "description") {
					value
				}
				profile_image: field(key: "profile_image") {
					value: reference {
						... on MediaImage {
							image {
								url
							}
						}
					}
				}
			}
		}
	}
`;

export const profileQuery = /* GraphQL */ `
	query GetProfieByID($profile_id: String!) {
		metaobject(handle: { handle: $profile_id, type: "profile" }) {
			id
			fields {
				key
				type
				value
			}
		}
	}
`;

export const getCustomerTokenMutation = /* GraphQL */ `
	mutation GetCustomerToken($input: CustomerAccessTokenCreateInput!) {
		customerAccessTokenCreate(input: $input) {
			customerAccessToken {
				accessToken
				expiresAt
			}
			customerUserErrors {
				code
				message
				field
			}
		}
	}
`;

export const getCustomerDataQuery = /* GraphQL */ `
	query GetUserData($customerAccessToken: String!) {
		customer(customerAccessToken: $customerAccessToken) {
			createdAt
			id
			email
			displayName
			firstName
			lastName
			profiles: metafields(identifiers: { namespace: "card", key: "profile" }) {
				reference {
					... on Metaobject {
						handle
					}
				}
			}
			orders(first: 10) {
				pageInfo {
					hasNextPage
					hasPreviousPage
					startCursor
				}
				nodes {
					id
					financialStatus
					lineItems(first: 50) {
						nodes {
							currentQuantity
							quantity
							title
							variant {
								id
								title
							}
						}
					}
				}
			}
		}
	}
`;
