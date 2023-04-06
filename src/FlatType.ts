export type FlatType = {
  [key: string]: {
    type: "value" | "object" | "array";
    value: string;
  };
};

export function from(object: any): FlatType {
  if (Array.isArray(object)) {
    return fromArray(object);
  } else if (typeof object === "object" && object !== null) {
    return fromObject(object);
  } else {
    throw new Error("Invalid object");
  }
}

function fromObject(obj: any, prefix = ""): FlatType {
  const flat: FlatType = {};
  for (const key in obj) {
    const flatKey = prefix === "" ? key : `${prefix}${key}`;
    const value = obj[key];

    if (Array.isArray(value)) {
      flat[flatKey] = {
        type: "array",
        value: `${flatKey}__0`,
      };

      const arrayValues = fromArray(value, `${flatKey}__`);
      Object.assign(flat, arrayValues);
    } else if (typeof value === "object" && value !== null) {
      flat[flatKey] = {
        type: "object",
        value: `${flatKey}__${Object.keys(value)[0]}`,
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

function fromArray(array: any[], prefix = ""): FlatType {
  const flat: FlatType = {};
  array.forEach((value, index) => {
    const runtimeKey = `${prefix}${index}`;
    if (Array.isArray(value)) {
      flat[runtimeKey] = {
        type: "array",
        value: `${runtimeKey}__0`,
      };

      const arrayValues = fromArray(value, `${runtimeKey}__`);
      Object.assign(flat, arrayValues);
    } else if (typeof value === "object" && value !== null) {
      flat[runtimeKey] = {
        type: "object",
        value: `${runtimeKey}__${Object.keys(value)[0]}`,
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

export function toObject(flat: FlatType) {
  const object: any = {};
  for (const key in flat) {
    const { type, value } = flat[key];
    if (type === "value") {
      object[key] = value;
    } else if (type === "array") {
      object[key] = toArray(flat, value);
    } else if (type === "object") {
      object[key] = toObject(flat, value);
    }
  }

  return object;
}
