import { PrismaClient, RoleData, User } from '@prisma/client';
import { TypedRoute } from 'elysia';
import _ from 'lodash';
import bcryptjs from 'bcryptjs';
import { ILoginBody } from '../interface/user/login.interface';
import { IOutput } from '../interface/global.interface';

const prisma = new PrismaClient();

interface IParams {
  body: TypedRoute['body'];
  set: {
    headers: Record<string, string>;
    status?: number;
    redirect?: string;
  };
  store: any;
}

interface IJoinBody {
  email: string;
  password: string;
  name: string;
  username: string;
  phone: string;
  address: string;
  avatarUrl: string;
  refreshToken: string;
  role: RoleData;
  createdAt: Date;
  updatedAt: Date;
}

export const login = async ({ body, set }: IParams): Promise<IOutput> => {
  const { email, password } = body as ILoginBody;

  const response = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!response) {
    set.status = 404;
    return new Response(
      JSON.stringify({
        success: false,
        message: {
          text: 'User not found',
          statusCode: 404,
        },
        data: null,
      }),
    );
  }

  const user = response as User;

  if (user.password !== password) {
    set.status = 401;
    return new Response(
      JSON.stringify({
        success: false,
        message: {
          text: 'Password is incorrect',
          statusCode: 401,
        },
        data: null,
      }),
    );
  }

  set.status = 200;
  return new Response(
    JSON.stringify({
      success: true,
      message: {
        text: 'Login success',
        statusCode: 200,
      },
      data: _.omit(user, ['password']),
    }),
  );
};

export const join = async ({ body, set }: IParams): Promise<IOutput> => {
  const { email, password, name, username, address, avatarUrl, role } = body as IJoinBody;

  const response = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!response) {
    set.status = 409;
    return new Response(
      JSON.stringify({
        success: false,
        message: {
          text: 'User already exists',
          statusCode: 409,
        },
        data: null,
      }),
    );
  }

  const encryptedPassword = await bcryptjs.hash(password, 10);

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
  return new Response(
    JSON.stringify({
      success: true,
      message: {
        text: 'Join success',
        statusCode: 200,
      },
      data: null,
    }),
  );
};
