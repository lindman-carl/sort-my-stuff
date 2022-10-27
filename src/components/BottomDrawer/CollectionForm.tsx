import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IoIosHelpCircle } from "react-icons/io";

type CollectionFormProps = {
  submit: (data: Inputs) => void;
};

type Inputs = {
  name: string;
};

const CollectionForm: React.FC<CollectionFormProps> = ({ submit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => submit(data);

  // watch input
  // console.log(watch("name"));

  return (
    <div className="flex flex-col w-full justify-start items-center">
      <span className="w-full text-center text-xl font-semibold mt-4">
        New collection
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
            placeholder="Collection name"
            {...register("name", { required: true })}
            className="w-full min-h-[3rem] text-xl p-2 border-2 border-purple-600 rounded"
          />
          <span className="text-sm text-red-600 ml-1">
            {errors.name ? <>Name is required</> : <>&nbsp;</>}
          </span>
        </label>
        <input
          type="submit"
          value="ADD COLLECTION"
          className="w-full h-12 mb-4 rounded-lg bg-purple-600 text-white font-bold text-lg cursor-pointer"
        />
      </form>
    </div>
  );
};

export default CollectionForm;
