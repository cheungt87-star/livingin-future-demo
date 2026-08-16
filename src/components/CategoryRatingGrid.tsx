interface CategoryRatingGridProps {
  building: {
    maintenance: number;
    sharedFacilities: number;
    buildingStaff: number;
    trafficAccess: number;
  };
  apartment: {
    naturalLight: number;
    soundproofing: number;
    storageSpace: number;
  };
  neighbourhoodBuilding?: {
    maintenance: number;
    sharedFacilities: number;
    buildingStaff: number;
    trafficAccess: number;
  };
  neighbourhoodApartment?: {
    naturalLight: number;
    soundproofing: number;
    storageSpace: number;
  };
}

function RatingCell({ value }: { value: number }) {
  return (
    <div className="flex items-center justify-center">
      <span className="font-mono font-semibold text-charcoal">{value.toFixed(1)}</span>
    </div>
  );
}

export function CategoryRatingGrid({
  building,
  apartment,
  neighbourhoodBuilding,
  neighbourhoodApartment,
}: CategoryRatingGridProps) {
  const buildingFactors = [
    { label: "Maintenance", building: building.maintenance, neighbourhood: neighbourhoodBuilding?.maintenance },
    { label: "Shared facilities", building: building.sharedFacilities, neighbourhood: neighbourhoodBuilding?.sharedFacilities },
    { label: "Building staff", building: building.buildingStaff, neighbourhood: neighbourhoodBuilding?.buildingStaff },
    { label: "Traffic & access", building: building.trafficAccess, neighbourhood: neighbourhoodBuilding?.trafficAccess },
  ];

  const apartmentFactors = [
    { label: "Natural light", building: apartment.naturalLight, neighbourhood: neighbourhoodApartment?.naturalLight },
    { label: "Soundproofing", building: apartment.soundproofing, neighbourhood: neighbourhoodApartment?.soundproofing },
    { label: "Storage space", building: apartment.storageSpace, neighbourhood: neighbourhoodApartment?.storageSpace },
  ];

  const renderRow = (factor: { label: string; building: number; neighbourhood?: number }) => (
    <tr key={factor.label} className="border-b border-gray-200 last:border-b-0">
      <td className="py-3 text-sm text-charcoal">{factor.label}</td>
      <td className="py-3 text-center">
        <RatingCell value={factor.building} />
      </td>
      {factor.neighbourhood !== undefined && (
        <td className="py-3 text-center">
          <RatingCell value={factor.neighbourhood} />
        </td>
      )}
    </tr>
  );

  const hasNeighbourhood = neighbourhoodBuilding || neighbourhoodApartment;

  return (
    <div className="space-y-6">
      {/* Building section */}
      <div>
        <h3 className="text-sm font-semibold text-charcoal mb-3">Building</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left font-semibold text-secondary py-2 px-0">Factor</th>
                <th className="text-center font-semibold text-secondary py-2">This building</th>
                {hasNeighbourhood && (
                  <th className="text-center font-semibold text-secondary py-2">Neighbourhood avg</th>
                )}
              </tr>
            </thead>
            <tbody>
              {buildingFactors.map(renderRow)}
            </tbody>
          </table>
        </div>
      </div>

      {/* Apartment section */}
      <div>
        <h3 className="text-sm font-semibold text-charcoal mb-3">Apartment</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left font-semibold text-secondary py-2 px-0">Factor</th>
                <th className="text-center font-semibold text-secondary py-2">This building</th>
                {hasNeighbourhood && (
                  <th className="text-center font-semibold text-secondary py-2">Neighbourhood avg</th>
                )}
              </tr>
            </thead>
            <tbody>
              {apartmentFactors.map(renderRow)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
