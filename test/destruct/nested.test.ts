import { describe, expect, it } from "vitest";
import { destructArray, destructObject } from "../../src/FlatType";

describe("destruct - nested", () => {
  it("should destruct nested object", () => {
    expect(
      destructObject({
        foo: {
          type: "object",
          value: "foo__",
        },
        foo__bar: {
          type: "value",
          value: "baz",
        },
      })
    ).toMatchObject({
      foo: {
        bar: "baz",
      },
    });
  });

  it("should destruct nested array", () => {
    expect(
      destructArray({
        "0": {
          type: "array",
          value: "0__",
        },
        "0__0": {
          type: "value",
          value: "foo",
        },
        "0__1": {
          type: "value",
          value: "bar",
        },
        "1": {
          type: "array",
          value: "1__",
        },
        "1__0": {
          type: "value",
          value: "baz",
        },
      })
    ).toMatchObject([["foo", "bar"], ["baz"]]);
  });
});
