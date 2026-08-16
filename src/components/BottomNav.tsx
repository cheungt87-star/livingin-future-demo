import { Home, Bookmark, FileText, User } from "lucide-react";

interface BottomNavProps {
  activeTab?: string;
}

export function BottomNav({ activeTab = "home" }: BottomNavProps) {
  const tabs = [
    { id: "home", icon: Home, label: "Home" },
    { id: "shortlist", icon: Bookmark, label: "My shortlist" },
    { id: "contracts", icon: FileText, label: "My contracts" },
    { id: "profile", icon: User, label: "My profile" },
  ];

  return (
    <div
      className="border-t border-border bg-white flex justify-around"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {tabs.map((tab) => {
        const IconComponent = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => {
              /* Dummy buttons - no navigation yet */
            }}
            className={`
              flex-1 py-3 px-2 flex flex-col items-center gap-1 transition
              ${
                isActive
                  ? "text-coral border-t-2 border-coral -mt-1"
                  : "text-slate hover:text-charcoal"
              }
            `}
          >
            <IconComponent size={24} />
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
