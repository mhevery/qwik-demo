import { component$ } from "@builder.io/qwik";
import BuilderImg from "../../../../public/builder.png?jsx";

export default component$(() => {
  return (
    <div>
      <h1>Image</h1>
      {/* <img src={"/builder.png"} /> */}
      {/* <img width={312} height={67} src={"/builder.png"} /> */}
      <BuilderImg />
    </div>
  );
});
