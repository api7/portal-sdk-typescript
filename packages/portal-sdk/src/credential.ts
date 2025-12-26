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

  public async create(
    applicationId: string,
    credential: CreateApplicationCredentialReq
  ): Promise<ApplicationCredential> {
    return transformResponse(
      await createDeveloperCredential({
        client: this.client,
        path: { application_id: applicationId },
        body: credential,
      })
    );
  }

  public async list(
    applicationId: string,
    query: ListDeveloperCredentialsData['query']
  ): Promise<ListDeveloperCredentialsResponses['200']> {
    return transformResponse(
      await listDeveloperCredentials({
        client: this.client,
        path: { application_id: applicationId },
        query,
      })
    );
  }

  public async get(
    applicationId: string,
    credentialId: string
  ): Promise<ApplicationCredential> {
    return transformResponse(
      await getDeveloperCredential({
        client: this.client,
        path: {
          application_id: applicationId,
          credential_id: credentialId,
        },
      })
    );
  }

  public async update(
    applicationId: string,
    credentialId: string,
    data: UpdateApplicationCredentialReq
  ): Promise<ApplicationCredential> {
    return transformResponse(
      await upsertDeveloperCredential({
        client: this.client,
        path: {
          application_id: applicationId,
          credential_id: credentialId,
        },
        body: data,
      })
    );
  }

  public async delete(
    applicationId: string,
    credentialId: string
  ): Promise<void> {
    return transformResponse(
      await deleteDeveloperCredential({
        client: this.client,
        path: {
          application_id: applicationId,
          credential_id: credentialId,
        },
      })
    );
  }

  public async regenerate(
    applicationId: string,
    credentialId: string,
    config: RegenerateApplicationCredentialReq
  ): Promise<ApplicationCredential> {
    return transformResponse(
      await regenerateDeveloperCredential({
        client: this.client,
        path: {
          application_id: applicationId,
          credential_id: credentialId,
        },
        body: config,
      })
    );
  }
}

export class CredentialAPI {
  constructor(private readonly client: Client) {}

  public async list(
    query: ListCredentialsData['query']
  ): Promise<ListCredentialsResponses['200']> {
    return transformResponse(
      await listCredentials({
        client: this.client,
        query,
      })
    );
  }
}
