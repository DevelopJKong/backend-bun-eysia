import { TypedRoute } from 'elysia';

export interface IParams {
  body: TypedRoute['body'];
  set: {
    headers: Record<string, string>;
    status?: number;
    redirect?: string;
  };
  store: any;
}

export type IOutput = Record<string, any>;
