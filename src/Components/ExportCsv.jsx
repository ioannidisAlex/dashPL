import React from "react";
import { Button } from "./Button";
import { useJsonToCsv } from "react-json-csv";
import { useDashStore } from "../store";

export const ExportCSV = () => {
  const { saveAsCsv } = useJsonToCsv();
  const kata = useDashStore((state) => state.recInfo.recData);
  const filename = "valuesOfSensor";
  const fields = { name: "Timestamp", val: "Humidity"};

  return (
    <Button label="Download Csv" onClick={() => saveAsCsv({
      data: kata.map((d) => {
        return {
          name: d.uv.toString().replace(/,/g, ' of'),
          val: d.pv,
        };
      }),
      fields: fields,
      filename: filename,
    })}>ALef</Button>
  );
};