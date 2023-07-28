import { component$, useSignal, $ } from "@builder.io/qwik";
import { server$, routeLoader$ } from "@builder.io/qwik-city";
import { Clock } from "../moad/clock";
import { readFile } from "fs/promises";

export const useData = routeLoader$(async () => {
  const pkg = String(await readFile("package.json"));
  return JSON.parse(pkg);
});

export default component$(() => {
  console.log("Render");
  const data = useData();
  const count = useSignal(123);
  return (
    <div>
      <pre>{JSON.stringify(data.value, null, 2)}</pre>
      Count: {count.value}
      <button onClick$={() => count.value++}>+1</button>
      <button
        onClick$={async () => {
          console.log("Hello");
          const fn = server$(() => {
            console.log("EXPENSIVE", count.value);
            return $(() => {
              console.log("Response", -count.value);
            });
          });

          const responseFn = await fn();
          await responseFn();
        }}
      >
        hello
      </button>
      <div style={{ height: "100vh" }} />
      <Clock />
    </div>
  );
});
