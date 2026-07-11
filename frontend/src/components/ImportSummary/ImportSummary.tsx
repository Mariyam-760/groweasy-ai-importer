interface Props {
  totalRows: number;
  totalImported: number;
  totalSkipped: number;
}

export default function ImportSummary({
  totalRows,
  totalImported,
  totalSkipped,
}: Props) {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="rounded-xl bg-blue-100 p-6 text-center shadow">
        <h3 className="text-lg font-semibold text-blue-700">
          Total Rows
        </h3>

        <p className="mt-2 text-4xl font-bold text-blue-900">
          {totalRows}
        </p>
      </div>

      <div className="rounded-xl bg-green-100 p-6 text-center shadow">
        <h3 className="text-lg font-semibold text-green-700">
          Imported
        </h3>

        <p className="mt-2 text-4xl font-bold text-green-900">
          {totalImported}
        </p>
      </div>

      <div className="rounded-xl bg-red-100 p-6 text-center shadow">
        <h3 className="text-lg font-semibold text-red-700">
          Skipped
        </h3>

        <p className="mt-2 text-4xl font-bold text-red-900">
          {totalSkipped}
        </p>
      </div>
    </div>
  );
}