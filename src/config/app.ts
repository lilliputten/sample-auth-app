/** @module config.app
 *  @since 2023.10.06, 17:20
 *  @changed 2023.10.06, 17:20
 */

import { defaultMuiThemeMode, TMuiThemeMode } from '@/core/types';
import { isDev } from './build';

// UNUSED!
export const rootRoute = '/';
export const visitorRoute = '/visitor';

export const defaultLang = 'en';

export const themeMode: TMuiThemeMode = defaultMuiThemeMode;

export const defaultToastDelay = isDev ? 1500 : 1000;

// Use default language texts for absent translations instead translation identifiers.
export const translateFallbackToDefaultLanguage = true;
