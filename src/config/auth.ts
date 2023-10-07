// DEMO: Emulate simple authentification...
export interface TValidLogin {
  loginName: string;
  loginPass: string;
}
export const validLogins: TValidLogin[] = [
  { loginName: 'aaa', loginPass: 'bbb' },
  { loginName: 'xxx', loginPass: 'yyy' },
];

export const mainPage = '/';
export const noAuthPage = mainPage;
export const userInfoPage = '/user';
export const afterAuthPage = userInfoPage;
