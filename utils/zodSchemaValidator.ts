import { ZodEffects, ZodObject } from "zod";
export const zodSchemaValidator = (
  data: any,
  schema: ZodObject<any> | ZodEffects<any>
) => {
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(data)) {
      fields[key] = data[key].toString();
    }
    return {
      error: "Invalid form data",
      fields,
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }
  return null;
};
