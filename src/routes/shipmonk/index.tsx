import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";

export default component$(() => {
  console.log("render");
  const count = useSignal(123);
  return (
    <div>
      count: {count.value}
      <button onClick$={() => console.log("Hello")}>hello</button>
      <button
        onClick$={() => {
          console.log("AWESOME");
          if (count.value % 2 == 0) {
            const expensive = server$(() =>
              console.log("EXPENSIVE", count.value)
            );
            expensive();
          }
        }}
      >
        Awesome
      </button>
      <button onClick$={() => count.value++}>+1</button>
      {/* <div style={{ height: "100vh" }}></div> */}
      {count.value % 2 == 0 && <Clock />}
    </div>
  );
});

export const Clock = component$(() => {
  const time = useSignal("loading...");
  useVisibleTask$(() => {
    const update = () => {
      time.value = new Date().toLocaleTimeString();
    };
    update();
    const intervalId = setInterval(update, 1000);
    return () => {
      clearInterval(intervalId);
    };
  });
  console.log("render clock");
  return <div>{time.value}</div>;
});
