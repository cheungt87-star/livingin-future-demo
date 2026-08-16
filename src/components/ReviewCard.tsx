import { Star } from "lucide-react";
import { Card } from "./Card";
import { Badge } from "./Badge";

interface ReviewCardProps {
  alias: string;
  overallExperience: number;
  when: string;
  headline: string;
  whatWasGood: string;
  whatWasBad: string;
  unitTag: string;
}

export function ReviewCard({
  alias,
  overallExperience,
  when,
  headline,
  whatWasGood,
  whatWasBad,
  unitTag,
}: ReviewCardProps) {
  const stars = Math.floor(overallExperience);

  return (
    <Card>
      <div className="space-y-3">
        {/* Header: Alias + Badge */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-charcoal">{alias}</span>
          <Badge variant="green">Verified tenant</Badge>
        </div>

        {/* Unit tag chip */}
        <div className="inline-block px-2.5 py-1 rounded-full bg-gray-100 text-xs text-charcoal">
          {unitTag}
        </div>

        {/* Star row */}
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < stars ? "fill-coral text-coral" : "text-gray-300"}
            />
          ))}
        </div>

        {/* Headline */}
        <div className="text-sm font-semibold text-charcoal">{headline}</div>

        {/* What was good */}
        <div className="text-xs text-charcoal line-clamp-2 [-webkit-line-clamp:2] [-webkit-box-orient:vertical] display:[-webkit-box] overflow-hidden">
          <span>👍 {whatWasGood}</span>
        </div>

        {/* What was bad */}
        <div className="text-xs text-charcoal line-clamp-2 [-webkit-line-clamp:2] [-webkit-box-orient:vertical] display:[-webkit-box] overflow-hidden">
          <span>👎 {whatWasBad}</span>
        </div>

        {/* Date */}
        <div className="text-xs text-secondary">{when}</div>
      </div>
    </Card>
  );
}
