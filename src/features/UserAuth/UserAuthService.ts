import { validLogins } from '@/config/auth';

import { longUuidv4 } from '@/helpers';
import { TSessionData, TCheckAuthData, TSessionId } from './types';

/** Raise an exception or return empty data if authentification failed */
const raiseExceptionIfAuthFailed = true;

function isValidLogin({ userName, userPassword }): boolean {
  for (const check of validLogins) {
    const isLoggedIn = userName === check.loginName && userPassword === check.loginPass;
    if (isLoggedIn) {
      return true;
    }
  }
  return false;
}

function demoCheckAuth(checkAuthData: TCheckAuthData): Promise<TSessionData> {
  return new Promise((resolve, reject) => {
    const {
      // prettier-ignore
      userName,
      userPassword,
      doRemember,
    } = checkAuthData;
    // Check logged status?
    const isLoggedIn = isValidLogin({ userName, userPassword }); // userName === loginName && userPassword === loginPass;
    // Construct fake session id...
    const sessionId: TSessionId = isLoggedIn ? longUuidv4() : undefined;
    /* console.log('[UserAuthService:demoCheckAuth]', {
     *   isLoggedIn,
     *   userName,
     *   userPassword,
     *   doRemember,
     * });
     */
    if (!isLoggedIn) {
      // eslint-disable-next-line no-console
      console.error('[UserAuthService:demoCheckAuth] failed', {
        isLoggedIn,
        userName,
        userPassword,
        doRemember,
        validLogins,
      });
      // eslint-disable-next-line no-debugger
      debugger;
      if (raiseExceptionIfAuthFailed) {
        // Throw error...
        const error = new Error('Invalid authorization data provided');
        reject(error);
      } else {
        // Else resolve empty data...
        resolve(undefined);
      }
    }
    // Resolve full auth data...
    const sessionData: TSessionData = {
      isLoggedIn,
      sessionId,
      userName: isLoggedIn ? userName : undefined,
      timestamp: Date.now(),
    };
    resolve(sessionData);
  });
}

export class UserAuthService {
  destroy() {
    // TODO
  }

  resetAuthSession(): Promise<void> {
    // TODO: Call server api method
    return Promise.resolve();
  }

  checkAuthSession(checkAuthData: TCheckAuthData): Promise<TSessionData> {
    return new Promise((resolve, reject) => {
      /* // TODO: DEMO: Use server api
       * const url; // TODO: Get url from config
       * axios
       *   .post<TSessionData>(url, {
       *     userName,
       *     userPassword,
       *     doRemember,
       *   })
       *   .then((result) => {
       *     const { data: sessionData } = result;
       *     console.log('[UserAuthService:checkAuthSession] Finished loaded user auth data', {
       *       sessionData,
       *       result,
       *       url,
       *       checkAuthData,
       *     });
       *     return sessionData;
       *   })
       */
      // DEMO: Use fake auth checker (temporarily)...
      demoCheckAuth(checkAuthData)
        .then((sessionData) => {
          /* console.log('[UserAuthService:checkAuthSession] Got user auth data', {
           *   sessionData,
           *   checkAuthData,
           * });
           */
          resolve(sessionData);
        })
        .catch(reject);
    });
  }
}
