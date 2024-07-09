import { IOutput, IParams } from '../interface/global.interface';
import { IJoinBody } from '../interface/user/join.interface';
import { ILoginBody } from '../interface/user/login.interface';
import { joinService, loginService } from '../service/user.service';

export const login = async ({ body, set }: IParams<ILoginBody>): Promise<IOutput> => {
  return loginService({ body, set } as IParams<ILoginBody>);
};

export const join = async ({ body, set }: IParams<IJoinBody>): Promise<IOutput> => {
  return joinService({ body, set } as IParams<IJoinBody>);
};
