/* eslint-disable */
/* Disabling eslint because we got this code from the remix helper and ported over to work in a SPA env. */
import { ActionReturn } from "@/components/content/forms/types";
import Zod, {
  z,
  ZodArray,
  ZodBoolean,
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
  ZodTypeAny,
  ZodUnknown,
} from "zod";

export type AnyZodSchema = Zod.AnyZodObject | ZodEffects<any, any, any>;

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

export function processDef(def: ZodTypeAny, o: any, key: string, value: string) {
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
    parsedValue = value === "true" ? true : value === "false" ? false : Boolean(value);
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
  } else if (def instanceof ZodObject) {
    const parsedJson = JSON.parse(value);
    parsedValue = parsedJson;
    Object.entries(def.shape).forEach(([key, _]) => {
      if (!parsedValue[key]) {
        delete parsedJson[key];
      }
    });
  } else if (def instanceof ZodUnknown) {
    parsedValue = JSON.parse(value);
  } else {
    throw new Error(`Unexpected type ${def._def.typeName} for key ${key}`);
  }
  if (Array.isArray(o[key])) {
    o[key].push(parsedValue);
  } else {
    o[key] = parsedValue;
  }
}

export function isIterable(maybeIterable: unknown): maybeIterable is Iterable<unknown> {
  return Symbol.iterator in Object(maybeIterable);
}

export function getParamsInternal<T>(
  params: URLSearchParams | FormData | Record<string, string | undefined>,
  schema: any
): ActionReturn<T> {
  // @ts-ignore
  let o: any = {};
  let entries: [string, unknown][] = [];
  if (isIterable(params)) {
    entries = Array.from(params);
  } else {
    entries = Object.entries(params);
  }

  for (const [key, value] of entries) {
    // infer an empty param as if it wasn't defined in the first place
    if (value === "") {
      continue;
    }
    parseParams(o, schema, key, value);
  }

  let toParse = schema;
  const result = toParse.safeParse(o);
  if (result.success) {
    return { success: true, data: result.data as T, errors: undefined };
  }
  const errors: any = {};
  const addError = (key: string, message: string) => {
    if (!errors.hasOwnProperty(key)) {
      errors[key] = [message];
    } else {
      errors[key] = [...errors[key], message];
    }
  };

  result.error.issues.forEach((issue: any) => {
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

export async function getFormData<T extends AnyZodSchema>(data: FormData, schema: T) {
  type ParamsType = z.infer<T>;
  return getParamsInternal<ParamsType>(data, schema);
}

function getOptions(schema: Zod.AnyZodObject, field: string): string[] | undefined {
  const zodField = schema.shape[field];
  return zodField?.options || zodField?.unwrap?.().options;
}

export const isOptional = (schema: Zod.AnyZodObject, field: string): boolean =>
  schema.shape[field] instanceof Zod.ZodOptional;

export type InputPropType = {
  name: string;
  type: string;
  required?: boolean;
  "aria-required"?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  options?: string[] | undefined;
};

export function useFormInputProps(zodThing: AnyZodSchema, options: any = {}) {
  const schema = zodThing instanceof ZodEffects ? zodThing._def.schema : zodThing;
  const { shape } = schema;
  const defaultOptions = options;
  return function props(key: string, options: any = {}) {
    options = { ...defaultOptions, ...options };
    const def = shape[key];
    if (!def) {
      throw new Error(`no such key: ${key}`);
    }
    return getInputProps(key, schema, def);
  };
}

export function getInputProps(name: string, schema: any, def: ZodTypeAny): InputPropType {
  let type = "text";
  let min;
  let max;
  let minlength;
  let maxlength;
  const options = getOptions(schema, name);
  if (def instanceof ZodString) {
    if (def.isEmail) {
      type = "email";
    } else if (def.isURL) {
      type = "url";
    }
    minlength = def.minLength ?? undefined;
    maxlength = def.maxLength ?? undefined;

    const check: any = def._def.checks.find((c) => c.kind === "regex");
  } else if (def instanceof ZodNumber) {
    type = "number";
    min = def.minValue ?? undefined;
    max = def.maxValue ?? undefined;
  } else if (def instanceof ZodBoolean) {
    type = "checkbox";
  } else if (def instanceof ZodDate || def._def.innerType instanceof ZodDate) {
    type = "date";
  } else if (def instanceof ZodArray) {
    return getInputProps(name, schema, def.element);
  }

  const inputProps: InputPropType = {
    name,
    type,
    options,
  };

  if (!(def instanceof ZodOptional)) {
    inputProps["aria-required"] = true;
  }
  if (min) inputProps.min = min;
  if (max) inputProps.max = max;
  if (minlength && Number.isFinite(minlength)) inputProps.minLength = minlength;
  if (maxlength && Number.isFinite(maxlength)) inputProps.maxLength = maxlength;
  return inputProps;
}
