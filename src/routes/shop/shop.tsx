import { component$ } from "@builder.io/qwik";
import { type CartItem } from "./cart";

export const Shop = component$<{ cart: CartItem[] }>(({ cart }) => {
  return (
    <div class="mx-auto container flex flex-col justify-center">
      <div class="mx-auto text-5xl m-5">Travel Mug</div>
      <img class="w-1/2 mx-auto" loading="lazy" src="/travel-mug.webp" />
      <button
        class="btn btn-primary mx-auto w-1/4 m-5"
        onClick$={() =>
          cart.push({
            name: "Travel Mug",
            qty: 1,
          })
        }
      >
        Buy!
      </button>
    </div>
  );
});
