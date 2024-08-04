import { Input } from "antd";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

const First = () => {
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useFormContext();
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
  const handleAddField = (id: string) => {
    if (id == fields[fields.length - 1].id) {
      append({ value: "" });
    }
  };
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
                      field.onChange(e.target.value);
                      handleAddField(item.id);
                      trigger();
                    }}
                    value={field.value}
                  />
                )}
              />

              {errors?.variants && errors?.variants[index] && (
                <span className="text-red-500">
                  {errors?.variants[index]?.value?.message}
                </span>
              )}

              {index !== fields.length - 1 && (
                <button type="button" onClick={() => remove(index)}>
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
