import fs from "fs";
import csvParser from "csv-parser";

// Utility function to read CSV files with pagination
export const readCSVWithPagination = (
  filePath: string,
  limit: number,
  offset: number,
  filterByShipmentStatus?: string
): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const results: any[] = [];
    let lineCount = 0;
    let recordCount = 0;

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (data) => {
        if (lineCount >= offset && recordCount < limit) {
          if (
            !filterByShipmentStatus ||
            data.shipment_status === filterByShipmentStatus
          ) {
            results.push(data);
            recordCount++;
          }
        }
        lineCount++;
      })
      .on("end", () => resolve(results))
      .on("error", (err) => reject(err));
  });
};
