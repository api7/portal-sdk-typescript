import axios from 'axios';
import { ApplicationAPI } from './application.js';
import { CredentialAPI } from './credential.js';
import {
  DCRProviderAPI,
  MiscellaneousAPI,
  SystemSettingAPI,
} from './miscellaneous.js';
import { DeveloperAPI } from './developer.js';
import { createClient } from './generated/client/client.gen.js';
import { APIProductAPI } from './api_product.js';
import { SubscriptionAPI } from './subscription.js';

export { APIError } from './utils.js';

export class API7Portal {
  public readonly apiProduct: APIProductAPI;
  public readonly application: ApplicationAPI;
  public readonly credential: CredentialAPI;
  public readonly dcrProvider: DCRProviderAPI;
  public readonly developer: DeveloperAPI;
  public readonly misc: MiscellaneousAPI;
  public readonly subscription: SubscriptionAPI;
  public readonly systemSetting: SystemSettingAPI;

  constructor(endpoint: string, token: string) {
    const client = createClient({
      axios: axios.create({
        baseURL: endpoint,
        headers: { 'X-Portal-TOKEN': `${token}` },
      }),
    });
    this.apiProduct = new APIProductAPI(client);
    this.application = new ApplicationAPI(client);
    this.credential = new CredentialAPI(client);
    this.dcrProvider = new DCRProviderAPI(client);
    this.developer = new DeveloperAPI(client);
    this.misc = new MiscellaneousAPI(client);
    this.subscription = new SubscriptionAPI(client);
    this.systemSetting = new SystemSettingAPI(client);
  }
}
