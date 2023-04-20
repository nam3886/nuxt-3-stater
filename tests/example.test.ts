import { fileURLToPath } from 'node:url';

import { $fetch, isDev, setup } from '@nuxt/test-utils-edge';
import { describe, expect, it } from 'vitest';

describe('example', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('..', import.meta.url)),
    server: true,
  });

  it('Renders Nuxt 3 Awesome Starter', async () => {
    expect(await $fetch('/')).toMatch('Nuxt 3 Awesome Starter');
  });

  if (isDev()) {
    it('[dev] ensure vite client script is added', async () => {
      expect(await $fetch('/')).toMatch('/_nuxt/@vite/client"');
    });
  }
});
