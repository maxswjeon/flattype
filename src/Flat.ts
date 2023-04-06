type FlatData = {
  [key: string]: {
    type: "value" | "object" | "array";
    value: string;
  };
};

const handler: ProxyHandler<Flat> = {
  get(target, property) {
    return target[property as keyof Flat];
  },
  set(target, property, value) {
    target[property as keyof Flat] = value;
    return true;
  },
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

  static from(data: object) {
    return new Proxy(new Flat(data), handler);
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

  getData() {
    if (this.type === "object") {
      return this.toObject();
    } else {
      return this.toArray();
    }
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
}
