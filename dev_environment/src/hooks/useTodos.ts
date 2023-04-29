import { useState, useEffect } from "react";
import { TodoService } from "../services/todos";
import { INDEX_PATTERN } from "../common";
import { Todo, TodoItem } from "../public/types";

export const useTodos = (http, notifications) => {
  const { getAll, createTodo, deleteTodo, updateTodo } = TodoService({
    http,
    notifications,
  });
  const [items, setItems] = useState();

  useEffect(() => {
    getAll().then((res) => {
      setItems(res);
    });
  }, []);

  const handleSave = (title: string) => {
    createTodo(title).then(({ todo }) => {
      const { id, title, completed } = todo;
      const newItem: TodoItem = {
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

  const handleDelete = (id: string) => {
    deleteTodo(id).then(({ todoId }) => {
      const updateTodoList = items.filter((item) => item._id !== todoId);
      setItems(updateTodoList);
    });
  };

  const handleComplete = (todo: Todo) => {
    updateTodo(todo).then((res) => {
      const { id, title, completed } = res.todo;

      const updateTodoList = items.filter((item) => item._id !== id);

      const updatedItem: TodoItem = {
        _index: INDEX_PATTERN,
        _id: id,
        _score: 1,
        _source: {
          id,
          title,
          completed,
        },
      };
      setItems(() => [...updateTodoList, updatedItem]);
    });
  };

  return {
    items,
    handleSave,
    handleDelete,
    handleComplete,
  };
};
