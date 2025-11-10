"use client";
import { useState } from "react";
import { FormControl } from "react-bootstrap";

export default function ObjectStateVariable() {
  const [person, setPerson] = useState({ name: "Peter", age: 24 });

  return (
    <div id="wd-object-state-variable" className="mt-3">
      <h2>Object State Variables</h2>
      <pre>{JSON.stringify(person, null, 2)}</pre>

      <FormControl
        value={person.name}
        onChange={(e) => setPerson({ ...person, name: e.target.value })}
      />

      <FormControl
        value={person.age.toString()} 
        type="number"
        onChange={(e) =>
          setPerson({
            ...person,
            age: e.target.value === "" ? 0 : parseInt(e.target.value),
          })
        }
        className="mt-2"
      />

      <hr />
    </div>
  );
}
