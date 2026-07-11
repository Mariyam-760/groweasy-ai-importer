"use client";

import { useState } from "react";

import UploadZone from "../components/UploadZone/UploadZone";
import PreviewTable from "../components/PreviewTable/PreviewTable";
import ImportButton from "../components/ImportButton/ImportButton";
// import FileSummary from "../components/FileSummary/FileSummary";
import MappingTable from "../components/MappingTable/MappingTable";
import CRMPreview from "../components/CRMPreview/CRMPreview";
import Tabs from "../components/Tabs/Tabs";
import ImportSummary from "../components/ImportSummary/ImportSummary";

import { CsvPreview } from "../types/csv";
import { ImportResult } from "../types/import";

import { importCsv } from "../services/import.service";

export default function Home() {
  const [preview, setPreview] = useState<CsvPreview | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [importResult, setImportResult] =
    useState<ImportResult | null>(null);

  const [activeTab, setActiveTab] = useState<
    "preview" | "mapping" | "crm" | "summary"
  >("preview");

  const handleImport = async () => {
    if (!selectedFile) {
      alert("No file selected!");
      return;
    }

    try {
      const result = await importCsv(selectedFile);

      setImportResult(result);

      // Automatically switch to AI Mapping after import
      setActiveTab("mapping");
    } catch (error) {
      console.error(error);
      alert("Backend request failed!");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* ---------------- Header ---------------- */}

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

        {/* ---------------- Upload ---------------- */}

        <UploadZone
          onParsed={(preview, file) => {
            setPreview(preview);
            setSelectedFile(file);

            // Reset previous import
            setImportResult(null);

            // Return to Preview tab
            setActiveTab("preview");
          }}
        />

        {/* ---------------- File Summary ---------------- */}

        {preview && (
          <>
            {/* <FileSummary
              fileName={selectedFile?.name ?? ""}
              totalRows={preview.rows.length}
              totalColumns={preview.headers.length}
            /> */}

            {/* ---------------- Tabs ---------------- */}

            <Tabs
              activeTab={activeTab}
              onChange={setActiveTab}
            />

            {/* ---------------- Preview ---------------- */}

            {activeTab === "preview" && (
              <PreviewTable
                headers={preview.headers}
                rows={preview.rows}
              />
            )}

            {/* ---------------- AI Mapping ---------------- */}

            {activeTab === "mapping" && importResult && (
              <MappingTable
                mapping={importResult.mapping}
              />
            )}

            {/* ---------------- CRM Preview ---------------- */}

            {activeTab === "crm" && importResult && (
              <CRMPreview
                rows={importResult.crmRows}
              />
            )}

            {/* ---------------- Summary ---------------- */}

            {activeTab === "summary" && importResult && (
              <ImportSummary
                totalRows={importResult.totalRows}
                totalImported={importResult.totalImported}
                totalSkipped={importResult.totalSkipped}
              />
            )}

            {/* ---------------- Button ---------------- */}

            <div className="mt-8">
              <ImportButton
                disabled={!preview}
                onImport={handleImport}
              />
            </div>

          </>
        )}

      </div>
    </main>
  );
}