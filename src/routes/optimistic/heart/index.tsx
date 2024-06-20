import { component$ } from "@builder.io/qwik";
import { Form, routeAction$, routeLoader$ } from "@builder.io/qwik-city";
import { ActionDebug } from "../action-debug";
import { Spinner } from "../spinner";
import { useOptimisticState } from "../use-optimistic";

let isFavorite: boolean = false;

export const useIsFavorite = routeLoader$(() => {
  return isFavorite;
});

export const useToggleFavoriteAction = routeAction$(async () => {
  await delay(1000);
  isFavorite = !isFavorite;
});

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default component$(() => {
  const isFavorite = useIsFavorite();
  const toggleFavoriteAction = useToggleFavoriteAction();
  const optimisticIsFavorite = useOptimisticState(
    isFavorite,
    toggleFavoriteAction
  );
  return (
    <div>
      <Form action={toggleFavoriteAction}>
        Favorite:{" "}
        <input
          type="hidden"
          name="."
          value={optimisticIsFavorite.value ? "" : "true"}
        />
        <button style={{ cursor: "pointer" }}>
          {optimisticIsFavorite.value ? "❤️" : "🤍"}
        </button>
        {toggleFavoriteAction.isRunning && <Spinner />}
      </Form>
      <ActionDebug action={toggleFavoriteAction} name="toggleFavoriteAction" />
    </div>
  );
});
