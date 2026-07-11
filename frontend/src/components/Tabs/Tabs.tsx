type Tab = "preview" | "mapping" | "crm" | "summary";

type Props = {
  activeTab: Tab;
  onChange: (tab: Tab) => void;
};

export default function Tabs({ activeTab, onChange }: Props) {
  const tabs = [
  { id: "preview", label: "📄 Preview" },
  { id: "mapping", label: "🤖 AI Mapping" },
  { id: "crm", label: "🏢 CRM Preview" },
  { id: "summary", label: "📊 Summary" },
] as const;
 

  return (
    <div className="mt-8 mb-8 flex flex-wrap gap-3 rounded-2xl bg-white p-3 shadow-lg">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`rounded-xl px-6 py-3 font-semibold transition-all ${
            activeTab === tab.id
              ? "bg-blue-600 text-white shadow-md"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}