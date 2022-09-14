import { createCondition } from "./helpers";

export const action = async (formData: FormData, formAction: string) => {
  switch (formAction) {
    case "createCondition":
      return createCondition(formData);
    default: {
      throw new Error(`Unexpected action: ${formAction}`);
    }
  }
};
