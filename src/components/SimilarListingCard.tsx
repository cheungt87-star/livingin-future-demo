import { Star } from "lucide-react";

interface SimilarListingCardProps {
  image: string;
  name: string;
  rating: number;
  rentMin: number;
  rentMax: number;
}

export function SimilarListingCard({ image, name, rating, rentMin, rentMax }: SimilarListingCardProps) {
  const stars = Math.floor(rating);

  return (
    <button className="flex-shrink-0 w-56 bg-white rounded-lg border border-border overflow-hidden hover:shadow-md transition">
      {/* Image */}
      <div className="h-40 overflow-hidden bg-gray-200">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="p-3 space-y-2">
        <div className="font-medium text-charcoal text-sm line-clamp-1">{name}</div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < stars ? "fill-coral text-coral" : "text-gray-300"}
              />
            ))}
          </div>
          <span className="font-mono text-xs text-charcoal font-semibold">{rating.toFixed(1)}</span>
        </div>

        {/* Rent range */}
        <div className="font-mono text-xs text-secondary">
          AED {Math.floor(rentMin / 1000)}k – {Math.floor(rentMax / 1000)}k/yr
        </div>
      </div>
    </button>
  );
}
