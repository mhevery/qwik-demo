import { component$, useComputed$, useSignal } from "@builder.io/qwik";

export default component$(() => {
  const name = useSignal("");
  const lowerCase = useComputed$(() => {
    console.log("lowerCase");
    return name.value.toLowerCase();
  });
  const upperCase = useComputed$(() => {
    console.log("upperCase");
    return name.value.toUpperCase();
  });
  const joint = useComputed$(() => {
    console.log("joint");
    return lowerCase.value + upperCase.value;
  });
  return (
    <div>
      <input bind:value={name} />
      {joint.value}
    </div>
  );
});
