import { describe, expect, it } from "vitest";
import { destructArray, destructObject } from "../../src/FlatType";

describe("destruct - basic", () => {
  it("should destruct basic object", () => {
    expect(
      destructObject({
        foo: {
          type: "value",
          value: "bar",
        },
      })
    ).toMatchObject({
      foo: "bar",
    });
  });

  it("should destruct basic array", () => {
    expect(
      destructArray({
        "0": {
          type: "value",
          value: "foo",
        },
        "1": {
          type: "value",
          value: "bar",
        },
      })
    ).toMatchObject(["foo", "bar"]);
  });
});
