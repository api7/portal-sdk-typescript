import {
  createDeveloperApplication,
  CreateDeveloperApplicationReq,
  deleteDeveloperApplication,
  DeveloperApplication,
  getDeveloperApplication,
  listDeveloperApplications,
  ListDeveloperApplicationsData,
  ListDeveloperApplicationsResponses,
  updateDeveloperApplication,
  getApiCalls,
  GetApiCallsData,
  GetApiCallsResponses,
} from './generated/index.js';

import { ApplicationCredentialAPI } from './credential.js';
import { Client } from './generated/client/types.gen.js';
import { transformResponse } from './utils.js';

export class ApplicationAPI {
  public readonly credential: ApplicationCredentialAPI;

  constructor(private readonly client: Client) {
    this.credential = new ApplicationCredentialAPI(this.client);
  }

  /**
   * Create a new developer application.
   * @param data The application data.
   * @returns The created developer application.
   * @throws {APIError} If the API request fails or network error occurs.
   */
  public async create(
    data: CreateDeveloperApplicationReq,
  ): Promise<DeveloperApplication> {
    return transformResponse(
      await createDeveloperApplication({
        client: this.client,
        body: data,
      }),
    );
  }

  /**
   * List all applications for a developer.
   * @param query The query parameters.
   * @returns The list of developer's applications.
   * @throws {APIError} If the API request fails or network error occurs.
   */
  public async list(
    query?: ListDeveloperApplicationsData['query'],
  ): Promise<ListDeveloperApplicationsResponses['200']> {
    return transformResponse(
      await listDeveloperApplications({ client: this.client, query }),
    );
  }

  /**
   * Get a developer application by ID.
   * @param applicationId The application ID.
   * @returns The developer application.
   * @throws {APIError} If the API request fails or network error occurs.
   */
  public async get(applicationId: string): Promise<DeveloperApplication> {
    return transformResponse(
      await getDeveloperApplication({
        client: this.client,
        path: { application_id: applicationId },
      }),
    );
  }

  /**
   * Update a developer application.
   * @param applicationId The application ID.
   * @param data The application data.
   * @returns The updated developer application.
   * @throws {APIError} If the API request fails or network error occurs.
   */
  public async update(
    applicationId: string,
    data: CreateDeveloperApplicationReq,
  ): Promise<DeveloperApplication> {
    return transformResponse(
      await updateDeveloperApplication({
        client: this.client,
        path: { application_id: applicationId },
        body: data,
      }),
    );
  }

  /**
   * Delete a developer application.
   * @param applicationId The application ID.
   * @throws {APIError} If the API request fails or network error occurs.
   */
  public async delete(applicationId: string): Promise<void> {
    transformResponse(
      await deleteDeveloperApplication({
        client: this.client,
        path: { application_id: applicationId },
      }),
    );
  }

  /**
   * Get API call metrics.
   * @param query The query parameters.
   * @returns The API call metrics.
   * @throws {APIError} If the API request fails or network error occurs.
   */
  public async apiCall(
    query: GetApiCallsData['query'],
  ): Promise<GetApiCallsResponses['200']> {
    return transformResponse(
      await getApiCalls({
        client: this.client,
        query,
      }),
    );
  }
}
