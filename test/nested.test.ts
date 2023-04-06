import { describe, it } from "vitest";
import { testFlat } from "./utils";

describe("destruct - nested", () => {
  it(
    "should destruct nested object",
    testFlat({
      foo: {
        bar: "baz",
      },
    })
  );

  it("should destruct nested array", testFlat([["foo", "bar"], ["baz"]]));
});
