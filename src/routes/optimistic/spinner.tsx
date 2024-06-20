import { component$, useStyles$ } from "@builder.io/qwik";

export const Spinner = component$(() => {
  useStyles$(STYLE);
  return <div class="spinner" />;
});

const STYLE = `
.spinner {
  display: inline-block;
  width: 15px;
  height: 15px;
  border: 2px solid #f3f3f3; /* Light gray border */
  border-radius: 50%; /* Make it a circle */
  border-top-color: #3498db; /* Blue for the spinning part */
  animation: spin 1s linear infinite; /* Animation properties */
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}`;
