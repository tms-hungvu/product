import type { AppProps } from "next/app";
import React, { useEffect, useRef, useState } from "react";

import "../styles/globals.scss";
import First from "@/components/Modules/First";
import Second from "@/components/Modules/Second";
import { FormProvider, useFieldArray, useForm, useWatch } from "react-hook-form";
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
  const { control } = generalMethod;

  const {  ...rest } = useFieldArray({
    control,
    name: "general",
  });

 

 


  const submitForm = () => {
    firstMethod.trigger();
    secondMethod.trigger();
  };
 
  const first = firstMethod.watch().colors;
  const second = secondMethod.watch().variants;
  const general = generalMethod.watch().general;
 
  return (
    <>
      <div className="mb-8">
        <FormProvider {...firstMethod}>
          <Second general={general} {...rest} />
        </FormProvider>
      </div>
      <div className="h-[1px] bg-black w-full"></div>
      <div className="mt-4">
        <FormProvider {...secondMethod}>
          <First general={general} {...rest} />
        </FormProvider>
      </div>
      <div className="mt-4">
      <FormProvider {...generalMethod}>
           <General second={second} {...rest} />
        </FormProvider>
       
      </div>
      <button onClick={() => submitForm()} className="mt-4 bg-black text-white">
        Submit
      </button>
    </>
  );
}
