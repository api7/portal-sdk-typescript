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
  token?: string;
  getDeveloperId?: () => Promise<string>;
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

  constructor(opts: Options = {}) {
    const instance = axios.create({
      baseURL: opts.endpoint,
      ...(opts.token
        ? { headers: { Authorization: `Bearer ${opts.token}` } }
        : undefined),
    });

    instance.interceptors.request.use(async (config) => {
      config.headers = config.headers ?? {};

      if (opts.getDeveloperId) {
        try {
          config.headers['X-Portal-Developer-ID'] = await opts.getDeveloperId();
        } catch (err) {
          return Promise.reject(err);
        }
      }

      return config;
    });

    const client = createClient({ axios: instance });
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
