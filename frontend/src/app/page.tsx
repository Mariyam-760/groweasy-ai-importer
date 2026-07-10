import UploadZone from "../components/UploadZone/UploadZone";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-5xl p-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          GrowEasy AI CSV Importer
        </h1>

        <UploadZone />
      </div>
    </main>
  );
}