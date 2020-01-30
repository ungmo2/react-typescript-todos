import React from 'react';
import { ITodo } from './types/Todo';

type Props = {
  todo: ITodo,
  remove: (event: React.MouseEvent<HTMLButtonElement>) => void,
  toggle: (event: React.ChangeEvent<HTMLInputElement>) => void
};

const Todo = ({ todo, remove, toggle }: Props) => {

  return (
    <>
      <li id={todo.id + ''}>
        <input type="checkbox" onChange={toggle} checked={todo.completed }/>
        <span style={todo.completed ? { textDecoration: 'line-through' } : {} }>{todo.content}</span>
        <button onClick={remove}>X</button>
      </li>
    </>
  );
};

export default Todo;
