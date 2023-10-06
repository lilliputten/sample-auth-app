/** @module config.css-process-routines
 *  @since 2023.01.26, 23:35
 *  @changed 2023.05.11, 15:35
 */

const tinycolor2 = require('tinycolor2');

const { pxKeys, msKeys } = require('./css-process-params');

/**
 * @param {string} id
 * @param {string|RegExp} matchKey
 * @param {boolean} [isRegExp]
 * @returns boolean
 */
function isMatching(id, matchKey, isRegExp) {
  if (isRegExp == null) {
    isRegExp = matchKey instanceof RegExp;
  }
  if (isRegExp) {
    return matchKey.test(id);
  }
  return id === matchKey;
}

function setProcessedItem(data, id, value) {
  const valType = typeof value;
  if (valType === 'number') {
    for (const matchKey of pxKeys) {
      if (isMatching(id, matchKey)) {
        const setValue = value + 'px';
        // console.log('Processed(px):', id, value, setValue);
        data[id + 'Px'] = setValue;
        break;
      }
    }
    for (const matchKey of msKeys) {
      if (isMatching(id, matchKey)) {
        const setValue = value + 'ms';
        // console.log('Processed(ms):', id, value, setValue);
        data[id + 'Ms'] = setValue;
        break;
      }
    }
  }
}

// From `src/utils/strings.ts`
function ucFirst(str) {
  str = String(str);
  return str && str.charAt(0).toUpperCase() + str.slice(1); // .toLowerCase();
}

/** Process css config object
 * @param {object} origData
 * @returns object
 */
function processCssObject(origData) {
  return Object.entries(origData).reduce((result, [id, value]) => {
    const valType = typeof value;
    result[id] = value;
    if (value != null && !Array.isArray(value)) {
      if (valType === 'object') {
        for (const itemId of Object.keys(value)) {
          const mapId = id + ucFirst(itemId);
          const mapValue = value[itemId];
          result[mapId] = mapValue;
          setProcessedItem(result, mapId, mapValue);
        }
      } else {
        setProcessedItem(result, id, value);
      }
    }
    return result;
  }, {});
}
/** Process css config object
 * @param {object} origData
 * @returns object
 */
function processCssConfigObject(origData) {
  const processed = processCssObject(origData);
  return processed;
}

function makeScssMap(mapId, data) {
  // @see https://sass-lang.com/documentation/values/maps
  const mapParts = [];
  Object.entries(data).forEach(([id, value]) => {
    const valType = typeof value;
    let quoted = value;
    if (valType != null && valType !== 'number' && valType !== 'boolean') {
      quoted = '"' + String(value).replace(/"/g, '\\"') + '"';
    }
    mapParts.push('"' + id + '": ' + quoted);
  });
  return '$' + mapId + ': ( ' + mapParts.join(', ') + ' );\n';
}
/** Make plain scss config file (with lines like `$id: value;`)
 * @param {object} cssConfig
 * @param {string} [initialString]
 * @returns string
 */
function makeScssConfig(cssConfig, initialString) {
  return Object.entries(cssConfig).reduce(
    (result, [id, value]) => {
      const valType = typeof value;
      if (value != null) {
        if (Array.isArray(value)) {
          result += value.map(makeScssConfig).join();
        } else if (valType === 'object') {
          result += makeScssMap(id, value);
        } else {
          result += '$' + id + ': ' + value + ';\n';
        }
        return result;
      }
      return result;
    },
    typeof initialString === 'string' && initialString ? initialString : '',
  );
}

/** Create color variants set from basic (500) color
 * @param {String} color
 * @return {Object} colorSet
 */
function createColorVariants(color /* : string */) {
  const colorObj = tinycolor2(color);
  const compareColor = colorObj.clone().darken(10); // Use a little darken color to search for contrast color
  const contrastText = tinycolor2.mostReadable(compareColor, ['#000', '#fff']);
  const variants = {
    50: colorObj.clone().lighten(60).toHexString(),
    100: colorObj.clone().lighten(40).toHexString(),
    200: colorObj.clone().lighten(20).toHexString(),
    300: colorObj.clone().lighten(10).toHexString(),
    400: colorObj.clone().lighten(5).toHexString(),
    500: colorObj.toHexString(),
    600: colorObj.clone().darken(5).toHexString(),
    700: colorObj.clone().darken(10).toHexString(),
    800: colorObj.clone().darken(20).toHexString(),
    900: colorObj.clone().darken(30).toHexString(),
    950: colorObj.clone().darken(50).toHexString(),
    contrastText: contrastText.toHexString(),
  };
  return variants; /*  as TColorSet */
}

/** Create color variants set from basic (500) color
 * @param {String} color
 * @return {Object} colorSet
 */
function createMuiColorVariants(color) {
  /* // palette example:
   * primary: Object
   *     main: #1976d2
   *     light: #42a5f5
   *     dark: #1565c0
   *     contrastText: #fff
   * secondary: Object
   *     main: #9c27b0
   *     light: #ba68c8
   *     dark: #7b1fa2
   *     contrastText: #fff
   */
  const colorObj = tinycolor2(color);
  const compareColor = colorObj.darken(10); // Use a little darken color to search for contrast color
  const contrastText = tinycolor2.mostReadable(compareColor, ['#000', '#fff']);
  const variants = {
    light: colorObj.clone().lighten(20).toHexString(),
    main: colorObj.toHexString(),
    dark: colorObj.clone().darken(20).toHexString(),
    contrastText: contrastText.toHexString(),
  };
  return variants; /*  as TColorSet */
}

module.exports = {
  processCssConfigObject,
  makeScssConfig,
  createColorVariants,
  createMuiColorVariants,
};
