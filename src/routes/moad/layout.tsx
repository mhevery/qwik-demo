import { Slot, component$ } from "@builder.io/qwik";
import { useContent } from "@builder.io/qwik-city";

export default component$(() => {
  const { menu } = useContent();
  return (
    <div class="m-5">
      <Slot />
      <hr class="mt-10 mb-5 " />
      {menu
        ? menu.items?.map((item) => (
            <>
              <h5 class="inline">{item.text}:</h5>
              {"[ "}
              <ul class="inline">
                {item.items?.map((item, id) => (
                  <li key={id} class="inline">
                    {id ? " | " : ""}
                    <a href={item.href} class="underline text-sky-500">
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
              {" ]"}
            </>
          ))
        : null}{" "}
    </div>
  );
});
