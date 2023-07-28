import { component$, useSignal } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { readFile } from "fs/promises";
import { css } from "~/styled-system/css";

export const useDevelopers = routeLoader$(async () => {
  const developers = JSON.parse(
    String(await readFile("./src/routes/moad/loader/developers.json"))
  );
  return developers as Developer[];
});

interface Developer {
  name: string;
  image: string;
}

export default component$(() => {
  const developers = useDevelopers();
  const filter = useSignal("");
  return (
    <div>
      <h1>Developers</h1>
      <input
        class={css({
          border: "1px solid black",
        })}
        placeholder="filter"
        bind:value={filter}
      />
      {filter.value}
      <ul>
        {developers.value
          .filter((dev) => dev.name.indexOf(filter.value) !== -1)
          .map((developer, idx) => (
            <li key={idx}>
              <img
                class={css({
                  display: "inline-block",
                  borderRadius: "50%",
                  margin: ".2em",
                })}
                width={25}
                height={25}
                src={developer.image}
              />
              <span>{developer.name}</span>
            </li>
          ))}
      </ul>
    </div>
  );
});
