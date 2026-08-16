import { useState } from "react";
import { Bed, Bath, Square, Home, Calendar } from "lucide-react";
import { ImageCarousel } from "./components/ImageCarousel";
import { RatingHero } from "./components/RatingHero";
import { CategoryRatingGrid } from "./components/CategoryRatingGrid";
import { RatingDistributionBar } from "./components/RatingDistributionBar";
import { ReviewCard } from "./components/ReviewCard";
import { LandlordRow } from "./components/LandlordRow";
import { LandlordSheet } from "./components/LandlordSheet";
import { SubHeading } from "./components/SubHeading";
import { SimilarListingCard } from "./components/SimilarListingCard";
import { Button } from "./components/Button";
import { CONTENT } from "./content";

interface ListingProps {
  onArrangeViewing: () => void;
}

export function Listing({ onArrangeViewing }: ListingProps) {
  const [isLandlordSheetOpen, setIsLandlordSheetOpen] = useState(false);

  const listing = CONTENT.listing;
  const landlord = CONTENT.landlord;
  const property = CONTENT.property;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="w-full max-w-sm mx-auto bg-surface flex flex-col h-screen">
        {/* Main scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {/* Image carousel */}
          <ImageCarousel
            officialImages={listing.officialImages}
            communityImages={listing.communityImages}
          />

          {/* Content area */}
          <div className="px-4 py-6 space-y-6">
            {/* Rating hero */}
            <RatingHero
              rating={listing.overallExperience}
              reviewCount={listing.reviewCount}
              likelihoodToRecommend={listing.likelihoodToRecommend}
              valueForMoney={listing.valueForMoney}
              mostRecentReviewLabel={listing.mostRecentReviewLabel}
            />

            {/* Building & unit facts */}
            <div className="space-y-4">
              <div>
                <div className="font-barlow-condensed uppercase text-base font-bold tracking-wide text-charcoal">
                  {property.building} · {property.unit}
                </div>
                <div className="text-lg font-bold text-charcoal mt-1">
                  AED {listing.askingPrice.toLocaleString()}/yr
                </div>
              </div>

              {/* Key facts */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <Bed size={18} className="text-secondary" />
                  <span className="text-sm text-charcoal">{listing.bedrooms} Bed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath size={18} className="text-secondary" />
                  <span className="text-sm text-charcoal">{listing.bathrooms} Bath</span>
                </div>
                <div className="flex items-center gap-2">
                  <Square size={18} className="text-secondary" />
                  <span className="text-sm text-charcoal">{listing.sqft.toLocaleString()} sqft</span>
                </div>
                <div className="flex items-center gap-2">
                  <Home size={18} className="text-secondary" />
                  <span className="text-sm text-charcoal">{listing.furnished}</span>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                  <Calendar size={18} className="text-secondary" />
                  <span className="text-sm text-charcoal">Available {listing.availableFrom}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-charcoal leading-relaxed">{listing.description}</p>

              {/* House rules */}
              <div className="flex flex-wrap gap-2">
                {listing.houseRules.map((rule) => (
                  <div
                    key={rule}
                    className="px-3 py-1 rounded-full border border-border text-xs text-secondary"
                  >
                    {rule}
                  </div>
                ))}
              </div>
            </div>

            {/* Landlord */}
            <div>
              <LandlordRow
                initials={landlord.initials}
                responseRate={listing.landlord.responseRate}
                buildingsListed={listing.landlord.buildingsListed}
                onTap={() => setIsLandlordSheetOpen(true)}
              />
            </div>

            {/* Category ratings */}
            <div>
              <SubHeading>Category ratings</SubHeading>
              <CategoryRatingGrid
                building={listing.categoryRatings.building}
                apartment={listing.categoryRatings.apartment}
                neighbourhoodBuilding={listing.neighbourhoodCategoryRatings.building}
                neighbourhoodApartment={listing.neighbourhoodCategoryRatings.apartment}
              />
            </div>

            {/* Reviews */}
            <div>
              <SubHeading>Reviews ({listing.reviewCount})</SubHeading>

              {/* Rating distribution */}
              <RatingDistributionBar
                distribution={listing.ratingDistribution}
                neighbourhoodDistribution={listing.neighbourhoodDistribution}
              />

              {/* Review cards */}
              <div className="space-y-3">
                {listing.reviews.map((review, idx) => (
                  <ReviewCard
                    key={idx}
                    alias={review.alias}
                    overallExperience={review.overallExperience}
                    when={review.when}
                    headline={review.headline}
                    whatWasGood={review.whatWasGood}
                    whatWasBad={review.whatWasBad}
                    unitTag={review.unitTag}
                  />
                ))}
              </div>

              {/* See all reviews link */}
              <button className="mt-3 text-sm font-medium text-coral-dark hover:underline">
                See all {listing.reviewCount} reviews
              </button>
            </div>

            {/* Buildings like this */}
            {listing.similarBuildings.length > 0 && (
              <div>
                <SubHeading>Buildings like this</SubHeading>
                <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
                  {listing.similarBuildings.map((building) => (
                    <SimilarListingCard
                      key={building.name}
                      image={building.image}
                      name={building.name}
                      rating={building.rating}
                      rentMin={building.rentMin}
                      rentMax={building.rentMax}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sticky CTA - respects safe area */}
        <div
          className="bg-surface border-t border-border p-4"
          style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom))" }}
        >
          <Button
            fullWidth
            onClick={onArrangeViewing}
            className="bg-coral hover:bg-coral-dark text-white"
          >
            Arrange Viewing
          </Button>
        </div>
      </div>

      {/* Landlord sheet modal */}
      <LandlordSheet
        isOpen={isLandlordSheetOpen}
        onClose={() => setIsLandlordSheetOpen(false)}
        initials={landlord.initials}
        memberSince={listing.landlord.memberSince}
        buildingsListed={listing.landlord.buildingsListed}
        responsesWithin={listing.landlord.responsesWithin}
        responseRate={listing.landlord.responseRate}
        bio={listing.landlord.bio}
      />
    </div>
  );
}
