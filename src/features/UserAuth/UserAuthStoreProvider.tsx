import React from 'react';

import { UserAuthStore } from './UserAuthStore';
import { UserAuthStoreContextProvider } from './UserAuthStoreContext';

interface TUserAuthStoreProviderProps {
  children?: React.ReactNode;
}

export function UserAuthStoreProvider(props: TUserAuthStoreProviderProps): JSX.Element {
  const { children } = props;
  const userAuthStore = React.useMemo(() => new UserAuthStore(), []);
  React.useEffect(() => {
    userAuthStore.init();
    return () => {
      userAuthStore.destroy();
    };
  }, [userAuthStore]);
  // prettier-ignore
  return (
    <UserAuthStoreContextProvider value={userAuthStore}>
      {children}
    </UserAuthStoreContextProvider>
  );
}
