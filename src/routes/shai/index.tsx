import { component$, useSignal, useStore } from "@builder.io/qwik";

export default component$(() => {
  const loadCmp = useSignal(false);
  const count = { foo: useStore({ shai: { awesomeness: 123 } }) };
  return (
    <>
      <button onClick$={() => (loadCmp.value = true)}>load</button>
      {loadCmp.value && <div>loaded</div>}
      <button onClick$={() => count.foo.shai.awesomeness++}>+1</button>
      <WrapDisplay count={count.foo.shai.awesomeness} />
      <WrapDisplay count={123} />
    </>
  );
});

export const WrapDisplay = component$<{ count: number }>(({ count }) => {
  return <Display count={count} />;
});

export const Display = component$<{ count: number }>(({ count }) => {
  const loadCmp = useSignal(false);
  return (
    <div>
      Count: {count}
      <button onClick$={() => (loadCmp.value = true)}>load</button>
      {loadCmp.value && <div>loaded</div>}
    </div>
  );
});
