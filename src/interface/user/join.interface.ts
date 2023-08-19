import { RoleData } from '@prisma/client';

export interface IJoinBody {
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
