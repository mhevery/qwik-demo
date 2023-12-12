import { component$, useStore, $, useSignal } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";
import { watch } from "fs/promises";

export default component$(() => {
  const files = useStore<string[]>([]);
  const watching = useSignal(false);
  const onClick = $(async () => {
    watching.value = true;
    const watchFiles = await server$(watch)(".", { recursive: true });
    for await (const file of watchFiles) {
      files.push(String(file.filename));
    }
  });
  return (
    <div class="m-5">
      <div>Watching: {String(watching.value)}</div>
      <button class="btn btn-primary" onClick$={onClick}>
        watch
      </button>
      <ul>
        {files.map((file, key) => (
          <li key={key}>{file}</li>
        ))}
      </ul>
    </div>
  );
});
