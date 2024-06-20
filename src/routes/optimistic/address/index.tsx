import { component$ } from "@builder.io/qwik";
import { Form, routeAction$, routeLoader$, z, zod$ } from "@builder.io/qwik-city";
import { Spinner } from "../spinner";
import { useOptimisticState } from "../use-optimistic";
import { ActionDebug } from "../action-debug";

let address = {
  first: "John",
  last: "Doe",
  street: "123 Main St",
  city: "Anytown",
  state: "CA",
  zip: "12345",
};

export const useAddress = routeLoader$(() => {
  return address;
});

export const useUpdateAddressAction = routeAction$(async (formData) => {
  await delay(1000);
  address = formData;
}, zod$({
  first: z.string(),
  last: z.string(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
}));

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default component$(() => {
  const address = useAddress();
  const updateAddressAction = useUpdateAddressAction();
  const optAddress = useOptimisticState(address, updateAddressAction);
  return (
    <div>
      <Form class="w-full max-w-lg" action={updateAddressAction}>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
              First Name
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name" type="text" placeholder="first" value={optAddress.value.first} name="first" />
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
              Last Name
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name" type="text" placeholder="last" value={optAddress.value.last} name="last" />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-street">
              Password
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-street" type="text" placeholder="street" value={optAddress.value.street} name="street" />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-2">
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
              City
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-city" type="text" placeholder="city" value={optAddress.value.city} name="city" />
          </div>
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
              State
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state" type="text" placeholder="state" value={optAddress.value.state} name="state" />
          </div>
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
              Zip
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-zip" type="text" placeholder="zip" value={optAddress.value.zip} name="zip" />
          </div>
        </div>
        <button class="btn btn-blue">save</button>
        {updateAddressAction.isRunning && <Spinner />}
      </Form>
      <hr />
      <div>{optAddress.value.last}, {optAddress.value.first}</div>
      <div>
        {optAddress.value.street}
      </div>
      <div>
        {optAddress.value.city}{", "}
        {optAddress.value.state}{" "}
        {optAddress.value.zip}
      </div>
      <hr />

      <ActionDebug action={updateAddressAction} name="updateAddressAction" />
    </div>
  );
});
