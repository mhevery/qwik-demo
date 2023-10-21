import { component$ } from "@builder.io/qwik";
import ItemImage from "../../media/travel-mug-with-a-handle-white-25-oz-front-645fef632a158.webp?jsx";
import { type CartItem } from "./cart";

export const Shop = component$<{ cart: CartItem[] }>(({ cart }) => {
  return (
    <div class="mx-auto container flex flex-col justify-center">
      <div class="mx-auto text-5xl m-5">Travel Mug</div>
      <ItemImage class="w-2/3 mx-auto rounded-3xl" />
      {/* <img
        class="w-2/3 mx-auto"
        loading="lazy"
        src="/travel-mug-with-a-handle-white-25-oz-front-645fef632a158.webp"
      /> */}
      <button
        class="btn btn-primary mx-auto w-1/4"
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
