import React, { useEffect, useState } from "react";

export default function TodoList({ todo_items }) {
  console.log("todo_items, ", todo_items);

  return (
    <ul>
      {todo_items.map((item) => (
        <li key={ Math.random()}>{item._source.title}</li>
      ))}
    </ul>
  );
}
