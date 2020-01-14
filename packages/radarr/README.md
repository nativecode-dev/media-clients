# `radarr`

## Install

`npm install --save @nativecode/radarr`

## Usage

```typescript
import { URL } from 'url'
import { RadarrClient } from '@nativecode/radarr'

const url = new URL('http://localhost:7878')
const radarr = new RadarrClient(url)
```
