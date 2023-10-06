/** @module constants.test
 *  @since 2023.10.06, 17:20
 *  @changed 2023.10.06, 17:20
 */

import * as constants from './constants';

describe('constants', () => {
  // beforeAll(() => {})

  it('should expose object', () => {
    const type = typeof constants;
    expect(type).toBe('object');
  });

  describe('dateFormat', () => {
    it('should be a string', () => {
      const type = typeof constants.dateFormat;
      expect(type).toBe('string');
    });
  });
});
