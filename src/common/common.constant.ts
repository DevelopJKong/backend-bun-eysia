import { log } from '../logger/winston.logger';
import chalk from 'chalk';

const HEADER = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const resultResponse = (data: unknown, statusCode: number, text: string) => {
  return {
    success: false,
    message: {
      text,
      statusCode,
    },
    data,
  };
};

export const resultError = ({ data, text, statusCode }: { data: unknown; text: string; statusCode: number }) => {
  log().error(
    `[TEXT::: "${chalk.red(text)}"] [STATUS_CODE::: "${chalk.red(statusCode)}"]  [DATA::: "${chalk.yellow(JSON.stringify(data))}"]`,
  );
  return new Response(JSON.stringify(resultResponse(data, statusCode, text)), HEADER);
};

export const resultSuccess = ({ data, text, statusCode }: { data: unknown; text: string; statusCode: number }) => {
  log().info(
    `[TEXT::: "${chalk.green(text)}"] [STATUS_CODE::: "${chalk.green(statusCode)}"]  [DATA::: "${chalk.yellow(JSON.stringify(data))}"]`,
  );
  return new Response(JSON.stringify(resultResponse(data, statusCode, text)), HEADER);
};
