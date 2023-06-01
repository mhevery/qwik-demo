import { component$ } from "@builder.io/qwik";

export const Hello = component$(() => {
  console.log("Render: <Hello/>");
  return (
    <button
      onClick$={() => {
        console.log("Hello JSNation");
      }}
    >
      Hello
    </button>
  );
});

// What Code Extraction do:
// export const Hello_onClick = () => {
//   console.log("Hello JSNation");
// }
