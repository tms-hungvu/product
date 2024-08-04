
import { z } from 'zod';
export const colorsSchema = z.object({
    colors: z
      .array(  // My mean is validate name is required but exclude last item in array
        z.object({
          image: z.any(),
          name: z.string().max(20)
        }),
      )
      .superRefine((colors, ctx) => {
       
  
        if(colors.length === 1) {
          if(!colors[0].name.trim()){
              ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  path: [`0.name`],
                  message: 'Value is required.',
                });
          }
          if(!colors[0].image){
              ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  path: [`0.image`],
                  message: 'Image is required.',
                });
          }
          if(colors[0].image && !colors[0].image.type.startsWith('image/')){
              ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  path: [`0.image`],
                  message: 'File must be an Image.',
                });
          }
        
        }
  
        colors.slice(0, -1).map((item, index) => {
            if(!item.image){
              ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  path: [`${index}.image`],
                  message: 'Image is required.',
                });
            }
            if(!Boolean(item.image instanceof File) || item.image.type.split('/')[0] !== 'image'){
              ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  path: [`${index}.image`],
                  message: 'File must me an Image',
                });
            }
  
        })
  
        const names = colors.map((color) => color.name).slice(0, -1); 
        colors.slice(0, -1).map((color, index) => {
          const isUnique = names.indexOf(color.name) === index && names.lastIndexOf(color.name) === index;
        
          if (index < colors.length - 1 && !color.name.trim()) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: [`${index}.name`],
              message: 'Value is required.',
            });
          }
          
          if(!isUnique) {
              ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  path: [`${index}.name`],
                  message: 'Value must be unique.',
              });
          }
      });
  
      }),
  });
 export type ColorsFormData = z.infer<typeof colorsSchema>;