# Onomad

TypeScript/JavaScript biblioteka za prikaz vremena u formatu optimizovanom za srpski jezik (npr: "pre 5 minuta"). Radi u browseru i na serveru (node.js / deno / bun).

## Čemu sve ovo?

JavaScript već ima ugrađeni Intl API za formatiranje vremena, ali rezultati nisu u potpunosti prilagođeni srpskom jeziku. Evo poređenja:

| Intl.RelativeTimeFormat | Onomad |
|-------------------------|--------|
| pre 30 sekundi | malopre |
| pre 1 minut | pre minut |
| pre 5 minuta | pre 5 minuta |
| pre 30 minuta | pre pola sata |
| pre 1 sat | pre sat vremena |
| pre 24 sata | juče |
| pre 7 dana | pre nedelju dana |
| pre 30 dana | pre mesec dana |
| pre 365 dana | pre godinu dana |

Onomad koristi prirodnije izraze koji su uobičajeni u svakodnevnom srpskom jeziku, kao što su "malopre", "juče", "pre pola sata" i "pre nedelju dana", umesto doslovnih brojčanih prikaza.

## Instalacija

```bash
npm install onomad
```

Ili sa bun-om:

```bash
bun add onomad
```

## Upotreba

```typescript
import { timeago } from 'onomad';

const date = new Date(Date.now() - 5 * 60 * 1000);
console.log(timeago(date)); // "pre 5 minuta"

const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
console.log(timeago(yesterday)); // "juče"

const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
console.log(timeago(lastWeek)); // "pre nedelju dana"
```

### Upotreba u Vue.js

Onomad dolazi sa gotovom Vue komponentom koja automatski ažurira prikaz vremena.

```vue
<script setup lang="ts">
import { TimeAgo } from 'onomad/vue';

const postDate = new Date(Date.now() - 5 * 60 * 1000);
</script>

<template>
  <div>
    <p>Objavljeno <TimeAgo :date="postDate" /></p>
  </div>
</template>
```

Komponenta automatski ažurira prikazan tekst svakih 60 sekundi. Možete prilagoditi interval ažuriranja:

```vue
<TimeAgo :date="postDate" :update-interval="5000" />
```

Za server-side rendering (SSR), komponenta će prikazati inicijalno vreme, a zatim će nastaviti sa ažuriranjem na klijentskoj strani.

## API Referenca

### `timeago(time: Date): string`

Glavna funkcija za formatiranje vremena.

- **Parametri**: 
  - `time` - Date objekat koji predstavlja vreme u prošlosti
- **Vraća**: String sa formatiranim vremenom na srpskom jeziku
- **Primeri**:
  ```typescript
  timeago(new Date(Date.now() - 30 * 1000));        // "malopre"
  timeago(new Date(Date.now() - 60 * 1000));        // "pre minut"
  timeago(new Date(Date.now() - 5 * 60 * 1000));    // "pre 5 minuta"
  timeago(new Date(Date.now() - 30 * 60 * 1000));   // "pre pola sata"
  timeago(new Date(Date.now() - 60 * 60 * 1000));   // "pre sat vremena"
  timeago(new Date(Date.now() - 3 * 3600 * 1000));  // "pre 3 sata"
  timeago(new Date(Date.now() - 24 * 3600 * 1000)); // "juče"
  timeago(new Date(Date.now() - 3 * 86400 * 1000)); // "pre 3 dana"
  timeago(new Date(Date.now() - 7 * 86400 * 1000)); // "pre nedelju dana"
  timeago(new Date(Date.now() - 60 * 86400 * 1000));// "pre 2 meseca"
  timeago(new Date(Date.now() - 365 * 86400 * 1000));// "pre godinu dana"
  ```

## Razvoj

### Preduslov

- [Bun](https://bun.sh/) - Brzi JavaScript runtime i package manager

### Instalacija

```bash
git clone git@github.com:dejan/onomad.git
cd onomad

bun install
```

### Testiranje

```bash
bun test
```

### Isprobavanje

```bash
bun repl
```

```typescript
> import { timeago } from "./src/onomad";
> timeago(new Date(Date.now() - 5 * 60 * 1000))
'pre 5 minuta'
```

### Formatiranje

```bash
bunx prettier --check "src/**/*.ts" --write
```

### Pakovanje i objava

```bash
bun run build

npm login
bun publish
```

## Licenca

MIT License

Copyright (c) 2025 Dejan Simic

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
