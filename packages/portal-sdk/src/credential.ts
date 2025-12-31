import { Client } from './generated/client/types.gen.js';
import {
  type ApplicationCredential,
  type CreateApplicationCredentialReq,
  type ListCredentialsData,
  type ListCredentialsResponses,
  type ListApplicationCredentialsData,
  type ListApplicationCredentialsResponses,
  type RegenerateApplicationCredentialReq,
  type UpdateApplicationCredentialReq,
  createApplicationCredential,
  deleteApplicationCredential,
  getApplicationCredential,
  listCredentials,
  listApplicationCredentials,
  regenerateApplicationCredential,
  upsertApplicationCredential,
} from './generated/index.js';
import { transformResponse } from './utils.js';

export class ApplicationCredentialAPI {
  constructor(private readonly client: Client) {}

  /**
   * Create a new application credential.
   * @param applicationId The application ID.
   * @param data The credential data.
   * @returns The created application credential.
   * @throws {APIError} If the API request fails or network error occurs.
   */
  public async create(
    applicationId: string,
    data: CreateApplicationCredentialReq,
  ): Promise<ApplicationCredential> {
    return transformResponse(
      await createApplicationCredential({
        client: this.client,
        path: { application_id: applicationId },
        body: data,
      }),
    );
  }

  /**
   * List all application credentials for a given application.
   * @param applicationId The application ID.
   * @param query The query parameters.
   * @returns The list of application credentials.
   * @throws {APIError} If the API request fails or network error occurs.
   */
  public async list(
    applicationId: string,
    query: ListApplicationCredentialsData['query'],
  ): Promise<ListApplicationCredentialsResponses['200']> {
    return transformResponse(
      await listApplicationCredentials({
        client: this.client,
        path: { application_id: applicationId },
        query,
      }),
    );
  }

  /**
   * Get an application credential by ID.
   * @param applicationId The application ID.
   * @param credentialId The credential ID.
   * @returns The application credential.
   * @throws {APIError} If the API request fails or network error occurs.
   */
  public async get(
    applicationId: string,
    credentialId: string,
  ): Promise<ApplicationCredential> {
    return transformResponse(
      await getApplicationCredential({
        client: this.client,
        path: {
          application_id: applicationId,
          credential_id: credentialId,
        },
      }),
    );
  }

  /**
   * Update an application credential.
   * @param applicationId The application ID.
   * @param credentialId The credential ID.
   * @param data The credential data.
   * @returns The updated application credential.
   * @throws {APIError} If the API request fails or network error occurs.
   */
  public async update(
    applicationId: string,
    credentialId: string,
    data: UpdateApplicationCredentialReq,
  ): Promise<ApplicationCredential> {
    return transformResponse(
      await upsertApplicationCredential({
        client: this.client,
        path: {
          application_id: applicationId,
          credential_id: credentialId,
        },
        body: data,
      }),
    );
  }

  /**
   * Delete an application credential.
   * @param applicationId The application ID.
   * @param credentialId The credential ID.
   * @throws {APIError} If the API request fails or network error occurs.
   */
  public async delete(
    applicationId: string,
    credentialId: string,
  ): Promise<void> {
    return transformResponse(
      await deleteApplicationCredential({
        client: this.client,
        path: {
          application_id: applicationId,
          credential_id: credentialId,
        },
      }),
    );
  }

  /**
   * Regenerate an application credential.
   * @param applicationId The application ID.
   * @param credentialId The credential ID.
   * @param data The credential data.
   * @returns The regenerated application credential.
   * @throws {APIError} If the API request fails or network error occurs.
   */
  public async regenerate(
    applicationId: string,
    credentialId: string,
    data: RegenerateApplicationCredentialReq,
  ): Promise<ApplicationCredential> {
    return transformResponse(
      await regenerateApplicationCredential({
        client: this.client,
        path: {
          application_id: applicationId,
          credential_id: credentialId,
        },
        body: data,
      }),
    );
  }
}

export class CredentialAPI {
  constructor(private readonly client: Client) {}

  /**
   * List all credentials.
   * @param query The query parameters.
   * @returns The list of credentials.
   * @throws {APIError} If the API request fails or network error occurs.
   */
  public async list(
    query: ListCredentialsData['query'],
  ): Promise<ListCredentialsResponses['200']> {
    return transformResponse(
      await listCredentials({
        client: this.client,
        query,
      }),
    );
  }
}
