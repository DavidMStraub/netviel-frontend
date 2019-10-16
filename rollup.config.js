import { createDefaultConfig } from '@open-wc/building-rollup';
import replace from 'rollup-plugin-replace';

// if you need to support IE11 use "modern-and-legacy-config" instead.
// import { createCompatibilityConfig } from '@open-wc/building-rollup';
// export default createCompatibilityConfig({ input: './index.html' });

const config = createDefaultConfig({ input: './index.html' });

export default {
  ...config,
  plugins: [...config.plugins,
  replace({
    exclude: 'node_modules/**',
    ENV: 'production'
  })],
};