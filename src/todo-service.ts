import { String, Number, Boolean, Record, Static } from 'runtypes';
import fetch from 'node-fetch';

import { checkType } from './utils';

const Plop = Record({
  userId: Number,
  id: Number,
  // title wrong type Number on purpose see console
  title: Number,
  completed: Boolean,
});

const Todo = Record({
  // simulate nested type
  plop: Plop,
  userId: Number,
  id: Number,
  // title wrong type Number on purpose see console
  title: Number,
  completed: Boolean,
});

export type Todo = Static<typeof Todo>;

export const getTodo = (id: number): Promise<Todo> =>
  checkType(
    Todo,
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((response: { json: () => void }) => response.json())
      // simulate nested type
      .then((item: any) => ({ ...item, plop: item })),
  );
