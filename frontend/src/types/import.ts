export interface ImportResult {
  success: boolean;
  totalRows: number;
  mapping: Record<string, string>;
  crmRows: Record<string, string>[];
}