export interface CsvRow {
  [key: string]: string;
}

export interface CsvPreview {
  headers: string[];
  rows: CsvRow[];
}