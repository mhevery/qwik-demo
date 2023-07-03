import { component$, useSignal, $ } from "@builder.io/qwik";
import { Clock } from "../moad/clock";
import { server$ } from "@builder.io/qwik-city";

export default component$(() => {
  console.log("render: future-frontend");
  return (
    <div>
      Hello Qwik!
      <Hello />
      <Counter />
      <Expensive />
      <div style={{ height: "100vh" }}></div>
      <Clock />
    </div>
  );
});

const Hello = component$(() => {
  console.log("render: Hello");
  return (
    <button
      onClick$={() => {
        console.log("Hello");
      }}
    >
      Hello
    </button>
  );
});

export const Counter = component$(() => {
  console.log("render: Counter");
  const count = useSignal(123);
  return (
    <div>
      Count: {count.value}
      <button
        onClick$={() => {
          count.value++;
        }}
      >
        +1
      </button>
      <button
        onClick$={async () => {
          console.log("Click");
          const expensiveFn = server$(() => {
            console.log("Expensive", count.value);
            return $(() => console.log("Response"));
          });
          if (count.value % 2 == 0) {
            const responseFn = await expensiveFn();
            await responseFn();
          }
        }}
      >
        expensive
      </button>
    </div>
  );
});

export const Expensive = component$(() => {
  return <div></div>;
});
