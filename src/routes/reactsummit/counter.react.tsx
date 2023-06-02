/** @jsxImportSource react */

import { qwikify$ } from "@builder.io/qwik-react";
import { useState } from "react";

export default qwikify$(
  () => {
    const [count, setCount] = useState(123);
    return (
      <div>
        Count: {count}
        <button onClick={() => setCount(count + 1)}>+1</button>
      </div>
    );
  }
  // { eagerness: "click" }
);
