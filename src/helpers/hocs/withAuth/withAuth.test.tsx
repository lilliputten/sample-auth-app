/* @jest-environment jsdom */

import { useRouterParams } from './withAuth';
import { render } from '@testing-library/react';

/* // Trying to mock setState...
 * import React, { Dispatch, SetStateAction, useState as useStateMock } from 'react';
 * type TSetStateAction<S> = SetStateAction<S>;
 * type TSetState<S> = Dispatch<SetStateAction<S>>;
 * type TUseStateResult<S> = [S, TSetState<S>];
 * type TUseState<S> = (initialState: S | (() => S)) => TUseStateResult<S>;
 * import * as nextRouter from 'next/router';
 * nextRouter.useRouter = jest.fn();
 * nextRouter.useRouter.mockImplementation(() => ({ route: '/' }));
 */

// Mock router...
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/edumeet',
      pathname: '/edumeet',
      query: {},
      asPath: '/edumeet?hideSelfView=true',
      basePath: '/',
    };
  },
}));

describe('useRouterParams', () => {
  it('should simply works', () => {
    function UseRouterParams() {
      const routerParams = useRouterParams();
      const { routerQuery } = routerParams;
      if (routerQuery) {
        expect(routerQuery.hideSelfView).toBe('true');
      }
      return undefined;
    }
    const node = <UseRouterParams />;
    render(node);
  });
});
