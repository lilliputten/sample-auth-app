import { defaultMuiThemeMode, TMuiThemeMode } from '@/core/types';
import { isDev } from './build';

export const rootRoute = '/';
export const visitorRoute = '/visitor';

export const defaultLang = 'en';

export const themeMode: TMuiThemeMode = defaultMuiThemeMode;

export const defaultToastDelay = isDev ? 1500 : 1000;

// Use default language texts for absent translations instead translation identifiers.
export const translateFallbackToDefaultLanguage = true;
