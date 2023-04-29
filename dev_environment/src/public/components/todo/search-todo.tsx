import React, { useState } from "react";
import { EuiFieldSearch } from "@elastic/eui";

export default function SearchTodo () {
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <EuiFieldSearch
      placeholder="Search this"
      value={value}
      onChange={(e) => onChange(e)}
      aria-label="Use aria labels when no actual label is in use"
    />
  );
};
