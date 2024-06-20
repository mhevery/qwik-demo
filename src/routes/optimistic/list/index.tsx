import { component$ } from "@builder.io/qwik";
import { Form, routeAction$, routeLoader$, z, zod$ } from "@builder.io/qwik-city";
import { useOptimisticState } from "../use-optimistic";
import { Spinner } from "../spinner";

const hash = () => Math.random().toString(36).split(".")[1];


const tasks: Array<{ id: string, task: string; done: boolean }> = [
  { id: hash(), task: "Buy milk", done: false },
  { id: hash(), task: "Learn Qwik", done: false },
  { id: hash(), task: "Profit", done: false },
];


export const useTasks = routeLoader$(() => {
  return tasks;
});

export const useAddTaskAction = routeAction$(async (task) => {
  await delay(1000);
  console.log('add', task);
  tasks.push(task);
}, zod$({ id: z.string(), task: z.string(), done: z.coerce.boolean() }));

export const useDeleteTaskAction = routeAction$(async (task) => {
  await delay(1000);
  console.log('delete', task);
  const idx = tasks.findIndex((t) => t.id === task.id);
  if (idx !== -1) {
    console.log('    ', idx);
    tasks.splice(idx, 1);
  }
}, zod$({ id: z.string() }));

export const useUpdateTaskAction = routeAction$(async (task) => {
  await delay(1000);
  console.log('update', task);
  const idx = tasks.findIndex((t) => t.id === task.id);
  if (idx !== -1) {
    tasks[idx] = task;
  }
}, zod$({ id: z.string(), task: z.string(), done: z.coerce.boolean() }));

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default component$(() => {
  const tasks = useTasks();
  const addTaskAction = useAddTaskAction();
  const deleteAction = useDeleteTaskAction();
  const updateAction = useUpdateTaskAction();
  const optTasks = useOptimisticState(
    tasks,
    addTaskAction,
    deleteAction,
    updateAction
  );
  return (
    <div>
      <div>
        <span>Task</span>
        <span>Done</span>
      </div>
      <Form action={addTaskAction}>
        <input type="hidden" name=":select" value="+" />
        <input type="hidden" name=":type" value="done:boolean" />
        <input type="hidden" name="id" value={hash()} />
        <input type="text" name="task" placeholder="task" />
        <input type="checkbox" name="done" value="true" />
        <button>+</button>
        {addTaskAction.isRunning && <Spinner />}
      </Form>
      {optTasks.value.map((task) =>
        <div key={task.id}>
          <Form action={updateAction} style={{ display: 'inline-block' }}>
            <input type="hidden" name=":select" value={`[id=${task.id}]`} />
            <input type="hidden" name="id" value={task.id} />
            <input type="text" name="task" placeholder="task" value={task.task} />
            <input type="checkbox" name="done" value="true" checked={task.done} />
            <button>💾</button>
            {updateAction.isRunning && updateAction.formData!.get('id') == task.id && <Spinner />}
          </Form>
          <Form action={deleteAction} style={{ display: 'inline-block' }}>
            <input type="hidden" name=":remove" value={`[id=${task.id}]`} />
            <input type="hidden" name="id" value={task.id} />
            <button>❌</button>
          </Form>
        </div>)}
      {deleteAction.isRunning && <Spinner />}
    </div>
  );
});
