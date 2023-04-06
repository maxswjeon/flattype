import { describe, expect, it } from "vitest";
import { from } from "../../src/FlatType";

describe("serialize - mixed", () => {
  it("should serialize mixed object (object with arrays)", () => {
    expect(
      from({
        foo: ["bar", "baz"],
      })
    ).toMatchObject({
      foo: {
        type: "array",
        value: "foo__0",
      },
      foo__0: {
        type: "value",
        value: "bar",
      },
      foo__1: {
        type: "value",
        value: "baz",
      },
    });
  });

  it("should serialize mixed array (array with object)", () => {
    expect(
      from([
        {
          foo: "bar",
          baz: "qux",
        },
        {
          foo: "tes",
          baz: "tst",
        },
      ])
    ).toMatchObject({
      "0": {
        type: "object",
        value: "0__foo",
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
        value: "1__foo",
      },
      "1__foo": {
        type: "value",
        value: "tes",
      },
      "1__baz": {
        type: "value",
        value: "tst",
      },
    });
  });
});
