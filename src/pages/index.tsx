import { FC, useEffect, useState } from 'react';
import ErrorBoundary, { FallbackProps } from 'react-error-boundary';
import { getTodo, Todo } from '../index';

const Todos: FC<{ id: number }> = ({ id }) => {
  const [todos, setTodos] = useState<Todo>();

  useEffect(() => {
    getTodo(id).then(setTodos);
  }, []);

  return <pre>{JSON.stringify(todos, null, 2)}</pre>;
};

const myErrorHandler = (error: Error, componentStack: string) => {
  console.log({ error, componentStack });
};

const MyFallbackComponent: FC<FallbackProps> = ({ componentStack, error }) => (
  <div>
    <p>
      <strong>Oops! An error occured!</strong>
    </p>
    <p>Here’s what we know…</p>
    {error && (
      <p>
        <strong>Error:</strong> {error.toString()}
      </p>
    )}
    <p>
      <strong>Stacktrace:</strong> {componentStack}
    </p>
  </div>
);

export default () => <Todos id={1} />;
