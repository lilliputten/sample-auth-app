import React from 'react';
import { useRouter } from 'next/router';

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
    React.useEffect(() => {
      const {
        // prettier-ignore
        asPath,
        route,
        isReady,
      } = router;
      if (isReady) {
        // TODO: Detect real authentification state
        const isAuth = true;
        console.log('[withAuth:WithAuth]', {
          asPath,
          route,
          isAuth,
          router,
        });
        setAuth(isAuth);
        // TODO: Redirect to root page if not authentificated
        if (!isAuth) {
          router.push('/');
        }
      }
    }, [router, setAuth]);
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
