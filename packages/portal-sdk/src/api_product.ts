import { Client } from './generated/client/types.gen.js';
import {
  getApiProduct,
  listApiProducts,
  createApiProductSubscription,
  type ListApiProductsData,
  type ListApiProductsResponses,
  ApiProduct,
} from './generated/index.js';
import { transformResponse } from './utils.js';

export class APIProductAPI {
  constructor(private readonly client: Client) {}

  /**
   * List all API products.
   * @returns The list of API products.
   * @throws {APIError} If the API request fails or network error occurs.
   */
  public async list(
    query?: ListApiProductsData['query']
  ): Promise<ListApiProductsResponses['200']> {
    return transformResponse(
      await listApiProducts({ client: this.client, query })
    );
  }

  /**
   * Get an API product by ID.
   * @param id The API product ID.
   * @returns The API product.
   * @throws {APIError} If the API request fails or network error occurs.
   */
  public async get(id: string): Promise<ApiProduct> {
    return transformResponse(
      await getApiProduct({
        client: this.client,
        path: { api_product_id: id },
      })
    );
  }

  /**
   * Subscribe to an API product by ID.
   * @param id The API product ID.
   * @throws {APIError} If the API request fails or network error occurs.
   */
  public async subscribe(id: string): Promise<void> {
    transformResponse(
      await createApiProductSubscription({
        client: this.client,
        path: { api_product_id: id },
      })
    );
  }
}
