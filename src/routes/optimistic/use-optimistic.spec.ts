import { describe, it, expect } from "vitest";
import { applyFormData, lexer, objectSelector, parsePath } from "./use-optimistic";

describe("useOptimistic", () => {
  describe('lexer', () => {
    it('should split text', () => {
      expect(lexer('')).toEqual([]);
      expect(lexer('a')).toEqual(['a']);
      expect(lexer('abc')).toEqual(['abc']);
      expect(lexer('abc.xyz')).toEqual(['abc', '.', 'xyz']);
      expect(lexer('a.b[1].c')).toEqual(['a', '.', 'b', '[', '1', ']', '.', 'c']);
      expect(lexer('a.b[a=b].c')).toEqual(['a', '.', 'b', '[', 'a', '=', 'b', ']', '.', 'c']);
    });

  })
  describe('parsePath', () => {
    it('should parse path', () => {
      expect(parsePath('')).toEqual([]);
      expect(parsePath('.')).toEqual([]);
      expect(parsePath('a')).toEqual(['a']);
      expect(parsePath('abc')).toEqual(['abc']);
      expect(parsePath('abc.xyz')).toEqual(['abc', 'xyz']);
      expect(parsePath('a.b[1].c')).toEqual(['a', 'b', '1', 'c']);
      expect(parsePath('a.b[a=b].c')).toEqual(['a', 'b', { path: ['a'], search: 'b' }, 'c']);
      expect(parsePath('b[a.d=b].c')).toEqual(['b', { path: ['a', 'd'], search: 'b' }, 'c']);
    });
  });
  describe("objectSelector", () => {
    it('should select by path', () => {
      expect(objectSelector({}, '.')[0]).toEqual({});
      expect(objectSelector({}, 'bar')[0]).toEqual(undefined);
      expect(objectSelector({ 'bar': 'baz' }, 'bar')[0]).toEqual('baz');
      expect(objectSelector(['bar', 'baz'], '1')[0]).toEqual('baz');
      expect(objectSelector(['bar', 'baz'], '[1]')[0]).toEqual('baz');
      expect(objectSelector([{ id: 'bar' }, { id: 'baz' }], '[.id=baz]')[0]).toEqual({ id: 'baz' });
    });
  });
  it("should return same", () => {
    expect(applyFormData({}, formData({}))).toEqual({});
    expect(applyFormData(true, formData({}))).toEqual(true);
  });
  it("should match type", () => {
    expect(applyFormData("", formData({ ".": "abc" }))).toEqual("abc");
    expect(applyFormData(true, formData({ ".": "" }))).toEqual(false);
    expect(applyFormData(0, formData({ ".": "123" }))).toEqual(123);
  });
  it("should update self", () => {
    expect(applyFormData('abc', formData({ '.': "Oliver" }))).toEqual("Oliver");
  });
  it("should update inside the object", () => {
    expect(
      applyFormData(
        { first: "John", last: "Smith", age: 30 },
        formData({ last: "Oliver", age: "40" })
      )
    ).toEqual({ first: "John", last: "Oliver", age: 40 });
  });
  it("should update inside the array", () => {
    expect(
      applyFormData(
        [{ first: "John", last: "Smith", age: 30 }, { first: "Jan", last: "Kovac", age: 25 }],
        formData({
          ':select': 'first=Jan',
          'last': "Oliver",
          'age': "40"
        })
      )
    ).toEqual([
      { first: "John", last: "Smith", age: 30 },
      { first: "Jan", last: "Oliver", age: 40 }
    ]);
  });
  it("should add to end of array", () => {
    expect(
      applyFormData(
        [
          { id: 1, task: "Buy milk", done: false },
          { id: 2, task: "Learn Qwik", done: false }
        ],
        formData({
          ':select': "+",
          ':type': 'done:boolean;id:number',
          'id': "3",
          'task': "Profit",
          'done': "true",
        })
      )
    ).toEqual([
      { id: 1, task: "Buy milk", done: false },
      { id: 2, task: "Learn Qwik", done: false },
      { id: 3, task: "Profit", done: true },
    ]);
  });
  it("should add to front of array", () => {
    expect(
      applyFormData(
        [
          { id: 1, task: "Buy milk", done: false },
          { id: 2, task: "Learn Qwik", done: false }
        ],
        formData({
          ':select': "+0",
          ':type': 'done:boolean;id:number',
          'id': "0",
          'task': "Profit",
          'done': "true",
        })
      )
    ).toEqual([
      { id: 0, task: "Profit", done: true },
      { id: 1, task: "Buy milk", done: false },
      { id: 2, task: "Learn Qwik", done: false },
    ]);
  });
  it("should delete from array", () => {
    expect(
      applyFormData(
        [
          { id: 1, task: "Buy milk", done: false },
          { id: 2, task: "Learn Qwik", done: false }
        ],
        formData({
          ':remove': "[id=2]",
        })
      )
    ).toEqual([
      { id: 1, task: "Buy milk", done: false },
    ]);
  });
});

function formData<T>(data: Record<string, string>): FormData {
  const formData = new FormData();
  for (let key in data) {
    const value = data[key];
    formData.append(key, String(value));
  }
  return formData;
}
