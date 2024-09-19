import { useState } from "react";
import { AddIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useFormContext } from 'react-hook-form';
import { Button } from "../Button";
import { setDialogState } from "../../store";

function EditForm({onClickOfItsButton}) {
  const { register, handleSubmit, control } = useFormContext()

  const onSubmit = (data) => {
    console.log(data);
    setDialogState(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="select-none">
      <input {...register("name")} />
      <input type="number" {...register("age")} />
      <input type="submit" />
    </form>
  );
}

export default EditForm;