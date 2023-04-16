import { describe, expect, it } from "vitest";
import Flat from "../src/Flat";

describe("get(key: string) function", () => {
  it("should get keys on simple objet", () => {
    const flat = Flat.from({
      foo: "bar",
    });

    expect(flat.getKeys()).toEqual(["foo"]);
  });

  it("should get keys on array", () => {
    const flat = Flat.from({
      foo: ["bar", "baz"],
    });

    expect(flat.getKeys()).toEqual(["foo", "foo__0", "foo__1"]);
  });

  it("should get keys on nested object", () => {
    const flat = Flat.from({
      foo: {
        bar: "baz",
      },
    });

    expect(flat.getKeys()).toEqual(["foo", "foo__bar"]);
  });

  it("should get keys on nested array", () => {
    const flat = Flat.from({
      foo: {
        bar: ["baz", "qux"],
      },
    });

    expect(flat.getKeys()).toEqual([
      "foo",
      "foo__bar",
      "foo__bar__0",
      "foo__bar__1",
    ]);
  });

  it("should get keys on nested object", () => {
    const flat = Flat.from({
      foo: {
        bar: {
          baz: "qux",
        },
      },
    });

    expect(flat.getKeys()).toEqual(["foo", "foo__bar", "foo__bar__baz"]);
  });
});
