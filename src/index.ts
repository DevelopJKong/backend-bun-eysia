import { Elysia } from 'elysia';
import { appController } from './controller/app.controller';
import { join, login } from './controller/user.controller';
import { joinMiddleware, loginMiddleware } from './middleware/global.middleware';
import { swagger } from '@elysiajs/swagger';
import { globalError } from './error/global.error';
import cors from '@elysiajs/cors';

const user = new Elysia({ prefix: '/user' })
  .post('/login', login, {
    ...loginMiddleware,
  })
  .post('/join', join, {
    ...joinMiddleware,
  })
  .onError(globalError);

const app = new Elysia()
  .use(cors())
  .use(swagger())
  .get('/', appController)
  .use(user) // ! 유저관련 라우터
  .listen(3000);

console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`);
