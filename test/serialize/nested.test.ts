import { describe, expect, it } from "vitest";
import { from } from "../../src/FlatType";

describe("serialize - nested", () => {
  it("should serialize nested object", () => {
    expect(
      from({
        foo: {
          bar: "baz",
        },
      })
    ).toMatchObject({
      foo: {
        type: "object",
        value: "foo__bar",
      },
      foo__bar: {
        type: "value",
        value: "baz",
      },
    });
  });

  it("should serialize nested array", () => {
    expect(from([["foo", "bar"], ["baz"]])).toMatchObject({
      "0": {
        type: "array",
        value: "0__0",
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
        value: "1__0",
      },
      "1__0": {
        type: "value",
        value: "baz",
      },
    });
  });
});
