import { Flex, Input } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

export default function General({ second, ...rest }: any) {
     const {fields} = rest;
   
    const {
        control,
        trigger,
        formState: { errors },
    } = useFormContext();
  

   //const dataGeneral = watch().general;


  // console.log(dataGeneral)

    // useEffect(() => {
    //     console.log(dataGeneral)

    //     const data = general.map((item : any, key: number) => {
    //         return {
    //             ...item,
    //             variants: item.variants.map((i: any, k: any) => {
    //                  return Boolean(dataGeneral.length) && (dataGeneral[key]) ? Object.assign(dataGeneral[key].variants[k], i)  : i
    //             }),
    //         }
    //     })
    //     replace(general);
    // }, [JSON.stringify(dataGeneral), JSON.stringify(general)])
  

    // useEffect(() => {
    //     console.log(dataGeneral)
    // }, [JSON.stringify(dataGeneral)])
 
   // console.log(">>>", dataGeneral.general)

   
    //console.log('outside useEffect', dataGeneral)
   console.log('field in General', fields)
    return (<div className="relative overflow-x-auto border-[1px] sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-[#f6f6f6] dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3  text-center" >
                        Ảnh
                    </th>
                    
                    {second.length > 1 && <th scope="col" className="px-6 py-3  text-center" >
                        Phân loại
                    </th>}
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
                    <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-[#f6f6f6] dark:hover:bg-gray-600" >
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                            <Flex vertical align='center' justify='center' gap={10}>
                                {item.name}

                                <div style={{ height: '50px', width: '50px', overflow: 'hidden', boxShadow: 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem' }} className='border-none rounded-[12px]  ' >

                                    <div style={{ height: '100%', maxWidth: '100%' }} className='relative group'>
                                        <img src={item.image && URL.createObjectURL(item.image)} alt="" className='object-cover h-[100%] object-center' style={{ width: '100%' }} />

                                    </div>

                                </div>

                            </Flex>
                        </th>
                        <>
                         {second.length > 1 &&   <th className="px-6 py-4 text-center">
                                {item.variants.map((itemVariant: any, iVariant: number) => (
                                    <div key={iVariant} className="block py-5">
                                        {itemVariant.value}
                                    </div>
                                ))}

                            </th>}

                          




                            <td className="px-6 py-4">
                                {item.variants.map((_: any, iVariant: number) => (
                                    <div className="block py-3" key={iVariant} >
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
                                ))}

                            </td>

                            <td className="px-6 py-4">
                                {item.variants.map((_: any, iVariant: number) => (
                                    <div className="block py-3" key={iVariant} >
                                         <Controller
                                            name={`general.${index}.variants.${iVariant}.price`}
                                            control={control}
                                            render={({ field }) => (
                                                <Input
                                                    type="number"
                                                    placeholder="Enter price"
                                                    onChange={(e) => {
                                                        field.onChange(Number(e.target.value));
                                                        trigger();
                                                    }}
                                                    value={field.value}
                                                />
                                            )}
                                        />
                                    </div>
                                ))}
                            </td>
                            <td className="px-6 py-4">
                                {item.variants.map((_: any, iVariant: number) => (
                                    <div className="block py-3" key={iVariant} >
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
                                    </div>
                                ))}
                            </td>
                            <td className="px-6 py-4">
                                {item.variants.map((_: any, iVariant: number) => (
                                    <div className="block py-3" key={iVariant} >
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
                                    </div>
                                ))}
                            </td>



                        </>
                    </tr>
                ))}



            </tbody>
        </table>
    </div>)
}