import { type Signal, useComputed$ } from "@builder.io/qwik";
import { type ActionStore } from "@builder.io/qwik-city";

export function useOptimisticState<LOADER, RETURN, INPUT>(
  state: Readonly<Signal<LOADER>>,
  ...actions: Array<ActionStore<RETURN, INPUT>>,
): Readonly<Signal<LOADER>> {
  return useComputed$(() => {
    let optimisticMode = false;
    let optimisticState: any = null;
    actions.forEach((action) => {
      if (action.isRunning && action.formData) {
        if (!optimisticMode) {
          optimisticState = structuredClone(state.value);
          optimisticMode = true;
        }
        optimisticState = applyFormData(optimisticState, action.formData);
      }
    });
    return (optimisticMode ? optimisticState : state.value) as LOADER;
  });
}

const matchType = <T>(valueToCast: string, valueExampleType: T): T => {
  if (typeof valueExampleType === "string") {
    return valueToCast as unknown as T;
  }
  if (typeof valueExampleType === "number") {
    return parseInt(valueToCast) as unknown as T;
  }
  if (typeof valueExampleType === "boolean") {
    return Boolean(valueToCast) as unknown as T;
  }
  return valueToCast as unknown as T;
};

const enum Char {
  Dot = 46,
  Eq = 61,
  BackSlash = 92,
  LeftBracket = 91,
  RightBracket = 93,
}

export const lexer = (text: string): string[] => {
  const length = text.length;
  let idx = 0;
  let last = 0;
  const tokens: string[] = [];
  while (idx < length) {
    const ch = text.charCodeAt(idx);
    if (ch === Char.Dot || ch === Char.LeftBracket || ch === Char.RightBracket || ch === Char.Eq) {
      if (last < idx) {
        tokens.push(text.slice(last, idx)); // push the identifier before us.
      }
      tokens.push(text[idx]); // push the current character
      last = idx + 1;
    }
    idx++;
  }
  if (last < idx) {
    tokens.push(text.slice(last));
  }
  return tokens;
}

type Dereference = string | {
  path: Dereference[];
  search: string;
}

export const parsePath = (selector: string): Dereference[] => {
  if (selector === '.' || !selector) return [];
  const parts = lexer(selector);
  let currentPath: Dereference[] = [];
  const stack: Dereference[][] = [];
  while (parts.length) {
    const part = parts.shift()!;
    if (part === '.') {
      currentPath.push(parts.shift()!);
    } else if (part === '[') {
      stack.push(currentPath);
      currentPath = [];
    } else if (part === '=') {
      currentPath = [{ path: currentPath, search: parts.shift()! }];
    } else if (part === ']') {
      const temp = currentPath;
      currentPath = stack.pop()!;
      if (temp.length === 1) {
        currentPath.push(temp[0]);
      } else {
        currentPath.push({ path: temp, search: '' });
      }
    } else {
      currentPath.push(part);
    }
  }
  return currentPath;
};

const select = (obj: any, path: Dereference[]): [any, any, string | number] => {
  // console.log('SELECT', path);
  let currentObj = obj;
  let prevObj: any = null;
  let prop: string | number = null!;
  let idx = 0;
  const length = path.length;
  while (idx < length) {
    const deref = path[idx++];
    prevObj = currentObj;
    if (typeof deref === 'string') {
      if (currentObj && typeof currentObj === 'object') {
        if (Array.isArray(currentObj) && deref.startsWith('+')) {
          if (deref === '+') {
            currentObj.push(currentObj = {});
          } else {
            currentObj.splice(parseInt(deref.slice(1)), 0, currentObj = {});
          }
        } else {
          currentObj = currentObj[prop = deref];
        }
      }
    } else {
      const { path, search } = deref;
      if (currentObj && Array.isArray(currentObj)) {
        prop = currentObj.findIndex((item) => select(item, path)[0] === search);
        currentObj = currentObj[prop];
      }
    }
  }
  return [currentObj, prevObj, prop];
}

export const objectSelector = (obj: any, selector: string): [any, any, string | number] => {
  if (selector === '.') return [obj, null, ''];
  return select(obj, parsePath(selector));
}


const TYPES: Record<string, any> = {
  'number': 0,
  'boolean': false,
  'bool': false,
}

export function applyFormData<T>(obj: T, formData: FormData): T {
  let selectedObj = obj;
  const types: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (key === ":select" && typeof value === 'string') {
      // console.log('SELECT', value);
      selectedObj = objectSelector(obj, value)[0];
    }
    if (key === ":remove" && typeof value === 'string') {
      const [, last, prop] = objectSelector(obj, value);
      if (typeof last == 'object') {
        // console.log('REMOVE', value, last, prop);
        if (Array.isArray(last)) {
          last.splice(Number(prop), 1);
        } else {
          delete last[prop];
        }
      }
    }
    if (key === ':type') {
      String(value).split(';').forEach((declaration) => {
        const [prop, type] = declaration.split(':');
        types[prop] = type;
      });
      // console.log('TYPES', types);
    }
  }
  for (const [key, value] of formData.entries()) {
    if (key.startsWith(":")) {
      continue;
    }
    if (key === ".") {
      console.log('OBJ', matchType(String(value), obj));
      return matchType(String(value), obj);
    }
    const [, parentObj, prop] = objectSelector(selectedObj, key);
    if (parentObj) {
      console.log('   ', prop, value, parentObj);
      const type = types[prop];
      const exampleType = type ? TYPES[type] : parentObj[prop];
      parentObj[prop] = matchType(String(value), exampleType);
    }
  }
  console.log('OBJ', obj);
  return obj;
}
