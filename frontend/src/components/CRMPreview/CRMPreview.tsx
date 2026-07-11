type Props = {
  rows: Record<string, unknown>[];
};

export default function CRMPreview({ rows }: Props) {
  if (!rows.length) return null;

  const headers = Object.keys(rows[0]);

  return (
    <div className="mt-10 bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">📄</span>

        <div>
          <h2 className="text-3xl font-bold text-slate-900">
            CRM Preview
          </h2>

          <p className="text-slate-500">
            First 5 converted CRM records
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="min-w-full">
          <thead className="bg-slate-100">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-left font-semibold text-slate-700"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.slice(0, 5).map((row, index) => (
              <tr
                key={index}
                className="border-t hover:bg-slate-50"
              >
                {headers.map((header) => (
                  <td
                    key={header}
                    className="px-4 py-3 text-slate-700"
                  >
                    {String(row[header] ?? "-")}
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