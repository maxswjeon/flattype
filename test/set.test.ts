import { describe, expect, it } from "vitest";
import Flat from "../src/Flat";

describe("set(key: string, value: string | object) function", () => {
  it("should set value by key", () => {
    const flat = Flat.from({
      foo: "bar",
    });

    flat.set("foo", "baz");

    expect(flat.get("foo")).toBe("baz");
  });

  it("should set array by key", () => {
    const flat = Flat.from({
      foo: ["bar", "baz"],
    });

    flat.set("foo", ["gar", "gaz"]);

    expect(flat.get("foo")).toEqual(["gar", "gaz"]);
  });

  it("should set object by key", () => {
    const flat = Flat.from({
      foo: {
        bar: "baz",
      },
    });

    flat.set("foo", {
      gar: "gaz",
    });

    expect(flat.get("foo")).toEqual({
      gar: "gaz",
    });
  });

  it("should overwrite original value", () => {
    const flat = Flat.from({
      foo: {
        bar: "baz",
      },
    });

    flat.set("foo", "gar");

    expect(flat.get("foo")).toBe("gar");
  });

  it("should set a new value", () => {
    const flat = Flat.from({
      foo: "bar",
    });

    flat.set("baz", "qux");

    expect(flat.get("baz")).toBe("qux");
  });

  it("should set a new object", () => {
    const flat = Flat.from({
      foo: "bar",
    });

    flat.set("baz", {
      qux: "gar",
    });

    expect(flat.get("baz")).toEqual({
      qux: "gar",
    });
  });

  it("should set a new array", () => {
    const flat = Flat.from({
      foo: "bar",
    });

    flat.set("baz", ["qux", "gar"]);

    expect(flat.get("baz")).toEqual(["qux", "gar"]);
  });
});
