/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import UploadZone from "../components/UploadZone/UploadZone";
import PreviewTable from "../components/PreviewTable/PreviewTable";
import { CsvPreview } from "../types/csv";
import ImportButton from "../components/ImportButton/ImportButton";

export default function Home() {
  const [preview, setPreview] = useState<CsvPreview | null>(null);
  const handleImport = () => {
  alert("Next step: This will send the CSV to the backend.");
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
        <UploadZone onParsed={setPreview} />

        {/* Preview */}
        {preview && (
  <ImportButton
    disabled={!preview}
    onImport={handleImport}
  />
)}
      </div>
    </main>
  );
}