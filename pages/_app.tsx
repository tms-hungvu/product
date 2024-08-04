import type { AppProps } from "next/app";
import React, { useEffect, useRef, useState } from "react";

import "../styles/globals.scss";
import First from "@/components/Modules/First";
import Second from "@/components/Modules/Second";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import {
  ColorsFormData,
  colorsSchema,
} from "@/components/Modules/Schema/SecondSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  VariantFormData,
  variantSchema,
} from "@/components/Modules/Schema/FirstSchema";
import isEmpty from "lodash/isEmpty";
import General from "@/components/Modules/General";
import { GeneralFormData, generalSchema } from "@/components/Modules/Schema/GeneralSchema";

export default function App({ Component, pageProps }: AppProps) {
  //const [general, setGeneral] = useState<any>([]);
  const firstMethod = useForm<ColorsFormData>({
    defaultValues: {
      colors: [{ image: null, name: "" }],
    },
    resolver: zodResolver(colorsSchema),
    mode: "onChange",
  });

  const secondMethod = useForm<VariantFormData>({
    defaultValues: {
      variants: [{ value: "" }],
    },
    resolver: zodResolver(variantSchema),
    mode: "onChange",
  });

  const generalMethod = useForm<GeneralFormData>({
    defaultValues: {
      general: [],
    },
    resolver: zodResolver(generalSchema),
    mode: "onChange",
  })

  const submitForm = () => {
    firstMethod.trigger();
    secondMethod.trigger();
  };
 
  const first = firstMethod.watch().colors;
  const second = secondMethod.watch().variants;
  const general = generalMethod.watch().general;
 
  useEffect(() => {
    console.log(general)
    if (Boolean(first.length - 1) ) {
      const data = first.slice(0, -1).map((color, keyColor: number) => {
        return {
          image: color.image,
          name: color.name,
          variants: Boolean(second.length === 1)
            ? [{ value: false, price: 0, price_sale: 0, quantity: 0, SKU: ''}]
            : second.slice(0, -1).map((variant, keyVariant: number) => {
               return {
                  value: variant.value,
                  price:   0, 
                  price_sale: 0, 
                  quantity: 0, 
                  SKU: '', 
               }
            }),
        };
      })
      generalMethod.reset({
        general: data,
      })
     
    }
  }, [JSON.stringify(general), JSON.stringify(first), JSON.stringify(second)]);

  //console.log('outside: ', general)

  //console.log(first, second);
 //console.log(general)
  return (
    <>
      <div className="mb-8">
        <FormProvider {...firstMethod}>
          <Second />
        </FormProvider>
      </div>
      <div className="h-[1px] bg-black w-full"></div>
      <div className="mt-4">
        <FormProvider {...secondMethod}>
          <First />
        </FormProvider>
      </div>
      <div className="mt-4">
      <FormProvider {...generalMethod}>
           <General second={second} />
        </FormProvider>
       
      </div>
      <button onClick={() => submitForm()} className="mt-4 bg-black text-white">
        Submit
      </button>
    </>
  );
}
