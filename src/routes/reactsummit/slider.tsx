import { component$, useSignal } from "@builder.io/qwik";
import Slider from "./slider.react";

export default component$(() => {
  const percent = useSignal(50);
  return (
    <div>
      <h1>Slider: {percent.value}</h1>
      <Slider
        value={percent.value}
        onChange$={(e, value) => {
          percent.value = value as number;
        }}
      />
      <input
        style={{ width: "100%" }}
        type="range"
        min="0"
        max="100"
        value={percent.value}
        onInput$={(e, target) => {
          percent.value = parseInt(target.value);
        }}
      />
    </div>
  );
});
