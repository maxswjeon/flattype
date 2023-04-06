import { describe, expect, it } from "vitest";
import Flat from "../src/Flat";

describe("exist(key: string) function", () => {
  it("should return true when key exists", () => {
    const flat = Flat.from({
      foo: "bar",
    });

    expect(flat.exist("foo")).toBe(true);
  });

  it("should return false when key not exists", () => {
    const flat = Flat.from({
      foo: "bar",
    });

    expect(flat.exist("bar")).toBe(false);
  });

  it("should return true when nested key exists", () => {
    const flat = Flat.from({
      foo: {
        bar: "baz",
      },
    });

    expect(flat.exist("foo__bar")).toBe(true);
  });

  it("should return false when nested key not exists", () => {
    const flat = Flat.from({
      foo: {
        bar: "baz",
      },
    });

    expect(flat.exist("foo__baz")).toBe(false);
  });
});
