import { component$, useSignal } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";
import { Clock } from "../clock";
import { css } from "~/styled-system/css";

export default component$(() => {
  // Only executes on server. Not downloaded or executed on the client.
  console.log("Render: <Counter/>");

  const count = useSignal(123);
  return (
    <div>
      <h1>Counter</h1>
      <div>Count: {count.value}</div>
      <button onClick$={() => count.value++} class={ButtonClass}>
        +1
      </button>
      <hr />
      <button
        onClick$={server$(() => console.log("Hello WeAreDevelopers!"))}
        class={ButtonClass}
      >
        Greet
      </button>
      <p>
        Resumability NOT hydration. The counter component is never executed on
        the client. Check the console.
      </p>
    </div>
  );
});

const ButtonClass = css({
  backgroundColor: "lightgray" /* Green */,
  border: "1px solid black",
  color: "black",
  padding: "3px 8px",
  textAlign: "center",
  textDecoration: "none",
  display: "inline-block",
  fontSize: "16px",
  borderRadius: "5px",
  margin: "2px",
});
