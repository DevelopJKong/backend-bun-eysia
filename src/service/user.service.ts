//
import { IOutput, IParams } from '../interface/global.interface';
import { ILoginBody } from '../interface/user/login.interface';
import { log } from '../logger/winston.logger';
import omit from 'lodash/omit';
import bcryptjs from 'bcryptjs';
import { IJoinBody } from '../interface/user/join.interface';
import { resultError, resultSuccess } from '../common/common.constant';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export const loginService = async ({ body, set }: IParams<ILoginBody>): Promise<IOutput> => {
  log().info('login');
  const { email, password } = body;

  console.log(email, password);

  log().info('findUnique 호출');
  const response = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!response) {
    return resultError({
      text: 'User not found',
      statusCode: 404,
      data: null,
      set,
    });
  }

  log().info('비밀번호 비교');
  const user = response as User;
  const decodedPassword = await bcryptjs.compare(password, user.password);

  if (!decodedPassword) {
    return resultError({
      text: 'Password is not correct',
      statusCode: 401,
      data: null,
      set,
    });
  }

  return resultSuccess({
    text: 'Login success',
    statusCode: 200,
    data: omit(user, ['password']),
    set,
  });
};

export const joinService = async ({ body, set }: IParams<IJoinBody>): Promise<IOutput> => {
  log().info('join');
  const { email, password, name, username, address, avatarUrl, role } = body;

  log().info('findUnique 호출');
  const response = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (response) {
    return resultError({
      text: 'User already exists',
      statusCode: 409,
      data: null,
      set,
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

  return resultSuccess({
    text: 'Join success',
    statusCode: 200,
    data: null,
    set,
  });
};
