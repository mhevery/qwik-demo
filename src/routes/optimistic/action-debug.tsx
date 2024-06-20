import { component$ } from "@builder.io/qwik";
import { type ActionStore } from "@builder.io/qwik-city";

export const ActionDebug = component$<{
  action: ActionStore<any, any>;
  name: string;
}>(({ action, name }) => {
  return (
    <pre style={{ fontSize: "10px" }}>
      {name}.actionPath = {toString(action.actionPath)}
      {"\n"}
      {name}.isRunning = {toString(action.isRunning)}
      {"\n"}
      {name}.formData = {toString(action.formData)}
      {"\n"}
      {name}.status = {toString(action.status)}
      {"\n"}
      {name}.value = {toString(action.value)}
    </pre>
  );
});

export const toString = (value: any): string => {
  if (value == undefined) return "undefined";
  if (value instanceof FormData) {
    console.log("FormAction", Array.from(value.entries()));
  } else {
    console.log(value);
  }
  return JSON.stringify(value, null, 2);
};
