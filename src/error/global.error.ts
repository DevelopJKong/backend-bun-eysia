import { InternalServerError, NotFoundError, ParseError, ValidationError } from 'elysia';

interface IError {
  code: 'UNKNOWN' | 'VALIDATION' | 'NOT_FOUND' | 'PARSE' | 'INTERNAL_SERVER_ERROR';
  error: Readonly<Error> | Readonly<ValidationError> | Readonly<NotFoundError> | Readonly<ParseError> | Readonly<InternalServerError>;
}

export const globalError = ({ code, error }: IError) => {
  switch (code) {
    case 'UNKNOWN':
      return error;
    case 'VALIDATION':
      return error;
    case 'NOT_FOUND':
      return error;
    case 'PARSE':
      return error;
    case 'INTERNAL_SERVER_ERROR':
      return error;
    default:
      return error;
  }
};
