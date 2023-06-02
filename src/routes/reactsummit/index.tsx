import { component$ } from "@builder.io/qwik";
import HelloWorld from "./hello-world";
import Counter from "./counter";
import InterIslandCounter from "./inter-island-counter";
import Slider from "./slider";
import Table from "./table";

export default component$(() => {
  return (
    <div>
      <HelloWorld />
      <hr />
      <div style={{ height: "200px" }} />
      <Counter />
      <hr />
      <div style={{ height: "200px" }} />
      <InterIslandCounter />
      <hr />
      <div style={{ height: "200px" }} />
      <Slider />
      <hr />
      <div style={{ height: "200px" }} />
      <Table />
      <div style={{ height: "500px" }} />
    </div>
  );
});
