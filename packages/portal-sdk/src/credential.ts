import {
  createDeveloperCredential,
  getDeveloperCredential,
  listDeveloperCredentials,
  upsertDeveloperCredential,
  deleteDeveloperCredential,
  CreateApplicationCredentialReq,
  UpdateApplicationCredentialReq,
  RegenerateApplicationCredentialReq,
  regenerateDeveloperCredential,
  listCredentials,
  ApplicationCredential,
  ListDeveloperCredentialsResponses,
  ListDeveloperCredentialsData,
  ListCredentialsResponses,
  ListCredentialsData,
} from './generated/index.js';
import { Client } from './generated/client/types.gen.js';
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
      await createDeveloperCredential({
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
    query: ListDeveloperCredentialsData['query'],
  ): Promise<ListDeveloperCredentialsResponses['200']> {
    return transformResponse(
      await listDeveloperCredentials({
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
      await getDeveloperCredential({
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
      await upsertDeveloperCredential({
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
      await deleteDeveloperCredential({
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
      await regenerateDeveloperCredential({
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
