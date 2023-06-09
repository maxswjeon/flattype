import { describe, expect, it } from "vitest";
import Flat from "../src/Flat";

describe("append(key: string, value: any) function", () => {
  it("should append value by key", () => {
    const flat = Flat.from({
      foo: ["bar"],
    });

    expect(flat.append("foo", "baz").getData()).toEqual({
      foo: ["bar", "baz"],
    });
  });

  it("should append value by key on empty array", () => {
    const flat = Flat.from({
      foo: [],
    });

    expect(flat.append("foo", "baz").getData()).toEqual({
      foo: ["baz"],
    });
  });

  it("should append value by key on empty array twice", () => {
    const flat = Flat.from({
      foo: [],
    });

    expect(flat.append("foo", "baz").append("foo", "bar").getData()).toEqual({
      foo: ["baz", "bar"],
    });
  });

  it("should append value by key on empty array three times", () => {
    const flat = Flat.from({
      foo: [],
    });

    expect(
      flat
        .append("foo", "baz")
        .append("foo", "bar")
        .append("foo", "tar")
        .getData()
    ).toEqual({
      foo: ["baz", "bar", "tar"],
    });
  });

  it("should append value by key on root", () => {
    const flat = Flat.from(["foo"]);

    expect(flat.append("", "baz").getData()).toEqual(["foo", "baz"]);
  });

  it("should append value by key on root when root is empty array", () => {
    const flat = Flat.from([]);

    expect(flat.append("", "baz").getData()).toEqual(["baz"]);
  });

  it("should append value by key on root when root is empty array twice", () => {
    const flat = Flat.from([]);

    expect(flat.append("", "baz").append("", "bar").getData()).toEqual([
      "baz",
      "bar",
    ]);
  });

  it("should append value by key on root when root is empty array three times", () => {
    const flat = Flat.from([]);

    expect(
      flat.append("", "baz").append("", "bar").append("", "tar").getData()
    ).toEqual(["baz", "bar", "tar"]);
  });

  it("should throw an error when tried to append on non existing key", () => {
    const flat = Flat.from({
      foo: "bar",
    });

    expect(() => flat.append("bar", "baz")).toThrowError(
      "Key bar does not exist"
    );
  });

  it("should throw an error when key is not an array", () => {
    const flat = Flat.from({
      foo: "bar",
    });

    expect(() => flat.append("foo", "baz")).toThrowError(
      "Key foo is not an array"
    );
  });

  it("should throw an error when tried to append on root and root is not an array", () => {
    const flat = Flat.from({
      foo: "bar",
    });

    expect(() => flat.append("", "baz")).toThrowError("Flat is not an array");
  });
});
