import { PlusOutlined } from '@ant-design/icons';

import { Image, Input, Upload } from 'antd';
import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from 'react-hook-form';

const Second = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    trigger,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'colors',
  });

  const colorsCurrent = useWatch({
    control,
    name: 'colors',
  });

  const onSubmit = (data: any) => {
    console.log('submit >>', data);
  };
  const onChangeFile = (file: any, index: any) => {
    const newData = {
      image: file.originFileObj,
      name: colorsCurrent[index].name,
    };
    update(index, newData);
    trigger();
  };
  const handleAddField = (id: string) => {
 
    if(id == fields[fields.length - 1].id){
        append({ image: null, name: '' });
    }
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
                  onChangeFile(file, index);
                  handleAddField(item.id);
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
                    style={{ border: 0, background: 'none' }}
                    type="button"
                  >
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </button>
                )}
              </Upload>
              {errors.colors && errors.colors[index] && (
                <span className="text-red-500">
                  {errors?.colors[index]?.image?.message}
                </span>
              )}
              <Controller
                name={`colors.${index}.name`}
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    placeholder="Enter name"
                    onChange={(e) => {
                        field.onChange(e.target.value);
                        handleAddField(item.id);
                        trigger();
                      }}
                    value={field.value}
                  />
                  
                )}
              />
              {errors?.colors && errors?.colors[index] && (
                <span className="text-red-500">
                  {errors?.colors[index]?.name?.message}
                </span>
              )}

{index !==  fields.length - 1 && <button type="button" onClick={() => remove(index)}>
                Remove
              </button>}
            </div>
          ))}
        </div>

      
      </form>
    
    </>
  );
};


export default Second;