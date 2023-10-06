/** @module config.css-source
 *  @description Global styles config
 *  @since 2023.01.26, 23:35
 *  @changed 2023.05.17, 22:39
 */

const cssProcessRoutines = require('./css-params-process/css-process-routines');

// Theme (TODO)...
const theme = {}; // require(process.env.THEME_FILE);

// Some reusable parameters...
const defaultFontSize = theme.defaultFontSize || 14;
const textColor = theme.textColor || '#000';

const defaultTransitionTime = 250;
const defaultAnimationTime = 500;

const primaryColor = theme.primaryColor || '#0074eb';
const secondaryColor = theme.secondaryColor || '#ffa550'; // UNUSED

const brightErrorColor = '#f00';

const errorColor = theme.errorColor || '#c33';
const dangerColor = theme.dangerColor || '#c33';
const warnColor = theme.warnColor || '#f73'; // '#f96'
const successColor = theme.successColor || '#593'; // '#ac9'
const infoColor = theme.infoColor || primaryColor; // '#07e' // '#29a' // '#9bd'

const neutralColor = '#888';

const primaryMuiColors = cssProcessRoutines.createMuiColorVariants(primaryColor);
const secondaryMuiColors = cssProcessRoutines.createMuiColorVariants(secondaryColor);
const neutralMuiColors = cssProcessRoutines.createMuiColorVariants(neutralColor);

const primaryColors = cssProcessRoutines.createColorVariants(primaryColor);
const secondaryColors = cssProcessRoutines.createColorVariants(secondaryColor);
const neutralColors = cssProcessRoutines.createColorVariants(neutralColor);

const brandColors = {
  primary: primaryColor, // '#00A878',
  primary_variant: primaryColors[800], // '#00805B',
  primary_on: primaryColors[300], // '#F8FEFC',
  secondary: secondaryColor, // '#03DAC5',
  secondary_variant: secondaryColors[800], // '#018786',
  secondary_on: secondaryColors[300], //  '#003225',
  background: '#F8FEFC',
  background_on: '#003225',
  error: errorColor, // '#B00020',
  error_variant: '#8E001A',
  error_on: '#F8FEFC',
  actionable: '#1890FF',
  warning: warnColor, // '#FAAD14',
  dark_green: '#003224',
};

// Breakpoints...
const breakpoints = {
  base: 360, // '30em',
  sm: 512,
  md: 768, // '48em',
  lg: 1024, // '64em',
  xl: 1280, // '80em',
  '2xl': 1600, // '100em',
};
const breakpointsPre = Object.entries(breakpoints).reduce((result, [id, val]) => {
  if (val > 0) {
    result[id] = val - 0.02;
  }
  return result;
}, {});
function makePx(result, [id, px]) {
  return { ...result, [id]: px + 'px' };
}
const breakpointsPx = Object.entries(breakpoints).reduce(makePx, {});
const breakpointsPrePx = Object.entries(breakpointsPre).reduce(makePx, {});

const wrapperMaxWidth = breakpoints.xl;

const defaultFont =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

const cssConfig = {
  // Common-used css variables...

  primaryColor, // Extends from themeColors
  secondaryColor,

  // Colors...

  brightErrorColor,

  // Colors for dialogs styles
  errorColor, // theme.errorColor || '#c33',
  dangerColor, // theme.dangerColor || '#c33',
  warnColor, // theme.warnColor || '#f73', // '#f96',
  successColor, // theme.successColor || '#593', // '#ac9',
  infoColor, // theme.infoColor || '#29a', // '#9bd',

  textColor,
  defaultTextColor: textColor,
  defaultLinkColor: '#003d9d', // primaryColor,

  // Neutral colors...

  neutralColor,

  bootstrapDarkColor: '#212529',

  // Color variants...

  primaryMuiColors,
  secondaryMuiColors,
  neutralMuiColors,

  primaryColors,
  secondaryColors,
  neutralColors,

  brandColors,

  // Theme colors...

  bodyBgColor: theme.bodyBgColor || '#f5f5f5',

  /* // UNUSED/TODO: Generic theming colors...
   * themeColors: {
   *   // ??? TODO: See buttons themes
   *   primary: primaryColor,
   *   secondary: secondaryColor,
   *   neutral: neutralColor,
   *   danger: dangerColor,
   *   error: errorColor,
   *   warn: warnColor,
   *   success: successColor,
   *   info: infoColor,
   *   confirm: confirmColor,
   *   select: selectColor,
   *   // red: '#c33',
   *   // orange: '#f73',
   *   // green: '#593',
   *   grassGreen: '#891',
   *   softBlue: '#05b',
   *   lightBlue: '#29a',
   *   maroon: '#800000',
   *   red: '#ff0000',
   *   purple: '#800080',
   *   fuchsia: '#ff00ff',
   *   green: '#008000',
   *   // lime: '#00ff00',
   *   olive: '#808000',
   *   // yellow: '#ffff00',
   *   navy: '#000080',
   *   blue: '#0000ff',
   *   teal: '#008080',
   *   // aqua: '#00ffff',
   *   orange: '#ffa500',
   *   blueViolet: '#8a2be2',
   *   brown: '#a52a2a',
   *   cadetBlue: '#5f9ea0',
   *   darkBlue: '#00008b',
   *   darkCyan: '#008b8b',
   *   darkGoldenRod: '#b8860b',
   *   darkOrange: '#ff8c00',
   *   darkOrchid: '#9932cc',
   *   darkRed: '#8b0000',
   *   darkSlateBlue: '#483d8b',
   *   darkSlateGray: '#2f4f4f',
   * },
   */

  // Generic theme parameters...

  themeControlsRadius: 8,

  // Caster panel controls...

  // Minimal generic caster control elements' width...
  casterPanelControlSpacing: 2,

  // Minimal generic caster control elements' width...
  casterPanelControlWidth: 90,

  // Space between groups...
  casterPanelGroupsSpacing: 16,

  // Fonts...

  titleFont: theme.titleFont || defaultFont,
  defaultFont: theme.defaultFont || defaultFont,

  defaultFontSize,
  fontSize: defaultFontSize,
  fontSizeM: defaultFontSize,
  fontSizeSm: defaultFontSize - 2,
  fontSizeXs: defaultFontSize - 4,
  fontSizeLg: defaultFontSize + 2,
  fontSizeXl: defaultFontSize + 4,
  fontSizeXxl: defaultFontSize + 8,

  titleFontSize: defaultFontSize + 8,

  defaultLineHeight: 1.3,
  defaultFontWeight: 400,
  lightFontWeight: 300,

  breakpoints,
  breakpointsPre,
  breakpointsPx,
  breakpointsPrePx,

  wrapperMaxWidth,

  // Spacings & paddings...

  innerPadding: 5,
  itemPadding: 10,
  containerPadding: 15,
  blockPadding: 20,

  // Timeouts & delays...

  transitionTime: defaultTransitionTime, // ms
  animationTime: defaultAnimationTime, // ms
  disappearTime: 1000, // ms

  // User...

  userIconSize: 36,

  // Side panels...

  sidePanelInnerPadding: 12,
  sidePanelOuterPadding: 16,

  // Tracks panel...
  tracksPanelItemPadding: 4,
};

module.exports = cssConfig;
