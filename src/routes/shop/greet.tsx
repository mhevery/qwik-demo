import { component$ } from "@builder.io/qwik";

export const Greet = component$(() => {
  return (
    <button
      onClick$={() => console.log("Hello!")}
      class="btn btn-secondary mx-auto m-5"
    >
      Hello from Qwik!
    </button>
  );
});
