export interface IParams<T> {
  body: T;
  set: {
    headers: Record<string, string>;
    status?: number;
    redirect?: string;
  };
  store: any;
}

export type IOutput = Record<string, any>;
