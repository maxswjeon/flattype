import { describe, it } from "vitest";
import { testFlat } from "./utils";

describe("destruct - mixed", () => {
  it(
    "should destruct mixed object (object with arrays)",
    testFlat({
      foo: ["bar", "baz"],
    })
  );

  it(
    "should destruct mixed array (array with object)",
    testFlat([
      {
        foo: "bar",
        baz: "qux",
      },
      {
        foo: "tes",
        baz: "tst",
      },
    ])
  );
});
