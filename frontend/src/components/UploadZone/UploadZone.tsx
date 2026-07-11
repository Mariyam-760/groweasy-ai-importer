"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";
import { parseCsv } from "../../services/csv.service";
import { CsvPreview } from "../../types/csv";

type Props = {
  onParsed: (preview: CsvPreview, file: File) => void;
};

export default function UploadZone({ onParsed }: Props) {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!acceptedFiles.length) return;

      try {
        const parsed = await parseCsv(acceptedFiles[0]);
        onParsed(parsed, acceptedFiles[0]);
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
      rounded-3xl
      border-2
      border-dashed
      shadow-xl
      p-12
      cursor-pointer
      transition-all
      duration-300
      ${
        isDragActive
          ? "border-blue-500 bg-blue-50 scale-[1.02]"
          : "border-slate-300 hover:border-blue-500 hover:shadow-2xl"
      }
    `}
  >
    <input {...getInputProps()} />

    <div className="flex flex-col items-center">

      <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-6">
        <UploadCloud
          size={48}
          className="text-blue-600"
        />
      </div>

      <h2 className="text-3xl font-bold text-slate-800">
        Upload your CSV
      </h2>

      <p className="mt-3 text-slate-500 text-center max-w-xl">
        Drag & Drop your CSV file here or click below to browse.
      </p>

      <button
        type="button"
        className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition"
      >
        Browse CSV
      </button>

      <div className="mt-8 text-center">
        <p className="text-sm text-slate-500">
          Supports any valid CSV format with AI-powered field mapping.
        </p>
      </div>
    </div>
  </div>
  );
}
