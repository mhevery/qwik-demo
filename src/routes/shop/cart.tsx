import { type QwikIntrinsicElements, component$ } from "@builder.io/qwik";

export interface CartItem {
  name: string;
  qty: number;
}

export const Cart = component$<{ class?: string; cart: CartItem[] }>(
  ({ class: classNames, cart }) => {
    return (
      <div class={["indicator", classNames]}>
        <span class="indicator-item badge badge-primary">{cart.length}</span>
        <div class="grid bg-base-300 place-items-center rounded-lg p-3">
          <div class="drawer drawer-end">
            <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content">
              <label for="my-drawer-4" class="drawer-button btn btn-primary">
                <ShoppingCartIcon />
              </label>
            </div>
            <div class="drawer-side z-10">
              <label
                for="my-drawer-4"
                aria-label="close sidebar"
                class="drawer-overlay"
              ></label>
              <CartContent cart={cart} />
            </div>
          </div>{" "}
        </div>
      </div>
    );
  }
);

export const CartContent = component$<{ cart: CartItem[] }>(({ cart }) => {
  return (
    <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content pt-10">
      {cart.map((item, idx) => (
        <li key={idx} class="flex flex-row">
          <span class="flex-1">{item.name}</span>
          <span>{item.qty}</span>
        </li>
      ))}
    </ul>
  );
});

export function ShoppingCartIcon(
  props: QwikIntrinsicElements["svg"],
  key: string
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="2.5em"
      height="2.5em"
      viewBox="0 0 256 256"
      {...props}
      key={key}
    >
      <path
        fill="currentColor"
        d="M100 216a20 20 0 1 1-20-20a20 20 0 0 1 20 20Zm84-20a20 20 0 1 0 20 20a20 20 0 0 0-20-20Zm51.47-120.47l-27.29 88.7A27.87 27.87 0 0 1 181.41 184H82.93A28.13 28.13 0 0 1 56 163.69L21.81 44H12a12 12 0 0 1 0-24h12.82a20.08 20.08 0 0 1 19.23 14.51L51.34 60H224a12 12 0 0 1 11.47 15.53ZM207.75 84H58.19l20.89 73.1a4 4 0 0 0 3.85 2.9h98.48a4 4 0 0 0 3.83-2.82Z"
      ></path>
    </svg>
  );
}
