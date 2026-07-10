"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";

export default function UploadZone() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      console.log("Uploaded File:", acceptedFiles[0]);
    }
  }, []);

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
      className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all
      ${
        isDragActive
          ? "border-blue-600 bg-blue-50"
          : "border-gray-300 hover:border-blue-500"
      }`}
    >
      <input {...getInputProps()} />

      <UploadCloud
        className="mx-auto mb-4 text-blue-600"
        size={55}
      />

      <h2 className="text-2xl font-bold mb-2">
        Upload CSV
      </h2>

      <p className="text-gray-600">
        Drag & Drop your CSV here
      </p>

      <p className="my-4 text-gray-400">OR</p>

      <button
        type="button"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Choose File
      </button>
    </div>
  );
}