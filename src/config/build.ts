/** @module config.build
 *  @description Build management config
 *  @since 2023.10.06, 17:20
 *  @changed 2023.10.06, 17:20
 */

export const isBrowser = typeof window !== 'undefined'; // NOTE: `!!process.browser` -- tsserver 6385: `browser` is deprecated
export const isLocalhost = isBrowser && window.location.host.startsWith('localhost');

export const nodeEnv = process.env.nodeEnv;
export const isTest = !!process.env.isTest;

export const devMode = process.env.NEXT_PUBLIC_DEV;
export const demoMode = process.env.NEXT_PUBLIC_DEMO;
export const isDev = isTest || !!devMode;
export const isDemo = /* isDev || */ !!demoMode;
export const isProd = !isDev;
export const isDevServer = isDev && devMode === 'DEVSERVER';
export const isDevBrowser = isDev && isBrowser;

// To use mirage server in dev mode (see `src/mirage-server`)?
export const toUseMirageServer = false; // isDevServer && isBrowser;

export const DEBUG = isDev;

export const version = process.env.version;
export const timetag = process.env.timetag;
export const timestamp = process.env.timestamp;
export const buildTag = process.env.buildTag;

// DEBUG: Allow to join on CasterLogin and CasterPreview without any conditions.
export const allowToFakeStart = isDev;
// DEBUG: Stay on the main screen (3rd) instead going to final (4th) screen.
export const dontGoToFinishedScreen = false; // isDev;
