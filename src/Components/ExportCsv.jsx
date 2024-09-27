import React from "react";
import { Button } from "./Button";
import { useJsonToCsv } from "react-json-csv";
import { useDashStore } from "../store";

export const ExportCSV = () => {
  const { saveAsCsv } = useJsonToCsv();
  const kata = useDashStore((state) => state.recInfo.recData);
  const filename = "values";
  const fields = { "name": "N", "val": "Temp"};

  return (
    <Button label="Download Csv" onClick={() => saveAsCsv({
      data: kata.map((d) => {
        return {
          name: d.name,
          val: d.val,
        };
      }),
      fields: fields,
      filename: filename,
    })}>ALef</Button>
  );
};