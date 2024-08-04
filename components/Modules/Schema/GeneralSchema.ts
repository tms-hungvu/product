import { z } from 'zod';
export const generalSchema = z.object({
    general: z
      .array(
        z.object({
          image: z.any(),
          name: z.any(),
          variants: z.array(
            z.object({
                value: z.any(),
                price: z.any(),
                price_sale: z.any(),
                quantity: z.number(),
                SKU: z.any()
            })
          )
        })
      )
      .superRefine((variants, ctx) => {
     
      }),
  });
 export type GeneralFormData = z.infer<typeof generalSchema>;