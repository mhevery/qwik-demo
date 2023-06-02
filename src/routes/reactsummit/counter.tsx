import { component$ } from "@builder.io/qwik";
import Counter from "./counter.react";

export default component$(() => {
  return (
    <div>
      <h1>Counter</h1>
      <Counter />
    </div>
  );
});
