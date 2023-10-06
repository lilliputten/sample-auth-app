/** @module constants.test
 *  @since 2023.05.15, 17:38
 *  @changed 2023.05.15, 17:54
 */

import * as cssProcessRoutines from './css-process-routines';

const { createMuiColorVariants } = cssProcessRoutines;

const lightBlueColor500 = '#03a9f4';

/* // Example -- lightBlue:
 * const lightBlueSample = {
 *   50: '#e1f5fe',
 *   100: '#b3e5fc',
 *   200: '#81d4fa',
 *   300: '#4fc3f7',
 *   400: '#29b6f6',
 *   500: '#03a9f4',
 *   600: '#039be5',
 *   700: '#0288d1',
 *   800: '#0277bd',
 *   900: '#01579b',
 *   A100: '#80d8ff',
 *   A200: '#40c4ff',
 *   A400: '#00b0ff',
 *   A700: '#0091ea',
 * };
 */

describe('css-process-routines', () => {
  describe('createMuiColorVariants', () => {
    it('should return object', () => {
      const result = createMuiColorVariants(lightBlueColor500);
      const resultType = typeof result;
      expect(resultType).toBe('object');
    });
    it('should return main color at index 500', () => {
      const result = createMuiColorVariants(lightBlueColor500);
      const color500 = result['500'];
      expect(color500).toEqual(lightBlueColor500);
    });
  });
});
