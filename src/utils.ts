import { ValidationError } from 'runtypes';

export const logValidationError = (type: any, error: ValidationError) => {
  console.group(
    `%c ${error.message} for the field ${error.key} on ${type.toString()}`,
    'font-weight: normal; color: red',
  );
  console.log(type.toString());
  console.trace(error);
  console.groupEnd();
};

export const checkType = (type: any, promise: Promise<typeof type>) => {
  return promise
    .then(type.check)
    .catch((error: ValidationError) => logValidationError(type, error));
};
