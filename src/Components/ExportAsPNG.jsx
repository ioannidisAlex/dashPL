import React from "react";
import { Button } from "./Button";
import domtoimage from "dom-to-image";
import FileSaver from "file-saver";

export const ExportAsPNG = ({ elementRef, fileName = "exported-image" }) => {
  const handleExport = () => {
    if (elementRef?.current) {    
      domtoimage.toBlob(elementRef.current)
        .then((blob) => {
          FileSaver.saveAs(blob, `${fileName}.png`);
        })
        .catch((error) => {
          console.error("Error exporting PNG:", error);
        });
    } else {
      console.error("No elementRef provided or the ref is not attached.");
    }
  };

  return (
    <Button
      label="Image"
      onClick={handleExport}
      className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
    >
      Save as PNG
    </Button>
  );
};