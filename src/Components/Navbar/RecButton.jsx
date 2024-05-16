import React, { useEffect } from "react";
import { setRecordButtonState, setRecAppendedData, setClearRecData, useDashStore } from "../../store";
import { Icon } from "@chakra-ui/react";
import { Button } from "../Button";
import { ExportCSV } from "../ExportCsv";

export const RecButton = () => {
  const { isRecording, recData } = useDashStore((state) => state.recInfo);
  const { newData } = useDashStore((state) => state.sensorData);

  useEffect(() => {
    console.log("newData", newData )
    if (isRecording) {
      setRecAppendedData(newData);
    }
  }, [newData]);

  return (
    <>
      { (isRecording || recData.length == 0) ? (
        <div
          className="mr-1 cursor-pointer  px-2 py-1 bg-black rounded-xl flex items-center justify-center"
          onClick={() => {
            setRecordButtonState(!isRecording);
          }}
        >
          {isRecording ? (
            <>
              <Icon viewBox="0 0 200 200" color="white">
                <rect fill="white" x="20" y="20" width="60" height="160" />
                <rect fill="white" x="124" y="20" width="60" height="160" />
              </Icon>
            </>
          ) : (
            <Icon viewBox="0 0 200 200" color="red">
              <path
                fill="currentColor"
                d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
              />
            </Icon>
          )}
        </div>
      ) : (
        <div className="flex">
          <Button
            label="Clear"
            onClick={() => {
              setClearRecData();
            }}
          />
          <ExportCSV/>
        </div>
      )}
    </>
  );
};
