import { component$, useSignal } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";
import { Clock } from "../clock";

export default component$(() => {
  // Only executes on server. Not downloaded or executed on the client.
  console.log("Render: <Counter/>");

  const count = useSignal(123);
  return (
    <div>
      <h1>Counter</h1>
      <div>Count: {count.value}</div>
      <button onClick$={() => count.value++}>+1</button>
      <hr />
      <button onClick$={() => console.log("Hello WeAreDevelopers!")}>
        Greet
      </button>
      <p>
        Resumability NOT hydration. The counter component is never executed on
        the client. Check the console.
      </p>
    </div>
  );
});
