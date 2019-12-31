import {
  String,
  Number,
  Boolean,
  Record,
  Static,
  ValidationError,
} from 'runtypes';
import fetch from 'node-fetch';

const Plop = Record({
  userId: Number,
  id: Number,
  title: Number,
  completed: Boolean,
});

const Todo = Record({
  plop: Plop,
  userId: Number,
  id: Number,
  title: Number,
  completed: Boolean,
});

export type Todo = Static<typeof Todo> | {};

const nameofFactory = <T>() => (name: keyof T) => name;

const logValidationError = (
  type: any,
  error: ValidationError,
  name: string = 'plop',
) => {
  console.group(
    `%c ${error.message} for the field ${
      error.key
    } on ${type.toString().replace('Runtype', name)}`,
    'font-weight: normal; color: red',
  );
  console.log({name: typeof type});
  console.log(type.toString().replace('Runtype', name));
  console.trace(error);
  console.groupEnd();
};

// const nameof = <T>(name: keyof T) => name;

const checkType =(
  type: any,
  promise: Promise<typeof type>,
) => {
  return promise
    .then(type.check)
    .catch((error: ValidationError) => logValidationError(type, error));
};

export const getTodo = (id: number): Promise<Todo> =>
  checkType(
    Todo,
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((response: { json: () => void }) => response.json())
      .then((item: any) => ({ ...item, plop: item })),
  );
