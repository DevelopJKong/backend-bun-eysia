import { IOutput, IParams } from '../interface/global.interface';
import { joinService, loginService } from '../service/user.service';

export const login = async ({ body, set }: IParams): Promise<IOutput> => {
  return loginService({ body, set } as IParams);
};

export const join = async ({ body, set }: IParams): Promise<IOutput> => {
  return joinService({ body, set } as IParams);
};
