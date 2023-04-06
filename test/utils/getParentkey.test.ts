import { describe, expect, it } from "vitest";
import { getParentKey } from "../../src/utils";

describe("getParentKey", () => {
  it("should return parent key for object", () => {
    const key = "foo__bar__baz";
    const parentKey = "foo__bar";

    expect(getParentKey(key)).toBe(parentKey);
  });

  it("should return parent key for array", () => {
    const key = "foo__bar__10";
    const parentKey = "foo__bar";

    expect(getParentKey(key)).toBe(parentKey);
  });

  it("should return empty string when key is root", () => {
    const key = "foo";

    expect(getParentKey(key)).toBe("");
  });
});
