import { Flex, Image, Input } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
export default function General({ second, ...rest }: any) {
  const { fields } = rest;

  const {
    control,
    trigger,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="relative overflow-x-auto border-[1px] sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-[#f6f6f6]">
          <tr>
            <th scope="col" className="px-6 py-3  text-center">
              Ảnh
            </th>

            {second.length > 1 && (
              <th scope="col" className="px-6 py-3  text-center">
                Phân loại
              </th>
            )}
            <th scope="col" className="px-6 py-3">
              Số lượng
            </th>
            <th scope="col" className="px-6 py-3">
              Giá
            </th>
            <th scope="col" className="px-6 py-3">
              Giá khuyến mãi
            </th>
            <th scope="col" className="px-6 py-3">
              SKU
            </th>
          </tr>
        </thead>
        <tbody>
          {fields.map((item: any, index: number) => (
            <tr key={item.id} className="bg-white border-b hover:bg-[#f6f6f6] ">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap  text-center"
              >
                <Flex vertical align="center" justify="center" gap={10}>
                  {item.name}

                  <div
                    style={{
                      height: "50px",
                      width: "50px",
                      overflow: "hidden",
                      boxShadow:
                        "rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem",
                    }}
                    className="border-none rounded-[12px]"
                  >
                    <div
                      style={{ height: "100%", maxWidth: "100%" }}
                      className="relative group"
                    >
                        <Image 
                          width={50}
                          height={50}
                          src={item.image && URL.createObjectURL(item.image)}
                          alt=""
                          className=""
                        />
                     
                    </div>
                  </div>
                </Flex>
              </th>
              <>
                {second.length > 1 && (
                  <th className="px-6 py-4 text-center">
                    {item.variants.map((itemVariant: any, iVariant: number) => (
                      <div key={iVariant} className="block py-5">
                        {itemVariant.value}
                      </div>
                    ))}
                  </th>
                )}

                <td className="px-6 py-4">
                  {item.variants.map((_: any, iVariant: number) => (
                    <div className="py-3 grid grid-cols-1 gap-3" key={iVariant}>
                        <div className="gird grid-cols-subgrid col-span-2">
                            <div className="">
                                    <Controller
                                    name={`general.${index}.variants.${iVariant}.quantity`}
                                    control={control}
                                    render={({ field }) => (
                                    <Input
                                        type="number"
                                        placeholder="Enter quantity"
                                        onChange={(e) => {
                                        field.onChange(Number(e.target.value));
                                        trigger();
                                        }}
                                        value={field.value}
                                    />
                                    )}
                                />
                            </div>
                    
                            <div>
                                <ErrorMessage
                                    errors={errors}
                                    name={`general.${index}.variants.${iVariant}.quantity`}
                                    render={({ message }) => (
                                    <p className="text-red-500">{message}</p>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                  ))}
                </td>

                <td className="px-6 py-4">
                  {item.variants.map((_: any, iVariant: number) => (
                    <div className="block py-3" key={iVariant}>
                        <div>
                             <div>

                             </div>
                             <div>

                             </div>
                        </div>
                   
                      <ErrorMessage
                        errors={errors}
                        name={`general.${index}.variants.${iVariant}.price`}
                        render={({ message }) => (
                          <p className="text-red-500">{message}</p>
                        )}
                      />
                    </div>
                  ))}
                </td>
                <td className="px-6 py-4">
                  {item.variants.map((_: any, iVariant: number) => (
                    <div className="block py-3" key={iVariant}>
                      <Controller
                        name={`general.${index}.variants.${iVariant}.price_sale`}
                        control={control}
                        render={({ field }) => (
                          <Input
                            type="number"
                            placeholder="Enter price sale"
                            onChange={(e) => {
                              field.onChange(Number(e.target.value));
                              trigger();
                            }}
                            value={field.value}
                          />
                        )}
                      />
                      <ErrorMessage
                        errors={errors}
                        name={`general.${index}.variants.${iVariant}.price_sale`}
                        render={({ message }) => (
                          <p className="text-red-500">{message}</p>
                        )}
                      />
                    </div>
                  ))}
                </td>
                <td className="px-6 py-4">
                  {item.variants.map((_: any, iVariant: number) => (
                    <div className="block py-3" key={iVariant}>
                      <Controller
                        name={`general.${index}.variants.${iVariant}.SKU`}
                        control={control}
                        render={({ field }) => (
                          <Input
                            type="text"
                            placeholder="Enter SKU"
                            onChange={(e) => {
                              field.onChange(e.target.value);
                              trigger();
                            }}
                            value={field.value}
                          />
                        )}
                      />
                      <ErrorMessage
                        errors={errors}
                        name={`general.${index}.variants.${iVariant}.SKU`}
                        render={({ message }) => (
                          <p className="text-red-500">{message}</p>
                        )}
                      />
                    </div>
                  ))}
                </td>
              </>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
