import { expect } from "vitest";
import Flat from "../src/Flat";

export const testFlat = (data: object) => {
  return () => expect(Flat.from(data).getData()).toMatchObject(data);
};
