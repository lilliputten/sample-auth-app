import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import bound from 'bind-decorator';

import { TCheckAuthData, TSessionData, TSessionId } from './types';
import { UserAuthService } from './UserAuthService';
import { derivedErrorMessage } from '@/helpers';

const hasLocalStorage = typeof localStorage !== 'undefined';

const localStorageSessionKey = 'UserAuthStore:sessionData';

export class UserAuthStore {
  @observable isLoggedIn: boolean;
  @observable sessionId: TSessionId;
  @observable userName: string;
  @observable timestamp: number;

  @observable checkAuthPromise: Promise<TSessionData | void>;
  @observable resetAuthPromise: Promise<void>;
  @observable error: Error;

  // Service...
  private userAuthService: UserAuthService;

  constructor() {
    makeObservable(this);
    this.userAuthService = new UserAuthService();
  }

  destroy() {
    this.clearData();
  }

  init() {
    this.restoreSessionFromLocalStorage();
  }

  @action.bound clearAuthData() {
    this.sessionId = undefined;
    this.isLoggedIn = false;
    this.userName = undefined;
    this.timestamp = undefined;
  }

  @action.bound clearData() {
    // TODO: To use `logout` instead `clearAuthData`?
    this.clearAuthData();
    this.checkAuthPromise = undefined;
    this.error = undefined;
  }

  // Setters...

  @action.bound setUserAuthData(sessionId: typeof UserAuthStore.prototype.sessionId) {
    this.sessionId = sessionId;
  }
  @action.bound setCheckAuthPromise(
    checkAuthPromise: typeof UserAuthStore.prototype.checkAuthPromise,
  ) {
    this.checkAuthPromise = checkAuthPromise;
  }
  @action.bound setResetAuthPromise(
    resetAuthPromise: typeof UserAuthStore.prototype.resetAuthPromise,
  ) {
    this.resetAuthPromise = resetAuthPromise;
  }
  @action.bound setError(error: typeof UserAuthStore.prototype.error = undefined) {
    this.error = error;
  }

  // Computed...

  @computed get isLoading(): boolean {
    return !!(this.checkAuthPromise || this.resetAuthPromise);
  }

  @bound logout(): Promise<void> {
    if (this.resetAuthPromise) {
      return this.resetAuthPromise;
    }
    // console.log('[UserAuthStore:logout]');
    const resetAuthPromise = this.userAuthService
      .resetAuthSession()
      .then(() => {
        // console.log('[UserAuthStore:logout:promise] success');
        this.clearAuthData();
        this.setError(undefined);
      })
      .catch((err) => {
        const errMessage = 'Logging out failed';
        // TODO: Make error with original & translated messages...
        const error = new Error(derivedErrorMessage(errMessage, err));
        // eslint-disable-next-line no-console
        console.error('[UserAuthStore:logout:promise]', errMessage, {
          error,
        });
        debugger; // eslint-disable-line no-debugger
        this.clearAuthData();
        this.setError(error);
        // Re-throw error for containing components (use extra `.catch()` to calm react)...
        throw error;
      })
      .finally(() => {
        // Clear promise...
        this.setResetAuthPromise(undefined);
      });
    this.setResetAuthPromise(resetAuthPromise);
    return resetAuthPromise;
  }

  storeSessionToLocalStorage(sessionData: TSessionData) {
    if (hasLocalStorage) {
      localStorage.setItem(localStorageSessionKey, JSON.stringify(sessionData));
    }
  }

  getSessionFromLocalStorage(): TSessionData {
    const sessionDataStr = hasLocalStorage && localStorage.getItem(localStorageSessionKey);
    return sessionDataStr ? JSON.parse(sessionDataStr) : {};
  }

  @action restoreSessionFromLocalStorage() {
    const sessionData = this.getSessionFromLocalStorage();
    const {
      // prettier-ignore
      isLoggedIn = false,
      sessionId,
      userName,
      timestamp,
    } = sessionData;
    /* console.log('[UserAuthStore:restoreSessionFromLocalStorage]', {
     *   isLoggedIn,
     *   sessionId,
     *   userName,
     *   timestamp,
     *   sessionData,
     * });
     */
    this.isLoggedIn = isLoggedIn;
    this.sessionId = sessionId;
    this.userName = userName;
    this.timestamp = timestamp;
  }

  clearSessionToLocalStorage() {
    if (hasLocalStorage) {
      localStorage.removeItem(localStorageSessionKey);
    }
  }

  @bound login(userAuthData: TCheckAuthData): Promise<TSessionData | void> {
    if (this.checkAuthPromise) {
      return this.checkAuthPromise;
    }
    const { doRemember } = userAuthData;
    /* console.log('[UserAuthStore:login]', {
     *   userAuthData,
     *   doRemember,
     * });
     */
    // Create and store service promise...
    const checkAuthPromise = this.userAuthService
      .checkAuthSession(userAuthData)
      .then((sessionData) => {
        const {
          // prettier-ignore
          isLoggedIn,
          sessionId,
          userName,
          timestamp,
        } = sessionData;
        /* console.log('[UserAuthStore:login:promise] success', {
         *   isLoggedIn,
         *   sessionId,
         *   userName,
         *   timestamp,
         *   sessionData,
         * });
         */
        if (doRemember) {
          this.storeSessionToLocalStorage(sessionData);
        } else {
          this.clearSessionToLocalStorage();
        }
        runInAction(() => {
          this.isLoggedIn = isLoggedIn;
          this.sessionId = sessionId;
          this.userName = userName;
          this.timestamp = timestamp;
          this.error = undefined;
        });
        this.setUserAuthData(sessionId);
        return sessionData;
      })
      .catch((err) => {
        const errMessage = 'Aurhorization failed';
        // TODO: Make error with original & translated messages...
        const error = new Error(derivedErrorMessage(errMessage, err));
        // eslint-disable-next-line no-console
        console.error('[UserAuthStore:login:promise]', errMessage, {
          error,
          userAuthData,
        });
        debugger; // eslint-disable-line no-debugger
        this.clearSessionToLocalStorage();
        this.clearAuthData();
        this.setError(error);
        // Re-throw error for containing components (use extra `.catch()` to calm react)...
        throw error;
      })
      .finally(() => {
        // Clear promise...
        this.setCheckAuthPromise(undefined);
      });
    this.setCheckAuthPromise(checkAuthPromise);
    return checkAuthPromise;
  }
}
