import React from 'react';
import { useRouter } from 'next/router';

import { noAuthPage } from '@/config/auth';
import { useUserAuthStore } from '@/features/UserAuth';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TWithAuthProps {
  // router: NextRouter;
}

// TODO: Implement and use `useAuth` hook

export function withAuth<P extends JSX.IntrinsicAttributes>(
  Component: React.ComponentType<P & TWithAuthProps>,
) {
  return function WithAuth(props: P) {
    const [isAuth, setAuth] = React.useState<boolean>(undefined);
    const router = useRouter();
    const userAuthStore = useUserAuthStore();
    React.useEffect(() => {
      const {
        // prettier-ignore
        // asPath,
        // route,
        isReady,
      } = router;
      if (isReady) {
        const { isLoggedIn } = userAuthStore;
        // TODO: Detect real authentification state
        /* console.log('[withAuth:WithAuth]', {
         *   isLoggedIn,
         *   userAuthStore,
         *   // asPath,
         *   // route,
         *   router,
         * });
         */
        setAuth(isLoggedIn);
        // TODO: Redirect to root page if has not authentificated
        if (!isLoggedIn) {
          router.push(noAuthPage);
        }
      }
    }, [router, userAuthStore, setAuth]);
    if (isAuth) {
      return (
        <Component
          {...props}
          // TODO: Pass other params?
          // router={router}
        />
      );
    }
  };
}
