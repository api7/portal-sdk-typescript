import {
  createDeveloper,
  listDevelopers,
  deleteDeveloper,
  type CreateDeveloperReq,
  type Developer,
  type ListDevelopersData,
  type ListDevelopersResponses,
} from './generated/index.js';
import { Client } from './generated/client/types.gen.js';
import { transformResponse } from './utils.js';

export class DeveloperAPI {
  constructor(private readonly client: Client) {}

  /**
   * Create a new developer.
   * @param data The developer data.
   * @returns The created developer.
   * @throws {APIError} If the API request fails or network error occurs.
   */
  public async create(data: CreateDeveloperReq): Promise<Developer> {
    return transformResponse(
      await createDeveloper({ client: this.client, body: data })
    );
  }

  /**
   * List all developers.
   * @param query Optional query parameters.
   * @returns The list of developers.
   * @throws {APIError} If the API request fails or network error occurs.
   */
  public async list(
    query?: ListDevelopersData['query']
  ): Promise<ListDevelopersResponses['200']> {
    return transformResponse(
      await listDevelopers({ client: this.client, query })
    );
  }

  /**
   * Delete a developer by ID.
   * @param id The developer ID.
   * @throws {APIError} If the API request fails or network error occurs.
   */
  public async delete(id: string): Promise<void> {
    transformResponse(
      await deleteDeveloper({ client: this.client, path: { developer_id: id } })
    );
  }
}
