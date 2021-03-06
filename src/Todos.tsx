import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import Todo from './Todo';
import { ITodo } from './types/Todo';

const Todos = () => {
  const [todos, setTodos ] = useState<ITodo[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchTodos = (): Promise<ITodo[]>  => {
    return Promise.resolve<ITodo[]>([
      { id: 1, content: 'HTML', completed: false },
      { id: 2, content: 'CSS', completed: true },
      { id: 3, content: 'Javascript', completed: false }
    ]);
  };

  useEffect(() => {
    console.log('Todos Created!');
    (async function () {
      setTodos(await fetchTodos());
    })();
  }, []);

  const generateId = () => todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;

  const addTodo = ({ keyCode, target }: KeyboardEvent<HTMLInputElement>) => {
    if (keyCode !== 13) return;
    const content = (target as HTMLInputElement).value;

    setTodos([...todos, { id: generateId(), content, completed: false }]);
    if (inputRef.current) inputRef.current.value = '';
  };

  const removeTodo = (id: number) => {
    console.log('removeTodo', id);
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodoCompleted = (id: number) => {
    console.log('toggleTodoCompleted', id);
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  return (
    <>
      <input type="text"
        placeholder="Enter todo!"
        onKeyUp={addTodo}
        ref={inputRef}
      />
      <ul>
        {todos.map(todo => {
          return (
            <Todo
              todo={todo} key={todo.id}
              remove={() => removeTodo(todo.id)}
              toggle={() => toggleTodoCompleted(todo.id)}
            />);
        })}
      </ul>
      <pre>{JSON.stringify(todos, null, 2)}</pre>
    </>
  );
};

export default Todos;
