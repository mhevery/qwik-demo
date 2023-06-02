/** @jsxImportSource react */

import { qwikify$ } from "@builder.io/qwik-react";

export const Display = qwikify$(({ count }: { count: number }) => {
  return <div>Count: {count}</div>;
});

export const Incrementor = qwikify$(
  ({ onIncrement }: { onIncrement: () => unknown }) => {
    return <button onClick={onIncrement}>+1</button>;
  },
  { eagerness: "hover" }
);
