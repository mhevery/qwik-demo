import { type Signal, component$, useSignal } from "@builder.io/qwik";

export const Counter = component$(() => {
  console.log("Render: <Counter/>");
  const count = useSignal(123);
  return (
    <>
      <DisplayWrapper count={count.value} />
      <Incrementor count={count} />
    </>
  );
});

export const DisplayWrapper = component$<{ count: number }>(({ count }) => {
  console.log("Render: <DisplayWrapper/>");
  return (
    <div>
      <Display count={count} />
    </div>
  );
});

export const Display = component$<{ count: number }>(({ count }) => {
  console.log("Render: <Display/>");
  return <h1>Count: {count}</h1>;
});

export const Incrementor = component$<{ count: Signal<number> }>(
  ({ count }) => {
    console.log("Render: <Incrementor/>");
    return <button onClick$={() => count.value++}>+1</button>;
  }
);

// What did Code Extraction do:
// export const Incrementor_onClick = () => {
//   const [count] = ...;
//   return count.value++;
// }
