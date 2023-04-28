import { useState, useEffect } from "react";
import { TodoService } from "../services/todos";
import { INDEX_PATTERN } from "../common";

export const useTodos = (http, notifications) => {
  const { getAll, createTodo } = TodoService({ http, notifications });
  const [items, setItems] = useState();

  useEffect(() => {
    getAll().then((res) => {
      setItems(res);
    });
  }, []);

  const handleSave = (title: string) => {
    createTodo(title).then(({ todo }) => {
      const { id, title, completed } = todo
      const newItem = {
        _index: INDEX_PATTERN,
        _id: id,
        _score: 1,
        _source: {
          id,
          title,
          completed,
        },
      };
      setItems(() => [...items, newItem]);
    });
  };

  return {
    items,
    handleSave,
  };
};
