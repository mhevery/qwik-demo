import { component$, useSignal } from "@builder.io/qwik";
import { Display, Incrementor } from "./inter-island-counter.react";

export default component$(() => {
  const count = useSignal(123);
  return (
    <div>
      <h1>Inter Island Counter</h1>
      <Display count={count.value} />
      <Incrementor onIncrement$={() => count.value++} />
    </div>
  );
});
