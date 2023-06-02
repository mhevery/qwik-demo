import { component$ } from "@builder.io/qwik";
import { HelloReact } from "./hello-world.react";

export default component$(() => {
  return (
    <div>
      <h1>Basic Render</h1>
      <HelloReact />
    </div>
  );
});
