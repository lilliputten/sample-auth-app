import { loginName, loginPass } from '@/config/auth';

import { longUuidv4 } from '@/helpers';
import { TSessionData, TCheckAuthData, TSessionId } from './types';

function demoCheckAuth(checkAuthData: TCheckAuthData): Promise<TSessionData> {
  return new Promise((resolve, _reject) => {
    // const resolveFalseIfFailed = true;
    const {
      // prettier-ignore
      userName,
      userPassword,
      doRemember,
    } = checkAuthData;
    // Check logged status?
    const isLoggedIn = userName === loginName && userPassword === loginPass;
    // Construct fake session id...
    const sessionId: TSessionId = isLoggedIn ? longUuidv4() : undefined;
    console.log('[UserAuthService:demoCheckAuth]', {
      isLoggedIn,
      userName,
      userPassword,
      doRemember,
      loginName,
      loginPass,
    });
    const sessionData: TSessionData = {
      isLoggedIn,
      sessionId,
      userName: isLoggedIn ? userName : undefined,
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
    const {
      // prettier-ignore
      userName,
      userPassword,
      doRemember,
    } = checkAuthData;
    console.log('[UserAuthService:checkAuthSession] Start checkin user auth data', {
      userName,
      userPassword,
      doRemember,
    });
    return new Promise((resolve, reject) => {
      /* // TODO: Use server api
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
          console.log('[UserAuthService:checkAuthSession] Got user auth data', {
            sessionData,
            checkAuthData,
          });
          debugger;
          resolve(sessionData);
        })
        .catch(reject);
    });
  }
}
