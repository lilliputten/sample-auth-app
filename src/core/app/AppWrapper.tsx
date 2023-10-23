import React from 'react';
// import { UserProvider } from '@auth0/nextjs-auth0/client';

import { WithToastsWrapper } from '@/ui';
import { UserAuthStoreProvider } from '@/features/UserAuth';

interface AppWrapperProps {
  children?: React.ReactNode;
}

export function AppWrapper(props: AppWrapperProps): JSX.Element {
  const { children } = props;
  return (
    <>
      <WithToastsWrapper>
        {/* <UserProvider> */}
        <UserAuthStoreProvider>
          {/* TODO: Expose root control nodes or use custom hooks? */}
          {children}
        </UserAuthStoreProvider>
        {/* </UserProvider> */}
      </WithToastsWrapper>
    </>
  );
}
