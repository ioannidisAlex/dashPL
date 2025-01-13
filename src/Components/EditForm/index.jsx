import { useState } from "react";
import { AddIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useFormContext } from 'react-hook-form';
import { Button } from "../Button";
import { setDialogState } from "../../store";
import { setDefaultOptions } from "date-fns";

function EditForm({onClickOfItsButton, setTitle, setDescription}) {
  const { register, handleSubmit, formState: { errors }, control } = useFormContext()

  const onSubmit = (data) => {
    console.log(data);
    setTitle(data.title);
    setDescription(data.description);
    setDialogState(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="select-none space-y-4">
      <div className="flex flex-col">
        <label className="mb-2 font-semibold">Title</label>
        <input
          {...register("title", { required: "Title is required" })}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.title && <span className="text-red-500">{errors.title.message}</span>}
      </div>
      <div className="flex flex-col">
        <label className="mb-2 font-semibold">Description</label>
        <input
          {...register("description")} // Fixed typo here
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit" label="Save" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" />
      </div>   
    </form>
  );
}

export default EditForm;