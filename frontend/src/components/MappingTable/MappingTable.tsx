type Props = {
  mapping: Record<string, string | null>;
};

export default function MappingTable({ mapping }: Props) {
  return (
    <div className="mt-10 rounded-2xl bg-white p-8 shadow-xl border border-slate-200">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">🤖</span>

        <div>
          <h2 className="text-3xl font-bold text-slate-900">
            AI Field Mapping
          </h2>

          <p className="text-slate-500">
            Gemini mapped your CSV columns to CRM fields.
          </p>
        </div>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="py-4 text-left text-lg font-semibold text-slate-700">
              CSV Header
            </th>

            <th className="py-4 text-left text-lg font-semibold text-slate-700">
              CRM Field
            </th>
          </tr>
        </thead>

        <tbody>
          {Object.entries(mapping).map(([csv, crm]) => (
            <tr
              key={csv}
              className="border-b border-slate-100 hover:bg-slate-50 transition"
            >
              <td className="py-5 font-medium text-slate-800">
                {csv}
              </td>

              <td className="py-5">
                {crm ? (
                  <span className="rounded-full bg-blue-100 px-4 py-2 font-semibold text-blue-700">
                    {crm}
                  </span>
                ) : (
                  <span className="rounded-full bg-red-100 px-4 py-2 font-semibold text-red-600">
                    Not Mapped
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}