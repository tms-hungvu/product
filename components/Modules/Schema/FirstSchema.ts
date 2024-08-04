import { z } from 'zod';
export const variantSchema = z.object({
    variants: z
      .array(
        z.object({
          value: z.string(),
        })
      )
      .superRefine((variants, ctx) => {
        if (variants.length === 1 && !variants[0].value.trim()) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [`0.value`],
            message: "Value is required.",
          });
        }
        const names = variants.map((variant) => variant.value).slice(0, -1);
        variants.slice(0, -1).map((variant, index) => {
          const isUnique =
            names.indexOf(variant.value) === index &&
            names.lastIndexOf(variant.value) === index;
          if (!variant.value.trim()) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: [`${index}.value`],
              message: "Value is required.",
            });
          }
          if (!isUnique) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: [`${index}.value`],
              message: "Value must be unique.",
            });
          }
        });
      }),
  });
 export type VariantFormData = z.infer<typeof variantSchema>;