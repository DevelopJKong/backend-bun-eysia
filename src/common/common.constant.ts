import { log } from '../logger/winston.logger';
import chalk from 'chalk';

type TResultResponse = {
  message: {
    text: string;
    statusCode: number;
  };
  data: unknown;
};

type TSet = {
  headers: Record<string, string>;
  status?: number;
  redirect?: string;
};

const HEADER = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const resultResponse = ({ message, data }: TResultResponse, set: TSet) => {
  set.status = message.statusCode;
  return {
    success: message.statusCode === 200 ? true : false,
    message,
    data,
  };
};

export const resultError = ({ data, text, statusCode, set }: { data: unknown; text: string; statusCode: number; set: TSet }) => {
  log().error(
    `[TEXT::: "${chalk.red(text)}"] [STATUS_CODE::: "${chalk.red(statusCode)}"]  [DATA::: "${chalk.yellow(JSON.stringify(data))}"]`,
  );
  return new Response(JSON.stringify(resultResponse({ message: { text, statusCode }, data }, set)), HEADER);
};

export const resultSuccess = ({ data, text, statusCode, set }: { data: unknown; text: string; statusCode: number; set: TSet }) => {
  log().info(
    `[TEXT::: "${chalk.green(text)}"] [STATUS_CODE::: "${chalk.green(statusCode)}"]  [DATA::: "${chalk.yellow(JSON.stringify(data))}"]`,
  );
  return new Response(JSON.stringify(resultResponse({ message: { text, statusCode }, data }, set)), HEADER);
};
