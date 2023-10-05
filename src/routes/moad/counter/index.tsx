import { component$, useSignal } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";
import { Clock } from "../clock";
import { css } from "~/styled-system/css";

export default component$(() => {
  // Only executes on server. Not downloaded or executed on the client.
  console.log("Render: <Counter/>");

  const count = useSignal(25);
  return (
    <div>
      <h1 class="text-3xl border-b border-b-solid border-b-2 border-sky-500 mb-5">
        Counter
      </h1>
      <button
        onClick$={() => console.log("Hello!")}
        class="btn btn-secondary m-2"
      >
        greet
      </button>
      <button onClick$={() => count.value++} class="btn btn-primary m-2">
        +1
      </button>
      <div class="radial-progress" style={{ "--value": count.value }}>
        {count.value}%
      </div>
      {/* <div class="h-screen" /> */}
      <Clock />
    </div>
  );
});
