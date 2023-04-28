import React from "react";
import TodoList from "./todos-list";

export default function Todos({ todos, deleteTodo }) {

  return (
    <div>
      <TodoList todo_items={todos} hanldeDelete={deleteTodo} />
    </div>
  );
}
