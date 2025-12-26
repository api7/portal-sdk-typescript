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

```typescript
import { API7Portal } from '@api7/portal-sdk'

const client = new API7Portal(
  'https://portal.example.com',
  'a7prt-...' // Your API token here
);
```

## Usage

Access API by following way:

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
