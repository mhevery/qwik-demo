import { component$ } from "@builder.io/qwik";
import Table from "./table.react";

export default component$(() => {
  return (
    <div>
      <h1>Table</h1>
      <Table client:visible />
    </div>
  );
});
