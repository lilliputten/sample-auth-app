import { Context, createContext, Provider, useContext } from 'react';

import { UserAuthStore } from './UserAuthStore';

const UserAuthStoreContext: Context<UserAuthStore> = createContext(undefined);
export const UserAuthStoreContextProvider: Provider<UserAuthStore> = UserAuthStoreContext.Provider;

export function useUserAuthStore() {
  return useContext(UserAuthStoreContext);
}
