interface RatingDistributionBarProps {
  distribution: Array<{ stars: number; count: number }>;
  neighbourhoodDistribution?: Array<{ stars: number; count: number }>;
}

export function RatingDistributionBar({
  distribution,
  neighbourhoodDistribution
}: RatingDistributionBarProps) {
  // Sort by stars descending (5, 4, 3, 2, 1)
  const sorted = [...distribution].sort((a, b) => b.stars - a.stars);
  const neighbourhoodSorted = neighbourhoodDistribution
    ? [...neighbourhoodDistribution].sort((a, b) => b.stars - a.stars)
    : null;

  const allCounts = sorted.map(d => d.count);
  if (neighbourhoodSorted) {
    allCounts.push(...neighbourhoodSorted.map(d => d.count));
  }
  const maxCount = Math.max(...allCounts, 1);

  return (
    <div className="space-y-2 py-4">
      {/* Legend */}
      {neighbourhoodSorted && (
        <div className="flex gap-4 text-xs mb-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-1 bg-coral rounded-full" />
            <span className="text-charcoal">This building</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-1 bg-gray-300 rounded-full" />
            <span className="text-secondary">Neighbourhood avg</span>
          </div>
        </div>
      )}

      {/* Distribution bars */}
      {sorted.map(({ stars, count }) => {
        const neighbourhoodCount = neighbourhoodSorted
          ?.find(d => d.stars === stars)?.count || 0;

        return (
          <div key={stars} className="flex items-center gap-2">
            <span className="text-xs text-secondary w-6">{stars}</span>
            <div className="h-2 flex-1 bg-gray-100 rounded-full overflow-hidden relative">
              {/* Neighbourhood background bar */}
              {neighbourhoodCount > 0 && (
                <div
                  className="h-full bg-gray-300 absolute"
                  style={{ width: `${(neighbourhoodCount / maxCount) * 100}%` }}
                />
              )}
              {/* Building bar on top */}
              <div
                className="h-full bg-coral transition-all relative"
                style={{ width: `${(count / maxCount) * 100}%` }}
              />
            </div>
            <span className="text-xs text-charcoal font-semibold w-8 text-right">{count}</span>
          </div>
        );
      })}
    </div>
  );
}
