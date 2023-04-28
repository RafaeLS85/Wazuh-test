import React from "react";

export default function TodoList({ todo_items, hanldeDelete }) {
  return (
    <div>
      <ul>
        {todo_items.map((item) => (
          <li
            key={Math.random()}
            styles={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {item._source.title}

            <button onClick={() => hanldeDelete(item._source.id)}> X </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
