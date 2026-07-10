import Papa from "papaparse";
import { CsvPreview } from "../types/csv";

export function parseCsv(file: File): Promise<CsvPreview> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,

      complete: (results) => {
        resolve({
          headers: results.meta.fields ?? [],
          rows: results.data as Record<string, string>[],
        });
      },

      error: (error) => {
        reject(error);
      },
    });
  });
}