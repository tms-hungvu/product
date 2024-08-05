import { PlusOutlined } from "@ant-design/icons";
import { ErrorMessage } from "@hookform/error-message";

import { Image, Input, Upload } from "antd";
import { ChangeEvent } from "react";
import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";

const Second = ({ general, second, ...rest }: any) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    trigger,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();
  const {
    append: appendGeneral,
    update: updateGeneral,
    remove: removeGeneral,
  } = rest;

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "colors",
  });

  const colorsCurrent = useWatch({
    control,
    name: "colors",
  });

  const onSubmit = (data: any) => {
    console.log("submit >>", data);
  };

  const handleAddFieldText = (id: string, value: string, index: number) => {
    if (id == fields[fields.length - 1].id) {
      append({ image: null, name: "" });
      console.log(second);
      appendGeneral({
        image: null,
        name: value,
        variants:
          second.length > 1
            ? second.slice(0, -1).map((i: any) => {
                return {
                  value: i.value,
                  price: 0,
                  price_sale: 0,
                  quantity: 0,
                  SKU: "",
                };
              })
            : [
                {
                  value: false,
                  price: 0,
                  price_sale: 0,
                  quantity: 0,
                  SKU: "",
                },
              ],
      });
    } else {
      updateGeneral(index, {
        ...general[index],
        name: value,
      });
    }
  };

  const handleAddFieldFile = (id: string, file: any, index: number) => {
    const newData = {
      image: file.originFileObj,
      name: colorsCurrent[index].name,
    };
    update(index, newData);
    trigger();

    if (id == fields[fields.length - 1].id) {
      append({ image: null, name: "" });
      appendGeneral({
        image: file.originFileObj,
        name: "",
        variants: [
          {
            value: false,
            price: 0,
            price_sale: 0,
            quantity: 0,
            SKU: "",
          },
        ],
      });
    } else {
      updateGeneral(index, {
        ...general[index],
        image: file.originFileObj,
      });
    }
  };

  const changeInput = (
    e: ChangeEvent<HTMLInputElement>,
    id: string,
    field: any,
    index: number
  ) => {
    field.onChange(e.target.value);
    handleAddFieldText(id, e.target.value, index);
    trigger();

    // console.log(listColor.colors)
    //console.log(general)
    //  const data = general.map((item: any,key: any) => {
    //     if(key == index) {
    //        return {
    //           ...item,
    //           name: e.target.value
    //        }
    //     }
    //     return item;
    //  })
    //setGeneral(data);
    //console.log(data);
  };

  const setGeneral = (data: any) => {
    // replaceGeneral(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap gap-3">
          {fields.map((item: any, index) => (
            <div key={item.id} className="flex flex-col gap-3">
              <Upload
                name={`colors.${index}.image`}
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                maxCount={1}
                onChange={({ file }) => {
                  handleAddFieldFile(item.id, file, index);
                }}
              >
                {item.image ? (
                  <Image
                    preview={false}
                    alt="image"
                    width={200}
                    src={URL.createObjectURL(item.image)}
                  />
                ) : (
                  <button
                    style={{ border: 0, background: "none" }}
                    type="button"
                  >
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </button>
                )}
              </Upload>
              <ErrorMessage
                errors={errors}
                name={`colors.${index}.image`}
                render={({ message }) => (
                  <p className="text-red-500">{message}</p>
                )}
              />
              <Controller
                name={`colors.${index}.name`}
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    placeholder="Enter name"
                    onChange={(e) => {
                      changeInput(e, item.id, field, index);
                    }}
                    value={field.value}
                  />
                )}
              />
              <ErrorMessage
                errors={errors}
                name={`colors.${index}.name`}
                render={({ message }) => (
                  <p className="text-red-500">{message}</p>
                )}
              />

              {index !== fields.length - 1 && (
                <button
                  type="button"
                  onClick={() => {
                    removeGeneral(index);
                    remove(index);
                  }}
                >
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

export default Second;
