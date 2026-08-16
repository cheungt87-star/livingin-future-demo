import { ChevronRight, CheckCircle } from "lucide-react";
import { Avatar } from "./Avatar";
import { Badge } from "./Badge";

interface LandlordRowProps {
  initials: string;
  responseRate: number;
  buildingsListed: number;
  onTap?: () => void;
}

export function LandlordRow({ initials, responseRate, buildingsListed, onTap }: LandlordRowProps) {
  return (
    <button
      onClick={onTap}
      className="w-full flex items-center justify-between p-4 bg-white rounded-lg border border-border hover:bg-surface transition"
    >
      <div className="flex items-center gap-3 flex-1">
        <Avatar initials={initials} size="md" />
        <div className="text-left flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="green">Verified landlord</Badge>
            <CheckCircle size={14} className="text-teal-600" />
          </div>
          <div className="text-xs text-secondary">
            {buildingsListed} properties · {responseRate}% response rate
          </div>
        </div>
      </div>
      <ChevronRight size={20} className="text-secondary" />
    </button>
  );
}
