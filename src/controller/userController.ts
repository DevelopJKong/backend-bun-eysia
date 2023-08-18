import { TypedRoute } from 'elysia';

interface ILogin {
  body: TypedRoute['body'];
  set: {
    headers: Record<string, string>;
    status?: number;
    redirect?: string;
  };
}

export const login = ({ body, set }: ILogin) => {
  set.status = 200;
  return body;
};
