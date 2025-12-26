import {
  listDcrProviders,
  getPublicAccessSettings,
  listLabels,
  DeveloperPortalLabelResourceType,
  AllLabels,
  ListDcrProvidersData,
  ListDcrProvidersResponses,
} from './generated/index.js';
import { Client } from './generated/client/types.gen.js';
import { transformResponse } from './utils.js';

export class DCRProviderAPI {
  constructor(private readonly client: Client) {}

  /**
   * List all DCR providers.
   * @returns The list of DCR providers.
   * @throws {APIError} If the API request fails or network error occurs.
   */
  public async list(
    query?: ListDcrProvidersData['query']
  ): Promise<ListDcrProvidersResponses['200']> {
    return transformResponse(
      await listDcrProviders({ client: this.client, query })
    );
  }
}

export class SystemSettingAPI {
  constructor(private readonly client: Client) {}

  /**
   * Get public access settings.
   * @returns Whether the developer portal is publicly accessible.
   * @throws {APIError} If the API request fails or network error occurs.
   */
  public async getPublicAccess(): Promise<boolean> {
    return transformResponse(
      await getPublicAccessSettings({ client: this.client })
    ).portal_public_access as boolean;
  }
}

export class MiscellaneousAPI {
  constructor(private readonly client: Client) {}

  /**
   * Get list of labels for a given resource type.
   * @param type The resource type.
   * @returns The list of labels.
   * @throws {APIError} If the API request fails or network error occurs.
   */
  public async listLabels(
    type: DeveloperPortalLabelResourceType
  ): Promise<AllLabels> {
    return transformResponse(
      await listLabels({ client: this.client, path: { resource_type: type } })
    );
  }
}
