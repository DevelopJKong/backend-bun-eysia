import { PrismaClient, RoleData, User } from '@prisma/client';
import _ from 'lodash';
import bcryptjs from 'bcryptjs';
import { ILoginBody } from '../interface/user/login.interface';
import { IOutput, IParams } from '../interface/global.interface';
import { IJoinBody } from '../interface/user/join.interface';
import { log } from '../logger/winston.logger';
import chalk from 'chalk';

const prisma = new PrismaClient();

const resultError = ({ data, text, statusCode }: { data: any; text: string; statusCode: number }) => {
  log().error(
    `[TEXT::: "${chalk.red(text)}"] [STATUS_CODE::: "${chalk.red(statusCode)}"]  [DATA::: "${chalk.yellow(JSON.stringify(data))}"]`,
  );
  return new Response(
    JSON.stringify({
      success: false,
      message: {
        text,
        statusCode,
      },
      data,
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};

const resultSuccess = ({ data, text, statusCode }: { data: any; text: string; statusCode: number }) => {
  log().info(
    `[TEXT::: "${chalk.green(text)}"] [STATUS_CODE::: "${chalk.green(statusCode)}"]  [DATA::: "${chalk.yellow(JSON.stringify(data))}"]`,
  );
  return new Response(
    JSON.stringify({
      success: true,
      message: {
        text,
        statusCode,
      },
      data,
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};

export const login = async ({ body, set }: IParams): Promise<IOutput> => {
  log().info('login');
  const { email, password } = body as ILoginBody;

  log().info('findUnique 호출');
  const response = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!response) {
    set.status = 404;
    return resultError({
      text: 'User not found',
      statusCode: 404,
      data: null,
    });
  }

  log().info('비밀번호 비교');
  const user = response as User;
  const decodedPassword = await bcryptjs.compare(password, user.password);

  if (!decodedPassword) {
    set.status = 401;
    return resultError({
      text: 'Password is not correct',
      statusCode: 401,
      data: null,
    });
  }

  set.status = 200;
  return resultSuccess({
    text: 'Login success',
    statusCode: 200,
    data: _.omit(user, ['password']),
  });
};

export const join = async ({ body, set }: IParams): Promise<IOutput> => {
  log().info('join');
  const { email, password, name, username, address, avatarUrl, role } = body as IJoinBody;

  log().info('findUnique 호출');
  const response = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (response) {
    set.status = 409;
    return resultError({
      text: 'User already exists',
      statusCode: 409,
      data: null,
    });
  }

  log().info('비밀번호 암호화');
  const encryptedPassword = await bcryptjs.hash(password, 10);

  log().info('create 호출');
  await prisma.user.create({
    data: {
      email,
      password: encryptedPassword,
      name,
      username,
      address,
      avatarUrl,
      role,
      refreshToken: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  set.status = 200;
  return resultSuccess({
    text: 'Join success',
    statusCode: 200,
    data: null,
  });
};
