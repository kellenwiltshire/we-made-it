const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken =
	process.env.NEXT_PUBLIC_SHOPIFY_STORE_FRONT_ACCESS_TOKEN;

async function callShopify(query) {
	const fetchUrl = `https://${domain}/api/2021-07/graphql.json`;

	const fetchOptions = {
		endpoint: fetchUrl,
		method: 'POST',
		headers: {
			'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ query }),
	};

	try {
		const data = await fetch(fetchUrl, fetchOptions).then((response) =>
			response.json(),
		);
		return data;
	} catch (error) {
		console.log(error);
		throw new Error('Could not fetch products!', error);
	}
}

async function recursiveCatalog(cursor = '', initialRequest = true) {
	let data;

	if (cursor !== '') {
		const query = `{
      products(after: "${cursor}", first: 250) {
        edges {
          cursor
          node {
            id
            title
            description
            handle
            images(first: 250) {
              edges {
                node {
                  id
                  originalSrc
                  height
                  width
                  altText
                }
              }
            }
            variants(first: 250) {
              edges {
                node {
                  id
                  title
                  price
                }
              }
            }
            vendor
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }`;

		const response = await callShopify(query);
		data = response.data.products.edges ? response.data.products.edges : [];

		if (response.data.products.pageInfo.hasNextPage) {
			const num = response.data.products.edges.length;
			const cursor = response.data.products.edges[num - 1].cursor;
			console.log('Cursor: ', cursor);

			return data.concat(await recursiveCatalog(cursor));
		} else {
			return data;
		}
	} else {
		const query = `{
      products(first: 250) {
        edges {
          cursor
          node {
            id
            title
            description
            handle
            images(first: 250) {
              edges {
                node {
                  id
                  originalSrc
                  height
                  width
                  altText
                }
              }
            }
            variants(first: 250) {
              edges {
                node {
                  id
                  title
                  price
                }
              }
            }
            vendor
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }`;

		const response = await callShopify(query);
		data = response.data.products.edges ? response.data.products.edges : [];

		if (response.data.products.pageInfo.hasNextPage) {
			const num = response.data.products.edges.length;
			const cursor = response.data.products.edges[num - 1].cursor;
			console.log('Cursor: ', cursor);

			return data.concat(await recursiveCatalog(cursor));
		} else {
			return data;
		}
	}
}

export async function getAllProducts() {
	const response = await recursiveCatalog();

	let filteredItems = [];
	if (response.length > 0) {
		for (let i = 0; i < response.length; i++) {
			if (response[i].node.images.edges[0]) {
				filteredItems.push(response[i]);
			}
		}
	}

	return filteredItems;
}

export async function getProductSlugs() {
	const query = `{
      
        products(sortKey: TITLE, first: 250) {
          edges {
            node {
              handle              
            }
          }
        }
      
    }`;
	const response = await callShopify(query);

	const slugs = response.data.products.edges
		? response.data.products.edges
		: [];

	return slugs;
}

export async function getProduct(handle) {
	const query = `{
      productByHandle(handle: "${handle}") {
        id
        title
        handle
        description
        images(first: 250) {
          edges {
            node {
              id
              originalSrc
              height
              width     
              altText             
            }
          }
        }
        variants(first: 250) {
          edges {
            node {
              id
              title
              price
              quantityAvailable                
            }
          }
        }
        vendor
      }
    }`;
	const response = await callShopify(query);

	const product = response.data.productByHandle
		? response.data.productByHandle
		: [];

	return product;
}

export async function searchVendors(param) {
	const query = `{
    products(query: "${param}", first: 250) {
      edges {
        cursor
        node {
          id
          title
          description
          handle
          images(first: 250) {
            edges {
              node {
                id
                originalSrc
                height
                width
                altText
              }
            }
          }
          variants(first: 250) {
            edges {
              node {
                id
                title
                price
              }
            }
          }
          vendor
        }
      }
    }
  }`;

	const response = await callShopify(query);
	console.log(response);

	const product = response.data.products.edges
		? response.data.products.edges
		: [];

	let filteredItems = [];
	if (product.length > 0) {
		for (let i = 0; i < product.length; i++) {
			if (product[i].node.images.edges[0]) {
				filteredItems.push(product[i]);
			}
		}
	}
	return filteredItems;
}

export async function createCheckout(id, quantity) {
	const query = `mutation 
      {
        checkoutCreate(input: {
          lineItems: [{ variantId: "${id}", quantity: ${quantity} }]
        }) {
          checkout {
             id
             webUrl
             lineItems(first: 250) {
               edges {
                 node {
                   id
                   title
                   quantity
                 }
               }
             }
          }
        }
      }      
    `;
	const response = await callShopify(query);

	const checkout = response.data.checkoutCreate.checkout
		? response.data.checkoutCreate.checkout
		: [];

	return checkout;
}

export async function updateCheckout(id, lineItems) {
	const formattedLineItems = lineItems.map((item) => {
		return `{
      variantId: "${item.variantId}",
      quantity:${item.quantity}
    }`;
	});

	const query = `mutation 
      {
        checkoutLineItemsReplace(lineItems: [${formattedLineItems}], checkoutId: "${id}") {
          checkout {
             id
             webUrl
             lineItems(first: 250) {
               edges {
                 node {
                   id
                   title
                   quantity
                 }
               }
             }
          }
        }
      }      
    `;
	const response = await callShopify(query);

	const checkout = response.data.checkoutLineItemsReplace.checkout
		? response.data.checkoutLineItemsReplace.checkout
		: [];

	return checkout;
}
