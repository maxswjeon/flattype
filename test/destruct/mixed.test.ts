import { describe, expect, it } from "vitest";
import { destructArray, destructObject } from "../../src/FlatType";

describe("destruct - mixed", () => {
  it("should destruct mixed object (object with arrays)", () => {
    expect(
      destructObject({
        foo: {
          type: "array",
          value: "foo__",
        },
        foo__0: {
          type: "value",
          value: "bar",
        },
        foo__1: {
          type: "value",
          value: "baz",
        },
      })
    ).toMatchObject({
      foo: ["bar", "baz"],
    });
  });

  it("should destruct mixed array (array with object)", () => {
    expect(
      destructArray({
        "0": {
          type: "object",
          value: "0__",
        },
        "0__foo": {
          type: "value",
          value: "bar",
        },
        "0__baz": {
          type: "value",
          value: "qux",
        },
        "1": {
          type: "object",
          value: "1__",
        },
        "1__foo": {
          type: "value",
          value: "tes",
        },
        "1__baz": {
          type: "value",
          value: "tst",
        },
      })
    ).toMatchObject([
      {
        foo: "bar",
        baz: "qux",
      },
      {
        foo: "tes",
        baz: "tst",
      },
    ]);
  });
});
