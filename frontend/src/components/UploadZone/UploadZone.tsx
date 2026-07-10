"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";
import { parseCsv } from "../../services/csv.service";
import { CsvPreview } from "../../types/csv";

type Props = {
  onParsed: (data: CsvPreview) => void;
};

export default function UploadZone({ onParsed }: Props) {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!acceptedFiles.length) return;

      try {
        const parsed = await parseCsv(acceptedFiles[0]);
        onParsed(parsed);
      } catch (err) {
        console.error(err);
        alert("Failed to parse CSV.");
      }
    },
    [onParsed]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "text/csv": [".csv"],
    },
    multiple: false,
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      className={`
        bg-white
        rounded-2xl
        shadow-lg
        border-2
        border-dashed
        p-12
        text-center
        cursor-pointer
        transition-all
        ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-slate-300 hover:border-blue-500"
        }
      `}
    >
      <input {...getInputProps()} />

      <UploadCloud
        size={70}
        className="mx-auto text-blue-600 mb-5"
      />

      <h2 className="text-3xl font-bold text-slate-800">
        Upload CSV
      </h2>

      <p className="text-slate-500 mt-3">
        Drag & Drop your CSV here
      </p>

      <p className="my-5 text-slate-400">OR</p>

      <button
        type="button"
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold"
      >
        Choose File
      </button>
    </div>
  );
}