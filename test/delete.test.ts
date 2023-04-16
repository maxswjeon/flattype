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

  it("should delete element in array on root", () => {
    const flat = Flat.from(["foo", "bar", "baz"]);
    flat.delete("1");
    expect(flat.getData()).toEqual(["foo", "baz"]);
  });

  it("should delete element in array on nested", () => {
    const flat = Flat.from({
      foo: ["bar", "baz", "qux"],
    });
    flat.delete("foo__1");
    expect(flat.getData()).toEqual({
      foo: ["bar", "qux"],
    });
  });

  it("should delete element in array with objects", () => {
    const flat = Flat.from({
      foo: [
        {
          bar: "baz",
        },
        {
          bar: "qux",
        },
        {
          bar: "tes",
        },
      ],
    });

    flat.delete("foo__1");
    expect(flat.getData()).toEqual({
      foo: [
        {
          bar: "baz",
        },
        {
          bar: "tes",
        },
      ],
    });
  });

  it("should delete element in array with complex objects", () => {
    const flat = Flat.from({
      foo: [
        {
          bar: {
            baz: "qux",
          },
        },
        {
          bar: {
            baz: "tes",
          },
        },
        {
          bar: {
            baz: "foo",
          },
        },
      ],
    });

    flat.delete("foo__1");
    expect(flat.getData()).toEqual({
      foo: [
        {
          bar: {
            baz: "qux",
          },
        },
        {
          bar: {
            baz: "foo",
          },
        },
      ],
    });
  });

  it("should able to append new value after delete on complex array", () => {
    const flat = Flat.from({
      foo: [
        {
          bar: {
            baz: "qux",
          },
        },
        {
          bar: {
            baz: "tes",
          },
        },
        {
          bar: {
            baz: "foo",
          },
        },
      ],
    });

    flat.delete("foo__1");

    flat.append("foo", {
      bar: {
        baz: "tar",
      },
    });

    expect(flat.getData()).toEqual({
      foo: [
        {
          bar: {
            baz: "qux",
          },
        },
        {
          bar: {
            baz: "foo",
          },
        },
        {
          bar: {
            baz: "tar",
          },
        },
      ],
    });
  });
});
