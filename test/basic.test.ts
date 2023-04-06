import { describe, it } from "vitest";
import { testFlat } from "./utils";

describe("destruct - basic", () => {
  it(
    "should destruct basic object",
    testFlat({
      foo: "bar",
    })
  );

  it("should destruct basic array", () => {
    testFlat(["foo", "bar"]);
  });
});
