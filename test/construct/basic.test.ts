import { describe, expect, it } from "vitest";
import { construct } from "../../src/FlatType";

describe("construct - basic", () => {
  it("should construct basic object", () => {
    expect(
      construct({
        foo: "bar",
      })
    ).toMatchObject({
      foo: {
        type: "value",
        value: "bar",
      },
    });
  });

  it("should construct basic array", () => {
    expect(construct(["foo", "bar"])).toMatchObject({
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
