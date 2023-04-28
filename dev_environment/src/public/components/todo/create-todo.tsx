import React, { useState } from "react";
import { EuiFieldText } from "@elastic/eui";
import { CoreStart } from "../../../../src/core/public";
import { TodoService } from "../../../services/todos";
import { useTodos } from "../../../hooks/useTodos";

interface CustomPluginAppDeps {
  notifications: CoreStart["notifications"];
  http: CoreStart["http"];
  saveTodo: (title:string) => any
}

export default function CreateTodo({ http, notifications, saveTodo }: CustomPluginAppDeps) {
  const [value, setValue] = useState("");
  

  // const { createTodo } = TodoService({ http, notifications });

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" && value !== "") {
      saveTodo(value);
      setValue("");      
    }
  };

  return (
    <EuiFieldText
      placeholder="Placeholder text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
      aria-label="Use aria labels when no actual label is in use"
    />
  );
}
