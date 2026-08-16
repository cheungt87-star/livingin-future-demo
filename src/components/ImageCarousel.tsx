import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Toast } from "./Toast";

interface ImageCarouselProps {
  officialImages: string[];
  communityImages: string[];
}

export function ImageCarousel({ officialImages, communityImages }: ImageCarouselProps) {
  const [activeTab, setActiveTab] = useState<"official" | "community">("official");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const images = activeTab === "official" ? officialImages : communityImages;
  const isSingleImage = images.length <= 1;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handleTabChange = (tab: "official" | "community") => {
    setActiveTab(tab);
    setCurrentIndex(0);
  };

  const handleSave = () => {
    setIsSaved(true);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <>
      <Toast message="Saved to your favourites" visible={showToast} />
      <div className="relative bg-gray-200 h-80 w-full overflow-hidden">
      {/* Image */}
      <img
        src={images[currentIndex]}
        alt="Listing"
        className="w-full h-full object-cover"
      />

      {/* Back button overlay (top-left) */}
      <button className="absolute top-4 left-4 w-11 h-11 rounded-full bg-black/30 flex items-center justify-center hover:bg-black/50 transition text-white z-20">
        <ChevronLeft size={24} />
      </button>

      {/* Save/Heart button overlay (top-right) */}
      <button
        onClick={handleSave}
        className="absolute top-4 right-4 w-11 h-11 rounded-full bg-black/30 flex items-center justify-center hover:bg-black/50 transition text-white z-20"
      >
        <svg className="w-6 h-6" fill={isSaved ? "currentColor" : "white"} viewBox="0 0 24 24">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>

      {/* Tab pills (Official/Community) */}
      <div className="absolute bottom-64 left-4 flex gap-2 z-20">
        <button
          onClick={() => handleTabChange("official")}
          className={`px-3 py-1 rounded-full text-xs font-medium transition ${
            activeTab === "official"
              ? "bg-white text-charcoal"
              : "bg-white/70 text-charcoal"
          }`}
        >
          Official · {officialImages.length}
        </button>
        <button
          onClick={() => handleTabChange("community")}
          className={`px-3 py-1 rounded-full text-xs font-medium transition ${
            activeTab === "community"
              ? "bg-white text-charcoal"
              : "bg-white/70 text-charcoal"
          }`}
        >
          Community · {communityImages.length}
        </button>
      </div>

      {/* Dot indicators - only show if 2+ images */}
      {!isSingleImage && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 z-20">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition ${
                idx === currentIndex ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}

      {/* Navigation arrows - only show if 2+ images */}
      {!isSingleImage && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition z-20 text-white"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition z-20 text-white"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}
      </div>
    </>
  );
}
