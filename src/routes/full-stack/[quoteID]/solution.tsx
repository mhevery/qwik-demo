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

export const onGet: RequestHandler = async ({ request, json, params }) => {
  if (request.headers.get("accept")?.indexOf("text/json") !== -1) {
    json(200, await db.loadQuotById(params.quoteID));
  }
};

export const useQuote = routeLoader$(async ({ params, send }) => {
  const quote = await db.loadQuotById(params.quoteID);
  if (!quote) {
    send(400, "NOT FOUND");
  }
  return quote!;
});

export const useFavoriteQuoteAction = routeAction$(async (data, { params }) => {
  await db.toggleQuotById(params.quoteID);
  await delay(2000);
});

export default component$(() => {
  useStyles$(CSS);
  const quote = useQuote();
  const favoriteQuoteAction = useFavoriteQuoteAction();
  const rating = useSignal(quote.value.rating);
  const favoriteClick = $(() => {
    favoriteQuoteAction.submit();
  });
  const starClicked = $(async () => {
    rating.value = (rating.value + 1) % 6;
    await server$(async () => {
      return await db.setRatingById(quote.value.id, rating.value);
    })();
  });
  return (
    <>
      <div class="card w-96 bg-base-200 shadow-xl m-3">
        <figure class="bg-base-300">
          <div class="w-full flex items-center m-3">
            <div class="avatar">
              <div class="w-24 rounded-full">
                <ImgMhevery />
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
