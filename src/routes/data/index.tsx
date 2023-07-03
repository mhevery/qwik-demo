import { component$, useSignal } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

export const useData = routeLoader$(() => {
  return ["Misko", "Shai", "Yoav"];
});

export default component$(() => {
  const data = useData();
  const name = useSignal("World");
  const filter = useSignal("");
  return (
    <div>
      <img src={"//"} />
      Hello {name.value}
      <hr />
      <input type="text" bind:value={name} />
      <hr />
      <input type="text" bind:value={filter} />
      {data.value
        //.filter((name) => name.indexOf(filter.value) !== -1)
        .map((name, idx) => (
          <div key={idx}>{name}</div>
        ))}
    </div>
  );
});
