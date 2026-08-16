import { Star } from "lucide-react";

interface RatingHeroProps {
  rating: number;
  reviewCount: number;
  likelihoodToRecommend: number;
  valueForMoney: number;
  mostRecentReviewLabel: string;
  onReviewsClick?: () => void;
}

export function RatingHero({
  rating,
  reviewCount,
  likelihoodToRecommend,
  valueForMoney,
  mostRecentReviewLabel,
  onReviewsClick,
}: RatingHeroProps) {
  const stars = Math.floor(rating);

  return (
    <div className="py-6">
      {/* Main rating section */}
      <div className="flex items-start gap-4 mb-4">
        {/* Large rating number */}
        <div className="font-mono text-4xl font-bold text-charcoal">{rating.toFixed(1)}</div>

        {/* Stars and review count */}
        <div className="flex-1 pt-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={i < stars ? "fill-coral text-coral" : "text-gray-300"}
                />
              ))}
            </div>
            <button
              onClick={onReviewsClick}
              className="text-sm font-medium text-coral-dark hover:underline"
            >
              {reviewCount} reviews
            </button>
          </div>

          {/* Stat chips row */}
          <div className="flex gap-3 mb-3">
            <div className="flex-1 flex items-center justify-between text-xs">
              <span className="text-secondary">Likelihood to recommend</span>
              <span className="font-mono font-semibold text-charcoal">{likelihoodToRecommend.toFixed(1)}/5</span>
            </div>
            <div className="flex-1 flex items-center justify-between text-xs">
              <span className="text-secondary">Value for money</span>
              <span className="font-mono font-semibold text-charcoal">{valueForMoney.toFixed(1)}/5</span>
            </div>
          </div>

          {/* Metadata caption */}
          <div className="text-xs text-secondary">
            Most recent review: {mostRecentReviewLabel}
          </div>
        </div>
      </div>
    </div>
  );
}
