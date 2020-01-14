# @nativecode/rest-client

Provides an abstract REST compatible resource class using `isomorphic-fetch` to perform operations.

## Install

```sh
npm install @nativecode/rest-client
```

## Usage

```typescript
import { Resource } from '@nativecode/rest-client'

export class RestResource extends Resource {
  constructor(endpoint: URL, apikey: string, logger: Lincoln) {
    super(endpoint, logger)
    this.setHeader('x-api-key', apikey)
  }

  all(): Promise<Model[]> {
    return this.http_get('models')
  }

  byId(id: number): Promise<Model> {
    return this.http_get('models/{:id}', [
      {
        key: 'id',
        type: RestResourceParamType.RouteParameter,
        value: id,
      }
    ])
  }
}
```
