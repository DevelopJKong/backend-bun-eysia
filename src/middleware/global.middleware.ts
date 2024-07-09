import { t } from 'elysia';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{4,16}$/;

export const loginMiddleware = {
  body: t.Object({
    email: t.String() && t.RegExp(emailRegex),
    password: t.String() && t.RegExp(passwordRegex),
  }),
};

export const joinMiddleware = {
  body: t.Object({
    email: t.String() && t.RegExp(emailRegex),
    password: t.String() && t.RegExp(passwordRegex),
    name: t.String(),
    username: t.String(),
    phone: t.String(),
    address: t.String(),
    avatarUrl: t.String(),
    refreshToken: t.String(),
    role: t.String(),
  }),
};
