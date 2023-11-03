import {
  component$,
  useStore,
  useStyles$,
  useVisibleTask$,
} from "@builder.io/qwik";
import styles from "./index.css?inline";

export default component$(() => {
  // Only executes on server. Not downloaded or executed on the client.
  console.log("Render: <Clock.default/>");
  return (
    <div>
      <p onClick$={() => console.log("test")}>
        This is an example of Lazy executing code on component when component
        becomes visible.
      </p>

      <p style={{ height: "100vh" }}>
        ⬇️ <strong>Scroll down</strong> until the clock is in view.
      </p>

      <Clock />
    </div>
  );
});

export const Clock = component$(() => {
  // Only executes on server. Not downloaded or executed on the client.
  console.log("Render: <Clock/>");
  useStyles$(styles);

  const store = useStore({
    hour: 0,
    minute: 30 * (360 / 60),
    second: 15 * (360 / 60),
  });

  useVisibleTask$(() => {
    const update = () => {
      const now = new Date();
      store.second = now.getSeconds() * (360 / 60);
      store.minute = now.getMinutes() * (360 / 60);
      store.hour = now.getHours() * (360 / 12);
    };
    update();
    const tmrId = setInterval(update, 1000);
    return () => clearInterval(tmrId);
  });

  console.log("Render Clock");
  return (
    <div class="clock" style={{ "--size": "40vh", "--border-size": "2vh" }}>
      <div class="twelve"></div>
      <div class="three"></div>
      <div class="six"></div>
      <div class="nine"></div>
      <div class="hour" style={{ transform: `rotate(${store.hour}deg)` }}></div>
      <div
        class="minute"
        style={{ transform: `rotate(${store.minute}deg)` }}
      ></div>
      <div
        class="second"
        style={{ transform: `rotate(${store.second}deg)` }}
      ></div>
    </div>
  );
});
