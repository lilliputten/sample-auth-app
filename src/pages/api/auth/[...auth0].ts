import { handleAuth } from "@auth0/nextjs-auth0";

console.log('[...auth0:DEBUG]', {
  AUTH0_SECRET: process.env.AUTH0_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
  AUTH0_BASE_URL: process.env.AUTH0_BASE_URL,
});

export default handleAuth();
