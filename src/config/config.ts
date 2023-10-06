/** @module config
 *  @description App config
 *  @since 2023.10.06, 17:20
 *  @changed 2023.10.06, 17:20
 */

import * as app from './app';
import * as build from './build';
import * as constants from './constants';
import * as site from './site';

const config = {
  app,
  build,
  caster,
  constants,
  site,
};

/* // Expose config as global variable. (Deprecated?)
 * // NOTE: Required fix in the `custom.d.ts`.
 * if (typeof global !== 'undefined') {
 *   global.config = config;
 * } else if (typeof window !== 'undefined') {
 *   window.config = config;
 * }
 */

export default config;
