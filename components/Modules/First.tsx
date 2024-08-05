import { ErrorMessage } from "@hookform/error-message";
import { Input } from "antd";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

const First = ({general, ...rest}: any) => {
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useFormContext();
  const {update : updateGeneral, replace : replaceGeneral} = rest;
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "variants",
  });

  const onSubmit = (data: any) => {
    console.log("submit >>", data);
  };

//   const variantsCurrent = useWatch({
//     control,
//     name: "variants",
//   });
  //console.log(fields);
  const handleAddField = (id: string, field: any, value: string, index: number) => {
    field.onChange(value);
    trigger();

    if (id == fields[fields.length - 1].id) {
      append({ value: "" });
      const data = general.map((item: any) => {
          if(item.variants[0].value === false) item.variants = [];
          return {
            ...item,
            variants : [...item.variants, {value: value, price: 0, price_sale: 0, quantity: 0, SKU: ''}]
          }
      })
      replaceGeneral(data);
    }else {
      const data = general.map((item: any) => {
          return {
            ...item,
            variants : item.variants.map((i: any, k: number) => {
                if(k === index){
                  return {
                    ...i,
                    value: value
                  }
                }
                return i;
            })
          }
      })
      replaceGeneral(data);
    }
  };
  const onHandleDelete = (index: number) => {
    remove(index);
    const data = general.map((item: any, key: number) => {
      return {
        ...item,
        variants : item.variants.length > 1 ? item.variants.filter((_: any, k: number) => { return index !== k}) : [{value: false, price: 0, price_sale: 0, quantity: 0, SKU: ''}]
      }
    })
    replaceGeneral(data);
  }
  //console.log(errors)
  //console.log(variantsCurrent);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap gap-3">
          {fields.map((item: any, index) => (
            <div key={item.id} className="flex flex-col gap-3">
              <Controller
                name={`variants.${index}.value`}
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    placeholder="Enter value"
                    onChange={(e) => {
                      handleAddField(item.id, field, e.target.value, index);
                    }}
                    value={field.value}
                  />
                )}
              />

                  <ErrorMessage
                        errors={errors}
                        name={`variants.${index}.value`}
                        render={({ message }) => (
                          <p className="text-red-500">{message}</p>
                        )}
                      />

              {index !== fields.length - 1 && (
                <button type="button" onClick={() => onHandleDelete(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>

       
      </form>
    </>
  );
};

export default First;
