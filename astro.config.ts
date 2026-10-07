/**
 * Astro configuration (scaffold plan §2; decisions 0008, 0012, 0021).
 * Static output, trailing slashes, Hindi default. No server adapter and no host-specific runtime.
 */
import { defineConfig } from 'astro/config';
import { readBuildEnv } from './src/lib/env.ts';
import { integrity } from './src/validation/integration.ts';

const env = readBuildEnv();

export default defineConfig({
  site: env.siteUrl,
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  // Bilingual routing is explicit (src/lib/routes.ts, src/pages/[lang]/, src/pages/index.astro):
  // /hi/ and /en/ prefixes, / → /hi/. Astro's i18n routing is not used, because its "manual" mode
  // requires runtime middleware and the automatic modes would generate their own redirects.
  integrations: [integrity()],
  devToolbar: { enabled: false },
});
