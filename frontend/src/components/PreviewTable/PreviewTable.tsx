type Props = {
  headers: string[];
  rows: Record<string, string>[];
};

export default function PreviewTable({ headers, rows }: Props) {
  return (
    <div className="mt-8 bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            CSV Preview
          </h2>
          <p className="text-sm text-slate-500">
            {rows.length} Records • {headers.length} Columns
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto max-h-125">
        <table className="min-w-full text-sm">
          <thead className="sticky top-0 bg-slate-100">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-left font-semibold text-slate-700 border-b whitespace-nowrap"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr
                key={index}
                className="hover:bg-blue-50 transition"
              >
                {headers.map((header) => (
                  <td
                    key={header}
                    className="px-4 py-3 border-b text-slate-700 whitespace-nowrap"
                  >
                    {row[header] || "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}