import { Slot, component$ } from "@builder.io/qwik";
import { useContent, useLocation } from "@builder.io/qwik-city";
import { css } from "~/styled-system/css";

export default component$(() => {
  const { menu } = useContent();
  const { url } = useLocation();
  return (
    <div
      class={css({
        padding: ".4rem",
      })}
    >
      <Slot />
      <hr />
      {menu
        ? menu.items?.map((item) => (
            <>
              <h5>{item.text}</h5>
              <ul>
                {item.items?.map((item, id) => (
                  <li key={id} class={css({ marginLeft: ".5em" })}>
                    <a
                      href={item.href}
                      class={css({
                        textDecoration: "underline",
                        color: "blue",
                      })}
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ))
        : null}{" "}
    </div>
  );
});
