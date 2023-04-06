import { describe, expect, it } from "vitest";
import Flat from "../src/Flat";

describe("delete(key: string) function", () => {
  it("should delete value by key", () => {
    const flat = Flat.from({
      foo: "bar",
    });

    expect(flat.delete("foo").getData()).toEqual({});
  });

  it("should delete array by key", () => {
    const flat = Flat.from({
      foo: ["bar", "baz"],
    });

    expect(flat.delete("foo").getData()).toEqual({});
  });

  it("should delete object by key", () => {
    const flat = Flat.from({
      foo: {
        bar: "baz",
      },
    });

    expect(flat.delete("foo").getData()).toEqual({});
  });

  it("should delete nested value by key", () => {
    const flat = Flat.from({
      foo: {
        bar: "baz",
      },
    });

    expect(flat.delete("foo").getData()).toEqual({});
  });

  it("should delete nested array by key", () => {
    const flat = Flat.from({
      foo: {
        bar: ["baz", "qux"],
      },
    });

    expect(flat.delete("foo").getData()).toEqual({});
  });

  it("should delete nested object by key", () => {
    const flat = Flat.from({
      foo: {
        bar: {
          baz: "qux",
        },
      },
    });

    expect(flat.delete("foo").getData()).toEqual({});
  });

  it("should delete intermediate nested object by key", () => {
    const flat = Flat.from({
      foo: {
        bar: {
          baz: "qux",
        },
      },
    });

    expect(flat.delete("foo__bar").getData()).toEqual({
      foo: {},
    });
  });

  it("should delete intermediate nested array by key", () => {
    const flat = Flat.from({
      foo: {
        bar: [
          {
            baz: "qux",
          },
          {
            baz: "tes",
          },
        ],
      },
    });

    expect(flat.delete("foo__bar").getData()).toEqual({
      foo: {},
    });
  });
});
