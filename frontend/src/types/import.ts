export interface ImportResult {
  success: boolean;
  totalRows: number;
  totalImported: number;
  totalSkipped: number;
  mapping: Record<string, string>;
  crmRows: Record<string, string>[];
  skippedRows: Record<string, string>[];
}