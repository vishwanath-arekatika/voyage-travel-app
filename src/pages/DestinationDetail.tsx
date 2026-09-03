import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DestinationDetailView } from "../components/DestinationDetailView";
import { DESTINATIONS } from "../data/destinations";
import { UserLocation, Destination } from "../types";
import { Compass } from "lucide-react";

interface DestinationDetailProps {
  userLocation: UserLocation;
  unit: "C" | "F";
}

export const DestinationDetail: React.FC<DestinationDetailProps> = ({
  userLocation,
  unit,
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const destination = DESTINATIONS.find((d) => d.id === id) || DESTINATIONS[0];

  if (!destination) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
        <Compass className="w-12 h-12 text-amber-400 mb-4 animate-spin" />
        <h2 className="text-2xl font-serif font-bold text-stone-100">Destination Not Found</h2>
        <p className="text-stone-400 text-sm mt-2 mb-6">
          The destination you are looking for is currently not in our catalog.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-5 py-2.5 rounded-xl bg-amber-400 text-stone-950 text-sm font-semibold hover:bg-amber-300 transition-colors"
        >
          Return to Destinations
        </button>
      </div>
    );
  }

  return (
    <DestinationDetailView
      destination={destination}
      userLocation={userLocation}
      tempUnit={unit}
      onBack={() => navigate("/")}
      onOpenItineraryForDest={(dest: Destination) =>
        navigate(`/itinerary?dest=${encodeURIComponent(dest.name)}`)
      }
      onOpenChatForDest={(dest: Destination) =>
        navigate(`/concierge?dest=${encodeURIComponent(dest.name)}`)
      }
    />
  );
};
