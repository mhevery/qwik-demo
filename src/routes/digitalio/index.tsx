import { $, component$, useSignal } from "@builder.io/qwik";
import { routeLoader$, server$ } from "@builder.io/qwik-city";
import { readFile } from "fs/promises";

export const usePackage = routeLoader$(async () => {
  const data = await readFile("./package.json", "utf8");
  return data;
});

export default component$(() => {
  console.log("Render: default");
  const packageText = usePackage();

  return (
    <div>
      Hello Qwik!
      <button
        onClick$={() => {
          console.log("hello");
        }}
      >
        hello
      </button>
      <Counter />
      <pre>{packageText.value}</pre>
    </div>
  );
});

export const Counter = component$(() => {
  const count = useSignal(123);
  console.log("Render: Counter");
  return (
    <div>
      Counter: {count.value}
      <button
        onClick$={async () => {
          console.log("Click");
          count.value++;
          if (count.value % 2 !== 0) {
            const expensiveFn = server$((name: string) => {
              console.log("EXPENSIVE", name);
              return name.toUpperCase();
            });
            await expensiveFn("Rome");
          }
        }}
      >
        +1
      </button>
    </div>
  );
});
