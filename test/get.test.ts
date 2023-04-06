import { describe, expect, it } from "vitest";
import Flat from "../src/Flat";

describe("get(key: string) function", () => {
  it("should get value by key", () => {
    const flat = Flat.from({
      foo: "bar",
    });

    expect(flat.get("foo")).toBe("bar");
  });

  it("should get undefined when key not exists", () => {
    const flat = Flat.from({
      foo: "bar",
    });

    expect(flat.get("bar")).toBeUndefined();
  });

  it("should get array by key", () => {
    const flat = Flat.from({
      foo: ["bar", "baz"],
    });

    expect(flat.get("foo")).toEqual(["bar", "baz"]);
  });

  it("should get object by key", () => {
    const flat = Flat.from({
      foo: {
        bar: "baz",
      },
    });

    expect(flat.get("foo")).toEqual({
      bar: "baz",
    });
  });

  it("should get nested value by key", () => {
    const flat = Flat.from({
      foo: {
        bar: "baz",
      },
    });

    expect(flat.get("foo__bar")).toBe("baz");
  });

  it("should get nested array by key", () => {
    const flat = Flat.from({
      foo: {
        bar: ["baz", "qux"],
      },
    });

    expect(flat.get("foo__bar")).toEqual(["baz", "qux"]);
  });

  it("should get nested object by key", () => {
    const flat = Flat.from({
      foo: {
        bar: {
          baz: "qux",
        },
      },
    });

    expect(flat.get("foo__bar")).toEqual({
      baz: "qux",
    });
  });
});
