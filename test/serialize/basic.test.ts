import { describe, expect, it } from "vitest";
import { from } from "../../src/FlatType";

describe("serialize - basic", () => {
  it("should serialize basic object", () => {
    expect(
      from({
        foo: "bar",
      })
    ).toMatchObject({
      foo: {
        type: "value",
        value: "bar",
      },
    });
  });

  it("should serialize basic array", () => {
    expect(from(["foo", "bar"])).toMatchObject({
      "0": {
        type: "value",
        value: "foo",
      },
      "1": {
        type: "value",
        value: "bar",
      },
    });
  });
});
