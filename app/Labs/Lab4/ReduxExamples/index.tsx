"use client";
import HelloRedux from "./HelloRedux";
import CounterRedux from "./CounterRedux/index";
import AddRedux from "./AddRedux";
import TodoList from "./todos/TodoList";



export default function ReduxExamples() {
  return (
    <div id="wd-redux-examples" className="mt-3">
      <h2>Redux Examples</h2>
      <HelloRedux />
      <CounterRedux />
        <AddRedux />
        <TodoList />
      <hr />
    </div>
  );
}
