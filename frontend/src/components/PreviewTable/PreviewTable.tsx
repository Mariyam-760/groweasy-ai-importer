type Props = {
  headers: string[];
  rows: Record<string, string>[];
};

export default function PreviewTable({
  headers,
  rows,
}: Props) {
  return (
    <div className="mt-10 bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">

      <div className="flex items-center justify-between px-8 py-6 border-b">

        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            CSV Preview
          </h2>

          <p className="text-slate-500 mt-1">
            {rows.length} Records • {headers.length} Columns
          </p>
        </div>

        <div className="bg-blue-100 text-blue-700 font-semibold px-4 py-2 rounded-xl">
          Ready for AI Import
        </div>

      </div>

      <div className="overflow-auto max-h-[500px]">

        <table className="min-w-full">

          <thead className="sticky top-0 bg-slate-900 text-white">

            <tr>

              {headers.map((header) => (
                <th
                  key={header}
                  className="px-6 py-4 text-left whitespace-nowrap"
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
                className="border-b hover:bg-slate-50 transition"
              >

                {headers.map((header) => (

                  <td
                    key={header}
                    className="px-6 py-4 whitespace-nowrap text-slate-700"
                  >
                    {row[header]}
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