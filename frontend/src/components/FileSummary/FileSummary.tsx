// type Props = {
//   fileName: string;
//   totalRows: number;
//   totalColumns: number;
// };

// export default function FileSummary({
//   fileName,
//   totalRows,
//   totalColumns,
// }: Props) {
//   return (
//     <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 mb-8">

//       <div className="flex items-center justify-between flex-wrap gap-6">

//         <div>
//           <p className="text-sm text-slate-500">
//             Uploaded File
//           </p>

//           <h2 className="text-2xl font-bold text-slate-900 mt-1">
//             📄 {fileName}
//           </h2>

//           <p className="text-green-600 font-medium mt-2">
//             ✓ File uploaded successfully
//           </p>
//         </div>

//         <div className="flex gap-4">

//           <div className="bg-blue-50 rounded-2xl px-6 py-4 text-center">
//             <p className="text-3xl font-bold text-blue-600">
//               {totalRows}
//             </p>

//             <p className="text-sm text-slate-500">
//               Records
//             </p>
//           </div>

//           <div className="bg-indigo-50 rounded-2xl px-6 py-4 text-center">
//             <p className="text-3xl font-bold text-indigo-600">
//               {totalColumns}
//             </p>

//             <p className="text-sm text-slate-500">
//               Columns
//             </p>
//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }