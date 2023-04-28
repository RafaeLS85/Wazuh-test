import React from "react";
import TodoList from "./todos-list";

export default function Todos({ todos }) {

    console.log( 'todos items', {todos})


  return (
    <div>
      <TodoList todo_items={todos} />
    </div>
  );
}
