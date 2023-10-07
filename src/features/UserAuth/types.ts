import { UUID } from '@/core';

export type TSessionId = UUID;

export interface TCheckAuthData {
  userName: string;
  userPassword: string;
  doRemember?: boolean;
}

export interface TSessionData {
  isLoggedIn: boolean;
  sessionId: TSessionId;
  userName: string;
}
