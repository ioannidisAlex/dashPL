import React from "react";
import { useJsonToCsv } from "react-json-to-csv";
import { useDashStore } from "../store";
import { Button } from "./Button";

export const ExportCSV = () => {
  const { saveAsCsv } = useJsonToCsv();
  // const filename = "values";
  // const fields = Object.keys(data[0]);
  const data = useDashStore((state) => state.sensorData.sensorAllData);

  useEffect(() => {
    if (isReccording) {
      setRecAppendedData([...recData, sensorAllData[sensorAllData.length - 1]]);
    }
  }, [isReccording, sensorAllData]);

  return <Button onClick={handleExport}>Download CSV</Button>;
};
