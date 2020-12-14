import { send } from '../deps.js';
import { Session } from '../deps.js';

const errorMiddleware = async(context, next) => {
  try {
    await next();
  } catch (e) {
    console.log(e);
  }
}

const authMiddleware = async({request, response, session}, next) => {
  if ( !( request.url.pathname.includes('/api/') || request.url.pathname.includes('/auth/') || request.url.pathname === '/') && !(await session.get('authenticated'))) {
    response.redirect('/auth/login');
  } else {
    await next();
  }
};

const requestLoggingMiddleware = async({ request, session }, next) => {
  const date = new Date();
  await next();
  const userObj = await session.get('user');
  let user;
  if (userObj) {
    user = userObj.id;
  } else {
    user = "anonymous";
  }
  console.log(`${date.toTimeString()}: ${request.method} ${request.url.pathname} - user ${user}`);
}

const serveStaticFilesMiddleware = async(context, next) => {
  if (context.request.url.pathname.startsWith('/static')) {
    const path = context.request.url.pathname.substring(7);
  
    await send(context, path, {
      root: `${Deno.cwd()}/static`
    });
  
  } else {
    await next();
  }
}

export { errorMiddleware, requestLoggingMiddleware, serveStaticFilesMiddleware, authMiddleware };