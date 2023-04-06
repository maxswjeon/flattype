import { describe, expect, it } from "vitest";
import { construct } from "../../src/FlatType";

describe("construct - nested", () => {
  it("should construct nested object", () => {
    expect(
      construct({
        foo: {
          bar: "baz",
        },
      })
    ).toMatchObject({
      foo: {
        type: "object",
        value: "foo__",
      },
      foo__bar: {
        type: "value",
        value: "baz",
      },
    });
  });

  it("should construct nested array", () => {
    expect(construct([["foo", "bar"], ["baz"]])).toMatchObject({
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
    });
  });
});
