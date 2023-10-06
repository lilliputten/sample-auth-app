/** @type {import('next').NextConfig} */
/** @module next.config
 *  @desc NextJS core config
 *  @since 2023.10.06, 17:16
 *  @changed 2023.10.06, 17:16
 */

const path = require('path');
const withImages = require('next-images');
const withYaml = require('next-plugin-yaml');

const prjPath = path.resolve(__dirname);

const envParams = require(path.resolve(prjPath, 'next-env-params'));
const cssParams = require(path.resolve(prjPath, 'next-css-params'));

const { getEnvVariable, truthyValue } = require('./utils/gulp-helpers');

/* // Print build info before build (prints twice: for server and for client).
 * // eslint-disable-next-line no-console
 * console.log('Build info:\n' + getBuildInfoText());
 */

const useRelativePaths = truthyValue(getEnvVariable('NEXT_USE_RELATIVE_PATHS'));

// const nextI18nextConfig = require('./next-i18next.config'); // UNUSED!

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const useLints = false;
const useMinifiedAssets = true;

const nextConfig = {
  async rewrites() {
    return [
      // @see: https://nextjs.org/docs/pages/api-reference/next-config-js/rewrites
      { source: '/visitor.html', destination: '/visitor' },
      { source: '/guide.html', destination: '/guide' },
    ];
  },
  trailingSlash: true, // Preserve page's folders (attention to relative urls!)
  compress: useMinifiedAssets,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: !useLints,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: !useLints,
  },
  // ...nextI18nextConfig, // UNUSED!
  webpack: (
    config,
    // { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack },
  ) => {
    // @see https://react-svgr.com/docs/webpack/
    // @see https://react-svgr.com/docs/next/
    /* // EXAMPLE: `@svgr/webpack` (incompatible with `withImages`)
     * config.module.rules.push({
     *   test: /\.svg$/,
     *   issuer: /\.[jt]sx?$/,
     *   use: ['@svgr/webpack'],
     * });
     */
    /* // EXAMPLE: Disable some non-browser modules if not in server mode (workaround for some node-originated dependencies)
     * if (!isServer) {
     *   config.resolve.fallback = {
     *     ...config.resolve.fallback,
     *     fs: false,
     *   };
     * }
     */
    /* // Import data from yaml modules...
     * config.module.rules.push({
     *   test: /\.ya?ml$/,
     *   type: 'json',
     *   use: 'js-yaml-loader',
     * });
     */
    // Allow to use build-time module names
    config.node = {
      ...config.node,
      __filename: true, // Pass filename for debugging purposes
    };
    config.optimization.minimize = useMinifiedAssets;
    return config;
  },
  reactStrictMode: false, // NOTE: Debug only? It causes double rendering and hooks calling.
  /* // images: Is it used?
   * images: {
   *   unoptimized: true,
   *   disableStaticImages: true,
   * },
   */
  productionBrowserSourceMaps: true,
  env: envParams,
  sassOptions: {
    includePaths: [cssParams.generatedCssParamsPath],
    prependData: [
      '@use "sass:math";',
      '@use "sass:color";',
      // Global parameters...
      '@import "' + cssParams.generatedCssParamsScssFilename + '";',
      // Global mixins...
      '@import "global-mixins.scss";',
    ].join(' '),
  },
};

// NOTE: Don't use relative path (`./`) in dev mode: it can broke webpack-hmr fast-reload.
if (useRelativePaths && isProd) {
  // Set relative urls for prod mode
  // nextConfig.basePath = './'; // Error: Specified basePath has to start with a /, found "./"
  nextConfig.assetPrefix = './';
}

module.exports = withYaml(withImages(nextConfig));
