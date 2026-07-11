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

  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [activeTab, setActiveTab] = useState<
    "preview" | "mapping" | "crm" | "summary"
  >("preview");

  const handleImport = async () => {
    if (!selectedFile) {
      setErrorMessage("Please select a CSV file.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const result = await importCsv(selectedFile);

      setImportResult(result);

      // Automatically open Mapping tab
      setActiveTab("mapping");
    } catch (error: unknown) {
      console.error(error);

      type ImportError = {
        response?: {
          data?: {
            message?: string;
          };
        };
        request?: unknown;
      };

      const importError = error as ImportError;

      if (importError.response) {
        setErrorMessage(
          importError.response.data?.message ??
            "Server failed while processing CSV."
        );
      } else if (importError.request) {
        setErrorMessage(
          "Unable to reach backend server."
        );
      } else {
        setErrorMessage(
          "Unexpected error occurred."
        );
      }
    } finally {
      setLoading(false);
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
            Upload any CSV from Facebook Leads,
            Google Ads, Excel, Real Estate CRMs
            or Marketing Platforms.

            Our AI automatically maps your data
            into the GrowEasy CRM format.
          </p>

        </div>

        {/* Upload */}

        <UploadZone
          onParsed={(preview, file) => {
            setPreview(preview);
            setSelectedFile(file);

            setImportResult(null);
            setErrorMessage("");

            setActiveTab("preview");
          }}
        />

        {preview && (
          <>

            <Tabs
              activeTab={activeTab}
              onChange={setActiveTab}
            />

            {/* Preview */}

            {activeTab === "preview" && (
              <PreviewTable
                headers={preview.headers}
                rows={preview.rows}
              />
            )}

            {/* Mapping */}

            {activeTab === "mapping" &&
              importResult && (
                <MappingTable
                  mapping={importResult.mapping}
                />
              )}

            {/* CRM */}

            {activeTab === "crm" &&
              importResult && (
                <CRMPreview
                  rows={importResult.crmRows}
                />
              )}

            {/* Summary */}

            {activeTab === "summary" &&
              importResult && (
                <ImportSummary
                  totalRows={importResult.totalRows}
                  totalImported={
                    importResult.totalImported
                  }
                  totalSkipped={
                    importResult.totalSkipped
                  }
                />
              )}

            {/* Error */}

            {errorMessage && (
              <div className="mt-8 rounded-xl border border-red-300 bg-red-50 p-4 text-red-700">
                ❌ {errorMessage}
              </div>
            )}

            {/* Button */}

            <div className="mt-8">

              <ImportButton
                disabled={!preview || loading}
                onImport={handleImport}
              />

              {loading && (
                <div className="mt-6 flex items-center justify-center gap-3 rounded-xl bg-blue-50 p-5">

                  <div className="h-6 w-6 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

                  <span className="text-lg font-semibold text-blue-700">
                    AI is analyzing your CSV...
                  </span>

                </div>
              )}

            </div>

          </>
        )}

      </div>
    </main>
  );
}