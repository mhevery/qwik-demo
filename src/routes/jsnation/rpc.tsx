import { component$, $ } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";

export const RPC = component$(() => {
  console.log("Render: <RPC/>");
  return (
    <button
      onClick$={async () => {
        console.log("CLICK: doWork()");
        const now = new Date();

        const doWork = server$(() => {
          console.log("EXPENSIVE WORK", now);
          return $(() => {
            console.log("Return Value:", now.toTimeString().toUpperCase());
          });
        });

        const response = await doWork();
        await response();
      }}
    >
      doSomething
    </button>
  );
});
