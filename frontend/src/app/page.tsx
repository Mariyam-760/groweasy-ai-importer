/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { useState } from "react";
import UploadZone from "../components/UploadZone/UploadZone";
import PreviewTable from "../components/PreviewTable/PreviewTable";
import { CsvPreview } from "../types/csv";
import ImportButton from "../components/ImportButton/ImportButton";
import { importCsv } from "../services/import.service";

export default function Home() {
  const [preview, setPreview] = useState<CsvPreview | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleImport = async () => {
    if (!selectedFile) {
      alert("No file selected!");
      return;
    }

    alert("Sending CSV to backend...");

    try {
      const result = await importCsv(selectedFile);

      console.log(result);

      alert(`Parsed ${result.totalRows} rows successfully!`);
    } catch (error) {
      console.error(error);

      alert("Backend request failed!");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">

  <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 mb-5">
    🚀 AI Powered CRM Importer
  </div>

  <h1 className="text-6xl font-extrabold text-slate-900">
    GrowEasy
    <span className="text-blue-600"> AI</span>
  </h1>

  <p className="mt-5 text-xl text-slate-600 max-w-3xl mx-auto">
    Upload any CSV from Facebook Leads, Google Ads,
    Excel, Real Estate CRMs or Marketing Platforms.
    Our AI automatically maps your data into the
    GrowEasy CRM format.
  </p>

</div>

        {/* Upload Area */}
        <UploadZone
          onParsed={(preview, file) => {
            setPreview(preview);
            setSelectedFile(file);
          }}
        />

        {/* Preview */}
        {preview && (
  <>
    <PreviewTable
      headers={preview.headers}
      rows={preview.rows}
    />

    <ImportButton
      disabled={!preview}
      onImport={handleImport}
    />
  </>
)}
      </div>
    </main>
  );
}