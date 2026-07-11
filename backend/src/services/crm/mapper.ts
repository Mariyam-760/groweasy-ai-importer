export function mapRowsToCRM(
  rows: Record<string, string>[],
  mapping: Record<string, string>
) {
  const crmRows: Record<string, string>[] = [];
  const skippedRows: Record<string, string>[] = [];

  for (const row of rows) {
    const crmRecord: Record<string, string> = {};

    for (const csvHeader in row) {
      const crmField = mapping[csvHeader];

      if (crmField) {
        crmRecord[crmField] = row[csvHeader];
      }
    }

    // Get mapped email & mobile
    const email = crmRecord.email?.trim();
    const mobile = crmRecord.mobile_without_country_code?.trim();

    // Skip if BOTH are missing
    if (!email && !mobile) {
      skippedRows.push(row);
      continue;
    }

    crmRows.push(crmRecord);
  }

  return {
    crmRows,
    skippedRows,
    totalImported: crmRows.length,
    totalSkipped: skippedRows.length,
  };
}