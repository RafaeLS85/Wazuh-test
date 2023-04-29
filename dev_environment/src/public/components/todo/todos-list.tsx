import React from "react";
import { EuiIcon } from "@elastic/eui";

export default function TodoList({ todo_items, hanldeDelete, handleComplete }) {
  const css = "cursor: pointer; padding-left: 5px;";

  return (
    <div>
      <ul>
        {todo_items.map((item) => (
          <li
            key={item._id}
            className={item._source.completed ? "completed" : "todo"}
          >
            {item._source.title}

            <EuiIcon
              type="check"
              onClick={() => handleComplete(item._source)}
              color="green"
              size="l"
              aria-label="done.todo.item"
              css={css}
            />
            <EuiIcon
              type="cross"
              onClick={() => hanldeDelete(item._source.id)}
              color="red"
              size="l"
              aria-label="delete.todo.item"
              css={css}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
