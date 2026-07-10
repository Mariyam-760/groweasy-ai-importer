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
    <main className="min-h-screen bg-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-slate-900">
            GrowEasy AI CSV Importer
          </h1>

          <p className="mt-3 text-lg text-slate-600">
            Import CRM Leads from Any CSV using AI
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