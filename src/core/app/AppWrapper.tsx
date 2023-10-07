import React from 'react';

import { UserAuthStoreProvider } from '@/features/UserAuth';

interface AppWrapperProps {
  children?: React.ReactNode;
}

export function AppWrapper(props: AppWrapperProps): JSX.Element {
  const { children } = props;

  // TODO: To use composition: StoreWrapper, CoreWrapper, ThemeWrapper
  return (
    <>
      <UserAuthStoreProvider>
      {/* TODO: Expose root control nodes or use custom hooks? */}
      {children}
      </UserAuthStoreProvider>
    </>
  );
}
