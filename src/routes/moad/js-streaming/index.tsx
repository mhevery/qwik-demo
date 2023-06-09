import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { Clock } from "../clock";
import NeonLove from "./neon-love";
// import CSSWaves from "./css-vawes";
import Parallax from "./parallax";
import CSS from "./index.css?inline";

// TODO: integrate these: https://1stwebdesigner.com/10-creative-animation-demos-in-css-and-javascript/

export default component$(() => {
  useStylesScoped$(CSS);
  return (
    <div>
      <h1>JS Streaming</h1>
      <p>
        Examples from{" "}
        <a href="https://1stwebdesigner.com/10-creative-animation-demos-in-css-and-javascript/">
          10 Creative Animation Demos in CSS and JavaScript
        </a>
        .
      </p>
      <ul>
        <li style={{ height: "100vh" }}>
          <p>
            JS streaming allows us to pre-fetch JavaScript for the next
            interaction and then only execute JavaScript when it is needed.
          </p>
        </li>
        <li>
          <Clock />
        </li>
        <li>
          <NeonLove />
        </li>
        {/* <li>
          <CSSWaves />
        </li> */}
        <li>
          <Parallax />
        </li>
      </ul>
    </div>
  );
});
