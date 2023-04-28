import { useState, useEffect } from "react";
import { TodoService } from "../services/todos";

export const useTodos = (http, notifications) => {
  const { getAll } = TodoService({ http, notifications });
  const [items, setItems] = useState();

  useEffect(() => {
    getAll().then((res) => {
      setItems(res);
    });
  }, []);

  return {
    items,
  };
};
