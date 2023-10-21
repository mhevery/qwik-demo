import { component$ } from "@builder.io/qwik";

export const Menu = component$<{ class?: string }>(({ class: classNames }) => {
  const isOpen = false;
  return (
    <ul
      class={[
        "menu",
        "menu-horizontal",
        "bg-base-200",
        "rounded-box",
        classNames,
      ]}
    >
      <li>
        <a>Electronics</a>
      </li>
      <li>
        <a>Household</a>
      </li>
      <li>
        <details open={isOpen}>
          <summary>
            <a>Your Order</a>
          </summary>
          <ul>
            <li>
              <a>Past Orders</a>
            </li>
            <li>
              <a>Delivered</a>
            </li>
            <li>
              <details open={isOpen}>
                <summary>Concerns</summary>
                <ul class="ml-10">
                  <li>
                    <a>Return</a>
                  </li>
                  <li>
                    <a class="whitespace-nowrap">Contact US</a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </details>
      </li>
    </ul>
  );
});
