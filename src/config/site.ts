/** @module config.site
 *  @since 2023.10.06, 17:20
 *  @changed 2023.10.06, 17:20
 */
import { defaultLang } from './app';

export const htmlLang = defaultLang;
export const titleDelim = ' — ';
export const siteUrl = 'https://sample-auth-app.lilliputten.ru/';
export const title = 'Sample auth app';
export const descr = title; // TODO
export const keywords = ['sample', 'auth', 'app'];

/* // TODO: Some params for real (public) project
 * export const faviconUrl = '/static/favicon.ico';
 * export const faviconPngUrl = '/static/favicon-120x120.png';
 * export const faviconSvgUrl = '/static/favicon.svg';
 * export const opImageUrl = '/static/logo-256.png';
 * export const opImageWidth = 256;
 * export const opImageHeight = 256;
 */

export const notFoundTitle = 'Page not found';

// NOTE: Include extrnal font cdn link in `src/pages/_document.tsx` or import
// installed font in `src/core/global/global-includes.ts`. Remain empty value
// to omit urls.
// export const fontUrl =
//   'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap';
export const fontUrl = undefined;
