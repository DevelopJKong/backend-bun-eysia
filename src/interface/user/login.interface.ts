import { User } from '@prisma/client';

export interface ILoginBody {
  email: string;
  password: string;
}
