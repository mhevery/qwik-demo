import { component$, useSignal } from "@builder.io/qwik";

export const Counter = component$(() => {
  // Only executes on server. Not downloaded or executed on the client.
  console.log("Render: <Counter/>");

  const count = useSignal(25);
  return (
    <div class="mx-auto">
      <button
        onClick$={() => count.value++}
        class="btn btn-primary m-5 text-3xl"
      >
        +
      </button>
      <div
        class="radial-progress bg-slate-700"
        style={{ "--value": count.value }}
      >
        {count.value}%
      </div>
      <button
        onClick$={() => count.value--}
        class="btn btn-primary m-5 text-3xl"
      >
        -
      </button>
    </div>
  );
});
