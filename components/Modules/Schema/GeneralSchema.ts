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
                price: z.number().min(1000, { message: 'Price is must be at least 1000' }),
                price_sale: z.number().min(1000, { message: 'Price sale is must be at least 1000' }),
                quantity: z.number()
                .min(1, { message: 'Quantity is required' }),
                SKU: z.string()
                .max(50, { message: 'SKU is must be at most 50 characters' })
                .transform((str) => str.trim()).refine((str) => str.length > 0, {
                  message: "SKU is required",
                })
            })
          )
        })
      )
      .superRefine((prices, ctx) => {
           prices.map((item, key) => {
            item.variants.map((i, k) => {
               if(i.price <= i.price_sale){
                  ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: [`${key}.variants.${k}.price_sale`],
                    message: "Price sale must be less than Price",
                  });
               }
            })
           })
      })
  });
 export type GeneralFormData = z.infer<typeof generalSchema>;