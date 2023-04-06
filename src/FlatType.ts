export type FlatType = {
  [key: string]: {
    type: "value" | "object" | "array";
    value: string;
  };
};

export function construct(object: object): FlatType {
  if (Array.isArray(object)) {
    return fromArray(object);
  }
  return fromObject(object);
}

// rome-ignore lint/suspicious/noExplicitAny: this is a library that can be used with any type
function fromObject(obj: any, prefix = ""): FlatType {
  const flat: FlatType = {};
  for (const key in obj) {
    const flatKey = `${prefix}${key}`;
    const value = obj[key as keyof typeof obj];

    if (Array.isArray(value)) {
      flat[flatKey] = {
        type: "array",
        value: `${flatKey}__`,
      };

      const arrayValues = fromArray(value, `${flatKey}__`);
      Object.assign(flat, arrayValues);
    } else if (typeof value === "object" && value !== null) {
      flat[flatKey] = {
        type: "object",
        value: `${flatKey}__`,
      };

      const nestedValues = fromObject(value, `${flatKey}__`);
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
function fromArray(array: any[], prefix = ""): FlatType {
  const flat: FlatType = {};
  array.forEach((value, index) => {
    const runtimeKey = `${prefix}${index}`;
    if (Array.isArray(value)) {
      flat[runtimeKey] = {
        type: "array",
        value: `${runtimeKey}__`,
      };

      const arrayValues = fromArray(value, `${runtimeKey}__`);
      Object.assign(flat, arrayValues);
    } else if (typeof value === "object" && value !== null) {
      flat[runtimeKey] = {
        type: "object",
        value: `${runtimeKey}__`,
      };

      const nestedValues = fromObject(value, `${runtimeKey}__`);
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

export function destructObject(flat: FlatType, prefix = "") {
  // rome-ignore lint/suspicious/noExplicitAny: this is a library that can be used with any type
  const result: any = {};

  for (const key in flat) {
    if (!key.startsWith(prefix)) {
      continue;
    }

    const nestedKey = key.slice(prefix.length);
    const subKeys = nestedKey.split("__");

    if (subKeys.length !== 1) {
      continue;
    }
    const subKey = subKeys[0];

    const { type, value } = flat[key];
    if (type === "value") {
      result[subKey] = value;
    } else if (type === "array") {
      result[subKey] = destructArray(flat, value);
    } else if (type === "object") {
      result[subKey] = destructObject(flat, value);
    }
  }

  return result;
}

// rome-ignore lint/suspicious/noExplicitAny: this is a library that can be used with any type
export function destructArray(flat: FlatType, prefix = ""): any[] {
  // rome-ignore lint/suspicious/noExplicitAny: this is a library that can be used with any type
  const array: any[] = [];
  let index = 0;
  while (`${prefix}${index}` in flat) {
    const key = `${prefix}${index}`;

    const { type, value } = flat[key];
    if (type === "value") {
      array.push(value);
    } else if (type === "array") {
      array.push(destructArray(flat, value));
    } else if (type === "object") {
      array.push(destructObject(flat, value));
    }

    index++;
  }

  return array;
}
