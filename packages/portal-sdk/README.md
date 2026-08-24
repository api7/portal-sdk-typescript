# API7 Portal JavaScript SDK

## Install

```sh
npm install @api7/portal-sdk
# or
yarn add @api7/portal-sdk
# or
pnpm add @api7/portal-sdk
```

This package supports both ESM and CJS.

## Configure

### Server-side (Node.js/Serverless/Edge-functions)

Call APIs directly from your backend, e.g. within a server function.

```typescript
import { API7Portal } from '@api7/portal-sdk'

const client = new API7Portal({
  endpoint: 'https://portal.example.com',
  token: 'a7prt-...',
  getDeveloperId: async () => await getDeveloperIdFromSession(), // optional
});
```

The `getDeveloperId` is optional, you can also manually set the default request header as `HEADER_DEVELOPER_ID` on your own axios instance.

```typescript
import axios from 'axios'
import { API7Portal, HEADER_DEVELOPER_ID } from '@api7/portal-sdk'

const instance = axios.create({
  headers: { [HEADER_DEVELOPER_ID]: "YOUR_DEVELOPER_ID" },
});
const client = new API7Portal({ ..., axios: instance });
```

## Usage

### Access the API programmatically

```typescript
const apps = await client.apiProduct.list();
console.log(apps);
```

## Error Handling

When you call an API, APIError is the only type of error expected to be thrown, whether it's an error on the REST API or a network error.
You can access the request and response there, and also access the underlying AxiosError when needed.

```typescript
import { APIError } from '@api7/portal-sdk'

try {
  const apps = await client.apiProduct.list();
} catch (error) {
  if (APIError.isAPIError(error)) {
    console.error('API Error:', error.message, 'Status Code:', error.statusCode);
    console.error('Underlying Error:', error.rawError()); // Access the underlying AxiosError
  } else {
    console.error('Unexpected Error:', error);
  }
}
```
