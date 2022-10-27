import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IoIosHelpCircle } from "react-icons/io";

// types
import { Collection } from "@prisma/client";

type UnitFormProps = {
  submit: (data: Inputs) => void;
  collections: Collection[];
};

type Inputs = {
  name: string;
  collectionId: string;
};

const UnitForm: React.FC<UnitFormProps> = ({ submit, collections }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  // const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  const onSubmit: SubmitHandler<Inputs> = (data) => submit(data);

  // watch input
  // console.log(watch("name"));

  return (
    <div className="flex flex-col w-full justify-start items-center">
      <span className="w-full text-center text-xl font-semibold mt-4">
        New unit
      </span>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-4/6  flex flex-col justify-start"
      >
        <label className="mb-2">
          <span className="w-32 flex justify-between items-center font-medium text-base ml-1">
            Name
            <IoIosHelpCircle color={"blueviolet"} size={22} className="ml-2" />
          </span>
          <input
            placeholder="Unit name"
            {...register("name", { required: true })}
            className="w-full min-h-[3rem] text-xl p-2 border-2 border-purple-600 rounded"
          />
          <span className="text-sm text-red-600 ml-1">
            {errors.name ? <>Name is required</> : <>&nbsp;</>}
          </span>
        </label>
        <label className="mb-2">
          <span className="w-32 flex justify-between items-center font-medium text-base ml-1">
            Collection
            <IoIosHelpCircle color={"blueviolet"} size={22} className="ml-2" />
          </span>
          <select
            className="w-full min-h-[3rem] p-2 text-xl border-2 border-purple-600 rounded"
            {...register("collectionId", { required: true })}
          >
            {collections.map((el) => (
              <option key={el.id} value={el.id}>
                {el.name}
              </option>
            ))}
          </select>
          <span className="text-sm text-red-600 ml-1">
            {errors.collectionId ? <>Collection is required</> : <>&nbsp;</>}
          </span>
        </label>
        <input
          type="submit"
          value="ADD UNIT"
          className="w-full h-12 mb-4 rounded-lg bg-purple-600 text-white font-bold text-lg cursor-pointer"
        />
      </form>
    </div>
  );
};

export default UnitForm;
