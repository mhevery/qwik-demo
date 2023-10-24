import { component$, useStore } from "@builder.io/qwik";
import { Menu } from "./menu";
import { Cart, type CartItem } from "./cart";
import { Footer } from "./footer";
import { Clock } from "../moad/clock";
import { Counter } from "./counter";
import { Greet } from "./greet";
import { Shop } from "./shop";

export default component$(() => {
  const cart = useStore<CartItem[]>([
    // {
    //   name: "Sample Item",
    //   qty: 5,
    // },
  ]);

  return (
    <div class="">
      <header class="bg-neutral">
        <div class="flex flex-row p-5">
          <Menu class="grow mr-5" />
          <Cart cart={cart} />
        </div>
      </header>
      <main class="container flex flex-col">
        <Greet />
        <Counter />
        <Shop cart={cart} />
        {/* <div style={{ height: "10vh" }} /> */}
        <div class="py-40">
          <Clock />
        </div>
      </main>
      <Footer />
    </div>
  );
});
