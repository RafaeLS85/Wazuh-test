import React, { useState } from "react";
import { EuiFieldText } from "@elastic/eui";

interface Props {
  saveTodo: (title:string) => any
}

export default function CreateTodo({ saveTodo }: Props) {
  const [value, setValue] = useState("");

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" && value !== "") {
      saveTodo(value);
      setValue("");      
    }
  };

  return (
    <EuiFieldText
      placeholder="What do you want to do?"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
      aria-label="Use aria labels when no actual label is in use"
    />
  );
}
