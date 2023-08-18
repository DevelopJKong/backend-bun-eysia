import { t } from 'elysia';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;

export const loginMiddleware = {
  body: t.Object({
    email: t.String() && t.RegExp(emailRegex),
    password: t.String() && t.RegExp(passwordRegex),
  }),
};
