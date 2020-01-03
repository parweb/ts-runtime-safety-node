import { FC, useEffect, useState } from 'react';
import { getTodo, Todo } from '../todo-service';

const Todos: FC<{ id: number }> = ({ id }) => {
  // reuse typescript type <Todo>
  const [todos, setTodos] = useState<Todo>();

  useEffect(() => {
    getTodo(id).then(setTodos);
  }, []);

  return <pre>{JSON.stringify(todos, null, 2)}</pre>;
};

export default () => (
  <>
    <Todos id={1} />
  </>
);
