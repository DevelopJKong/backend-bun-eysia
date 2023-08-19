import { InternalServerError, NotFoundError, ParseError, ValidationError } from 'elysia';

interface IError {
  code: 'UNKNOWN' | 'VALIDATION' | 'NOT_FOUND' | 'PARSE' | 'INTERNAL_SERVER_ERROR';
  error: Readonly<Error> | Readonly<ValidationError> | Readonly<NotFoundError> | Readonly<ParseError> | Readonly<InternalServerError>;
}

const resultError = ({ data, text, statusCode }: { data: any; text: string; statusCode: number }) => {
  return new Response(
    JSON.stringify({
      success: false,
      message: {
        text,
        statusCode,
      },
      data,
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};

export const globalError = ({ code, error }: IError) => {
  switch (code) {
    case 'UNKNOWN':
      return resultError({
        text: error.message,
        statusCode: 500,
        data: null,
      });
    case 'VALIDATION':
      return resultError({
        text: error.message,
        statusCode: 400,
        data: null,
      });
    case 'NOT_FOUND':
      return resultError({
        text: error.message,
        statusCode: 404,
        data: null,
      });
    case 'PARSE':
      return resultError({
        text: error.message,
        statusCode: 400,
        data: null,
      });
    case 'INTERNAL_SERVER_ERROR':
      return resultError({
        text: error.message,
        statusCode: 500,
        data: null,
      });
    default:
      return resultError({
        text: error.message,
        statusCode: 500,
        data: null,
      });
  }
};
