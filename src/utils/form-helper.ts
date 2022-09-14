/* eslint-disable */
/* Disabling eslint because we got this code from the remix helper and ported over to work in a SPA env. */
import {
  z,
  ZodArray,
  ZodDate,
  ZodDefault,
  ZodEffects,
  ZodEnum,
  ZodLiteral,
  ZodNativeEnum,
  ZodNumber,
  ZodObject,
  ZodOptional,
  ZodString,
  ZodType,
  ZodTypeAny,
} from "zod";

export function parseParams(o: any, schema: any, key: string, value: any) {
  // find actual shape definition for this key
  let shape = schema;
  while (shape instanceof ZodObject || shape instanceof ZodEffects) {
    shape =
      shape instanceof ZodObject
        ? shape.shape
        : shape instanceof ZodEffects
        ? shape._def.schema
        : null;
    if (shape === null) {
      throw new Error(`Could not find shape for key ${key}`);
    }
  }

  if (key.includes(".")) {
    let [parentProp, ...rest] = key.split(".");
    o[parentProp] = o[parentProp] ?? {};
    parseParams(o[parentProp], shape[parentProp], rest.join("."), value);
    return;
  }
  let isArray = false;
  if (key.includes("[]")) {
    isArray = true;
    key = key.replace("[]", "");
  }
  const def = shape[key];
  if (def) {
    processDef(def, o, key, value as string);
  }
}

export function processDef(
  def: ZodTypeAny,
  o: any,
  key: string,
  value: string
) {
  let parsedValue: any;
  if (def instanceof ZodString || def instanceof ZodLiteral) {
    parsedValue = value;
  } else if (def instanceof ZodNumber) {
    const num = Number(value);
    parsedValue = isNaN(num) ? value : num;
  } else if (def instanceof ZodDate) {
    const date = Date.parse(value);
    parsedValue = isNaN(date) ? value : new Date(date);
  } else if (def instanceof ZodBoolean) {
    parsedValue =
      value === "true" ? true : value === "false" ? false : Boolean(value);
  } else if (def instanceof ZodNativeEnum || def instanceof ZodEnum) {
    parsedValue = value;
  } else if (def instanceof ZodOptional || def instanceof ZodDefault) {
    // def._def.innerType is the same as ZodOptional's .unwrap(), which unfortunately doesn't exist on ZodDefault
    processDef(def._def.innerType, o, key, value);
    // return here to prevent overwriting the result of the recursive call
    return;
  } else if (def instanceof ZodArray) {
    if (o[key] === undefined) {
      o[key] = [];
    }
    processDef(def.element, o, key, value);
    // return here since recursive call will add to array
    return;
  } else if (def instanceof ZodEffects) {
    processDef(def._def.schema, o, key, value);
    return;
  } else {
    throw new Error(`Unexpected type ${def._def.typeName} for key ${key}`);
  }
  if (Array.isArray(o[key])) {
    o[key].push(parsedValue);
  } else {
    o[key] = parsedValue;
  }
}

export function isIterable(
  maybeIterable: unknown
): maybeIterable is Iterable<unknown> {
  return Symbol.iterator in Object(maybeIterable);
}

export function getParamsInternal<T>(
  params: URLSearchParams | FormData | Record<string, string | undefined>,
  schema: any
):
  | { success: true; data: T; errors: undefined }
  | { success: false; data: undefined; errors: { [key: string]: string } } {
  // @ts-ignore
  let o: any = {};
  let entries: [string, unknown][] = [];
  if (isIterable(params)) {
    entries = Array.from(params);
  } else {
    entries = Object.entries(params);
  }

  // TODO: update this
  for (const [key, value] of entries) {
    // infer an empty param as if it wasn't defined in the first place
    if (value === "") {
      continue;
    }
    parseParams(o, schema, key, value);
  }

  const result = schema.safeParse(o);
  if (result.success) {
    return { success: true, data: result.data as T, errors: undefined };
  }
  const errors: any = {};
  const addError = (key: string, message: string) => {
    if (!errors.hasOwnProperty(key)) {
      errors[key] = message;
    } else {
      if (!Array.isArray(errors[key])) {
        errors[key] = [errors[key]];
      }
      errors[key].push(message);
    }
  };

  result.error.issues.forEach((issue) => {
    const { message, path, code, expected, received } = issue;
    const [key, index] = path;
    let value = o[key];
    let prop = key;
    if (index !== undefined) {
      value = value[index];
      prop = `${key}[${index}]`;
    }
    addError(key, message);
  });

  return { success: false, data: undefined, errors };
}

export async function getFormData<T extends ZodType<any, any, any>>(
  data: FormData,
  schema: T
) {
  type ParamsType = z.infer<T>;
  return getParamsInternal<ParamsType>(data, schema);
}
