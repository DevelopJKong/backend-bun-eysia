import { Elysia, t } from 'elysia';
import { appController } from './controller/app.controller';
import { join, login } from './controller/user.controller';
import { joinMiddleware, loginMiddleware } from './middleware/global.middleware';
import { swagger } from '@elysiajs/swagger';
import { globalError } from './error/global.error';
import cors from '@elysiajs/cors';

const auth = new Elysia({ prefix: '/auth' })
  .post('login', login, {
    // ...loginMiddleware,
  })
  .onError(({ code, error }) => {
    globalError({ code, error });
  });

const user = new Elysia({ prefix: '/user' })
  .post('/join', join, {
    ...joinMiddleware,
  })
  .onError(({ code, error }) => {
    globalError({ code, error });
  });

const app = new Elysia()
  .use(cors())
  .use(
    swagger({
      documentation: {
        info: {
          title: 'Elysia 프로젝트',
          version: '1.0.0',
        },
        servers: [
          {
            url: 'http://localhost:8081',
            description: '로컬 서버',
          },
        ],
      },
    }),
  )
  .get('/', appController)
  .use(user) // ! 유저관련 라우터
  .use(auth) // ! 인증관련 라우터
  .listen(8081);

console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`);
