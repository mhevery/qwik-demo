import { component$ } from "@builder.io/qwik";
import { Clock } from "./clock";
import { Counter } from "./counter";
import { RPC } from "./rpc";
import { Hello } from "./hello";

export default component$(() => {
  console.log("Render: <App/>");
  return (
    <div>
      <Hello />
      <hr />
      <Counter />
      <div style={{ height: "500px" }} />
      <Clock />
      <hr />
      <RPC />
    </div>
  );
});
