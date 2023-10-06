/** @module next-project-params
 *  @desc Create project environment params. They can be accessed as `process.env.*` in source code.
 *  @since 2023.01.26, 18:09
 *  @changed 2023.02.21, 00:38
 */

const path = require('path');

const prjPath = path.resolve(__dirname);

const packageConfig = require(path.resolve(prjPath, 'package.json'));

const { version, timetag, timestamp } = packageConfig;

const nodeEnv = process.env.NODE_ENV;
const isTest = nodeEnv === 'test';
const nextPublicDev = process.env.NEXT_PUBLIC_DEV;
const isDev = !!nextPublicDev;
const isDemo = isDev && nextPublicDev === 'DEMO';
const isDevServer = isDev && nextPublicDev === 'DEVSERVER';
const isProd = !isDev;

const buildType = isDevServer ? 'server' : 'build';
const buildMode = isProd ? 'prod' : 'dev';
const buildTag = [
  // Construct general-purpose build tag
  'v.' + version,
  timetag,
  buildType,
  buildMode,
].join('-');

const envParams = {
  version,
  timetag,
  timestamp,
  buildTag,
  buildType,
  buildMode,
  nodeEnv,
  isTest,
  isDev,
  isDevServer,
  isDemo,
  isProd,
};
// console.log('Environment parameters:', envParams);

module.exports = envParams;
