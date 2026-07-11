export function mapRowsToCRM(
  rows: Record<string, string>[],
  mapping: Record<string, string>
) {
  return rows.map((row) => {
    const crmRecord: Record<string, string> = {};

    for (const csvHeader in row) {
      const crmField = mapping[csvHeader];

      if (crmField) {
        crmRecord[crmField] = row[csvHeader];
      }
    }

    return crmRecord;
  });
}