# API7 Portal JavaScript SDK

## Install

```sh
npm install @api7/portal-sdk
# or
yarn add @api7/portal-sdk
# or
pnpm add @api7/portal-sdk
```

This package supports both ESM and CJS, and you can use it in browsers and Node.js.

## Configure

### Server-side (Node.js/Serverless/Edge-functions)

Call APIs in the backend or build a BFF.

```typescript
import { API7Portal } from '@api7/portal-sdk'

const client = new API7Portal({
  endpoint: 'https://portal.example.com',
  token: 'a7prt-...',
  getDeveloperId: async () => await getDeveloperIdFromSession(),
});
```

### Client-side (Browser)

This pattern is used to send requests to a BFF on the same origin within the browser. Authentication and Developer ID injection should occur within the BFF, so you do not need to configure authentication here.

```typescript
import { API7Portal } from '@api7/portal-sdk/browser'

// request the API exposed on current page's window.origin
const client = new API7Portal();
```

## Usage

### Access the API programmatically

```typescript
const apps = await client.apiProduct.list();
console.log(apps);
```

### Proxy requests through SDK

> [!IMPORTANT]
> This applies only to the Server-side SDK.
>
> I.e., using the SDK imported via `import { API7Portal } from '@api7/portal-sdk'`.

It is used to design and build the BFF, which enables lightweight API reverse proxies on the server to inject additional fields when forwarding requests to backend services.

```typescript
const resp = await client.proxy({
  method: clientReq.method,
  url: clientReq.url,
  headers: clientReq.headers,
  data: clientReq.body,
});
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
