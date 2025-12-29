import axios from 'axios';
import { ApplicationAPI } from './application.js';
import { CredentialAPI } from './credential.js';
import {
  DCRProviderAPI,
  MiscellaneousAPI,
  SystemSettingAPI,
} from './miscellaneous.js';
import { DeveloperAPI } from './developer.js';
import { APIProductAPI } from './api_product.js';
import { SubscriptionAPI } from './subscription.js';
import { createClient } from './generated/client/index.js';

export { APIError } from './utils.js';

export type Options = {
  endpoint?: string;
};

export class API7Portal {
  public readonly apiProduct: APIProductAPI;
  public readonly application: ApplicationAPI;
  public readonly credential: CredentialAPI;
  public readonly dcrProvider: DCRProviderAPI;
  public readonly developer: DeveloperAPI;
  public readonly misc: MiscellaneousAPI;
  public readonly subscription: SubscriptionAPI;
  public readonly systemSetting: SystemSettingAPI;

  constructor(opts?: Options) {
    const client = createClient({
      axios: axios.create({ baseURL: opts?.endpoint }),
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
