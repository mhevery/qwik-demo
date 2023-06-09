import { Slot, component$ } from "@builder.io/qwik";
import { useContent, useLocation, Link } from "@builder.io/qwik-city";

export default component$(() => {
  const { menu } = useContent();
  const { url } = useLocation();
  return (
    <div>
      <Slot />
      <hr />
      {menu
        ? menu.items?.map((item) => (
            <>
              <h5>{item.text}</h5>
              <ul>
                {item.items?.map((item, id) => (
                  <li key={id}>
                    <Link
                      href={item.href}
                      class={{
                        "is-active": url.pathname === item.href,
                      }}
                    >
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ))
        : null}{" "}
    </div>
  );
});
