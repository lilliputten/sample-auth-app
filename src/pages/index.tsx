// import React from 'react';
import { NextPage } from 'next';

import { CommonPage } from '@/layout';

// import { addUrlPath, makeUrlFromParts, useRouterParams } from '@/helpers';
// import { visitorRoute } from '@/config/app';

const IndexPage: NextPage = () => {
  /*
   * // Make internal (via nextjs router) redirect to proper (visitor) page
   * const routerParams = useRouterParams();
   * const {
   *   routerReady,
   *   routerQueryUrl,
   *   routerBasePath,
   *   routerPath,
   *   routerRoute,
   *   routerHash,
   *   router,
   * } = routerParams;
   * React.useEffect(() => {
   *   if (routerReady) {
   *     const url = makeUrlFromParts({
   *       // basePath: routerBasePath,
   *       route: visitorRoute,
   *       query: routerQueryUrl,
   *       hash: routerHash,
   *     });
   *     const asPath = addUrlPath(url, routerBasePath);
   *     router.push(url, asPath);
   *   }
   * }, [
   *   routerBasePath,
   *   routerReady,
   *   routerPath,
   *   routerRoute,
   *   routerQueryUrl,
   *   routerHash,
   *   router,
   *   routerParams,
   * ]);
   */

  return <CommonPage />;
};

export default IndexPage;
