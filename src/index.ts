import { Elysia } from 'elysia';
import { appController } from './controller/appController';
import { login } from './controller/userController';
import { loginMiddleware } from './middleware/middleware';
import { swagger } from '@elysiajs/swagger';

const user = new Elysia({ prefix: '/user' }).post('/login', login, loginMiddleware);

const app = new Elysia()
  .use(swagger())
  .get('/', appController)
  .use(user) // ! 유저관련 라우터
  .listen(3000);

console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`);
