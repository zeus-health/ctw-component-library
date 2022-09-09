import Zod, {
  ZodArray,
  ZodBoolean,
  ZodDate,
  ZodNumber,
  ZodOptional,
  ZodString,
  ZodTypeAny,
} from "zod";

export function getOptions(
  schema: Zod.AnyZodObject,
  field: string
): string[] | undefined {
  const zodField = schema.shape[field];
  return zodField?.options || zodField?.unwrap?.().options;
}

export const isOptional = (schema: Zod.AnyZodObject, field: string): boolean =>
  schema.shape[field] instanceof Zod.ZodOptional;

export type InputPropType = {
  name: string;
  type: string;
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
};

export function useFormInputProps(schema: any, options: any = {}) {
  const { shape } = schema;
  const defaultOptions = options;
  return function props(key: string, options: any = {}) {
    options = { ...defaultOptions, ...options };
    const def = shape[key];
    if (!def) {
      throw new Error(`no such key: ${key}`);
    }
    return getInputProps(key, def);
  };
}

export function getInputProps(name: string, def: ZodTypeAny): InputPropType {
  let type = "text";
  let min;
  let max;
  let minlength;
  let maxlength;
  let pattern;
  if (def instanceof ZodString) {
    if (def.isEmail) {
      type = "email";
    } else if (def.isURL) {
      type = "url";
    }
    minlength = def.minLength ?? undefined;
    maxlength = def.maxLength ?? undefined;
    // TODO: update this type
    const check: any = def._def.checks.find((c) => c.kind === "regex");
    pattern = check ? check.regex.source : undefined;
  } else if (def instanceof ZodNumber) {
    type = "number";
    min = def.minValue ?? undefined;
    max = def.maxValue ?? undefined;
  } else if (def instanceof ZodBoolean) {
    type = "checkbox";
  } else if (def instanceof ZodDate) {
    type = "date";
  } else if (def instanceof ZodArray) {
    return getInputProps(name, def.element);
  } else if (def instanceof ZodOptional) {
    return getInputProps(name, def.unwrap());
  }

  const inputProps: InputPropType = {
    name,
    type,
  };
  if (!def.isOptional()) inputProps.required = true;
  if (min) inputProps.min = min;
  if (max) inputProps.max = max;
  if (minlength && Number.isFinite(minlength)) inputProps.minLength = minlength;
  if (maxlength && Number.isFinite(maxlength)) inputProps.maxLength = maxlength;
  if (pattern) inputProps.pattern = pattern;
  return inputProps;
}
