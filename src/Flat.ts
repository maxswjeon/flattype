type FlatData = {
  [key: string]: {
    type: "value" | "object" | "array";
    value: string;
  };
};

export default class Flat {
  private flat: FlatData;
  private type: "object" | "array";

  private constructor(data: object) {
    if (Array.isArray(data)) {
      this.flat = Flat.fromArray(data);
      this.type = "array";
    } else {
      this.flat = Flat.fromObject(data);
      this.type = "object";
    }
  }

  // rome-ignore lint/suspicious/noExplicitAny: this is a library that can be used with any type
  private static fromObject(obj: any, prefix = ""): FlatData {
    const flat: FlatData = {};
    for (const key in obj) {
      const flatKey = `${prefix}${key}`;
      const value = obj[key as keyof typeof obj];

      if (Array.isArray(value)) {
        flat[flatKey] = {
          type: "array",
          value: `${flatKey}__`,
        };

        const arrayValues = Flat.fromArray(value, `${flatKey}__`);
        Object.assign(flat, arrayValues);
      } else if (typeof value === "object" && value !== null) {
        flat[flatKey] = {
          type: "object",
          value: `${flatKey}__`,
        };

        const nestedValues = Flat.fromObject(value, `${flatKey}__`);
        Object.assign(flat, nestedValues);
      } else {
        flat[flatKey] = {
          type: "value",
          value: value.toString(),
        };
      }
    }

    return flat;
  }

  // rome-ignore lint/suspicious/noExplicitAny: this is a library that can be used with any type
  private static fromArray(array: any[], prefix = ""): FlatData {
    const flat: FlatData = {};
    array.forEach((value, index) => {
      const runtimeKey = `${prefix}${index}`;
      if (Array.isArray(value)) {
        flat[runtimeKey] = {
          type: "array",
          value: `${runtimeKey}__`,
        };

        const arrayValues = Flat.fromArray(value, `${runtimeKey}__`);
        Object.assign(flat, arrayValues);
      } else if (typeof value === "object" && value !== null) {
        flat[runtimeKey] = {
          type: "object",
          value: `${runtimeKey}__`,
        };

        const nestedValues = Flat.fromObject(value, `${runtimeKey}__`);
        Object.assign(flat, nestedValues);
      } else {
        flat[runtimeKey] = {
          type: "value",
          value: value.toString(),
        };
      }
    });

    return flat;
  }

  private toObject(prefix = "") {
    // rome-ignore lint/suspicious/noExplicitAny: this is a library that can be used with any type
    const result: any = {};

    for (const key in this.flat) {
      if (!key.startsWith(prefix)) {
        continue;
      }

      const nestedKey = key.slice(prefix.length);
      const subKeys = nestedKey.split("__");

      if (subKeys.length !== 1) {
        continue;
      }
      const subKey = subKeys[0];

      const { type, value } = this.flat[key];
      if (type === "value") {
        result[subKey] = value;
      } else if (type === "array") {
        result[subKey] = this.toArray(value);
      } else if (type === "object") {
        result[subKey] = this.toObject(value);
      }
    }

    return result;
  }

  // rome-ignore lint/suspicious/noExplicitAny: this is a library that can be used with any type
  private toArray(prefix = ""): any[] {
    // rome-ignore lint/suspicious/noExplicitAny: this is a library that can be used with any type
    const array: any[] = [];
    let index = 0;
    while (`${prefix}${index}` in this.flat) {
      const key = `${prefix}${index}`;

      const { type, value } = this.flat[key];
      if (type === "value") {
        array.push(value);
      } else if (type === "array") {
        array.push(this.toArray(value));
      } else if (type === "object") {
        array.push(this.toObject(value));
      }

      index++;
    }

    return array;
  }

  private static createNextKey(
    key: string,
    index: number,
    depth: number
  ): string {
    const keys = key.split("__");

    if (keys.length < depth) {
      return key;
    }

    const prevIndex = Number(keys[depth - 1]);

    if (prevIndex < index) {
      return key;
    }

    keys[depth - 1] = (prevIndex - 1).toString();

    return keys.join("__");
  }

  static getParentKey(key: string): string {
    return key.split("__").slice(0, -1).join("__");
  }

  static from(data: object) {
    return new Flat(data);
  }

  getData() {
    if (this.type === "object") {
      return this.toObject();
    } else {
      return this.toArray();
    }
  }

  exist(key: string) {
    return key in this.flat;
  }

  get(key: string) {
    if (!(key in this.flat)) {
      return undefined;
    }

    const { type, value } = this.flat[key];
    if (type === "value") {
      return value;
    }
    if (type === "array") {
      return this.toArray(value);
    }
    if (type === "object") {
      return this.toObject(value);
    }
  }

  delete(key: string): Flat {
    Object.keys(this.flat).forEach((flatKey) => {
      if (flatKey.startsWith(key)) {
        delete this.flat[flatKey];
      }
    });

    const parent = Flat.getParentKey(key);
    if (
      (parent === "" && this.type === "array") ||
      this.flat[parent]?.type === "array"
    ) {
      const removedIndex = Number(
        key.slice(parent.length === 0 ? 0 : parent.length + 2)
      );
      const updatedDepth = key.split("__").length;

      Object.keys(this.flat).forEach((flatKey) => {
        const newKey = Flat.createNextKey(flatKey, removedIndex, updatedDepth);

        const type = this.flat[flatKey].type;
        const value = this.flat[flatKey].value;
        delete this.flat[flatKey];

        if (type === "value") {
          this.flat[newKey] = {
            type,
            value,
          };
        } else {
          const newValue = value.slice(flatKey.length);

          this.flat[newKey] = {
            type,
            value: newKey + newValue,
          };
        }
      });
    }

    return this;
  }

  set(key: string, value: string | object) {
    if (this.exist(key)) {
      this.delete(key);
    }
    if (Array.isArray(value)) {
      this.flat[key] = {
        type: "array",
        value: `${key}__`,
      };
      this.flat = { ...this.flat, ...Flat.fromArray(value, `${key}__`) };
    } else if (typeof value === "object") {
      this.flat[key] = {
        type: "object",
        value: `${key}__`,
      };
      this.flat = { ...this.flat, ...Flat.fromObject(value, `${key}__`) };
    } else {
      this.flat[key] = {
        type: "value",
        value,
      };
    }

    return this;
  }

  append(key: string, value: string | object) {
    if (key !== "" && !this.exist(key)) {
      throw new Error(`Key ${key} does not exist`);
    }

    if (key !== "" && this.flat[key].type !== "array") {
      throw new Error(`Key ${key} is not an array`);
    }

    if (key === "" && this.type === "object") {
      throw new Error("Flat is not an array");
    }

    const index = Object.keys(this.flat).filter(
      (flatKey) =>
        flatKey.startsWith(key) && !flatKey.slice(key.length).includes("__")
    ).length;

    const newKey = key === "" ? index.toString() : `${key}__${index}`;
    this.set(newKey, value);

    return this;
  }

  getKeys() {
    return Object.keys(this.flat);
  }
}
