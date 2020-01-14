# `sonarr`

## Install

`npm install --save @nativecode/sonarr`

## Usage

```typescript
import { URL } from 'url'
import { SonarrClient } from '@nativecode/sonarr'

const url = new URL('http://localhost:8989')
const sonarr = new SonarrClient(url)
```
