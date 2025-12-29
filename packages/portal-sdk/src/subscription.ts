import { Client } from './generated/client/types.gen.js';
import {
  type CreateSubscriptionReq,
  type ListSubscriptionsData,
  type ListSubscriptionsResponses,
  createSubscription,
  deleteSubscription,
  listSubscriptions,
} from './generated/index.js';
import { transformResponse } from './utils.js';

export class SubscriptionAPI {
  constructor(private readonly client: Client) {}

  /**
   * List all subscriptions.
   * @param query Optional query parameters.
   * @returns The list of subscriptions.
   * @throws {APIError} If the API request fails or network error occurs.
   */
  public async list(
    query?: ListSubscriptionsData['query'],
  ): Promise<ListSubscriptionsResponses['200']> {
    return transformResponse(
      await listSubscriptions({ client: this.client, query }),
    );
  }

  /**
   * Bulk subscribe to products
   * @param data The subscription data.
   * @returns The created subscription.
   * @throws {APIError} If the API request fails or network error occurs.
   */
  public async bulkSubscribe(data: CreateSubscriptionReq): Promise<void> {
    transformResponse(
      await createSubscription({ client: this.client, body: data }),
    );
  }

  /**
   * Unsubscribe from a subscription by ID.
   * @param id The subscription ID.
   * @returns The result of the unsubscription.
   * @throws {APIError} If the API request fails or network error occurs.
   */
  public async unsubscribe(id: string): Promise<void> {
    transformResponse(
      await deleteSubscription({
        client: this.client,
        path: { subscription_id: id },
      }),
    );
  }
}
