import ImgMhevery from "~/media/mhevery.jpeg?jsx";
import { component$, useStyles$, $, useSignal } from "@builder.io/qwik";
import CSS from "./index.css?inline";
import {
  type RequestHandler,
  routeAction$,
  routeLoader$,
  server$,
} from "@builder.io/qwik-city";
import { db } from "./db";
import { delay } from "~/util/delay";

export default component$(() => {
  useStyles$(CSS);
  const quote = { value: MOCK_VALUE };
  const favoriteQuoteAction = MOCK_ACTION;
  const rating = useSignal(quote.value.rating);
  const favoriteClick = $(() => {
    console.log("FAVORITE CLICKED");
  });
  const starClicked = $(async () => {
    console.log("STAR CLICKED");
  });
  return (
    <>
      <div class="card w-96 bg-base-200 shadow-xl m-3">
        <figure class="bg-base-300">
          <div class="w-full flex items-center m-3">
            <div class="avatar">
              <div class="w-24 rounded-full">
                <img src={"/mhevery.jpeg"} />
              </div>
            </div>
            <span class="ml-5 text-3xl">mhevery</span>
          </div>
        </figure>
        <div class="card-body">
          <span>{quote.value?.text}</span>
          <div class="flex justify-between">
            <button class="inline-block" onClick$={starClicked}>
              {"★★★★★".substring(0, rating.value)}
              {"☆☆☆☆☆".substring(rating.value)}
            </button>
            <div class="inline-block">
              <button
                class="inline-block"
                style={{
                  animation: favoriteQuoteAction.isRunning
                    ? "heartbeat 1.5s infinite"
                    : "",
                }}
                onClick$={favoriteClick}
              >
                {quote.value.favorited ? "❤️" : "♡"}
              </button>
              <span class="ml-1">{quote.value.favoriteCount}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

const MOCK_VALUE = {
  id: "123",
  text: "We talk about fullstack developers, but QwikDev takes fullstack to its full definition of the word. Server and client have never been so seamless.",
  rating: 4,
  favoriteCount: 231,
  favorited: false,
};
const MOCK_ACTION = { isRunning: false };
