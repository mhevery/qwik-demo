import { component$, useSignal } from "@builder.io/qwik";

export default component$(() => {
  console.log("Render");
  const count = useSignal(123);
  const show = useSignal(false);
  return (
    <>
      <button onClick$={() => count.value++}>+1</button>
      <input type="checkbox" onChange$={(e, t) => (show.value = t.checked)} />
      Counter: {count.value + 1}
      <hr />
      {show.value}
      {show.value && <span>Hello</span>}
    </>
  );
});
