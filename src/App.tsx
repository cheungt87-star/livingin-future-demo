import { useState } from "react";
import { useStepReducer } from "./hooks/useStepReducer";
import { STEP_NAMES, STEP_COUNTER, Step } from "./types";
import {
  Appointment,
  Offer,
  Contract,
  LivingFee,
  Documents,
  Ejari,
  Deposit,
  RentSetup,
  MoveInMarketplace,
} from "./steps";
import { BottomNav } from "./components";
import { Listing } from "./Listing";

const STEP_COMPONENTS: Record<Step, any> = {
  appointment: Appointment,
  offer: Offer,
  contract: Contract,
  livingFee: LivingFee,
  documents: Documents,
  ejari: Ejari,
  deposit: Deposit,
  rentSetup: RentSetup,
  moveIn: MoveInMarketplace,
};

export default function App() {
  const { state, dispatch } = useStepReducer();
  const [showListing, setShowListing] = useState(true);

  // Check for debug mode
  const showDebug = new URLSearchParams(location.search).get("debug") === "1";

  // Get current step component
  const StepComponent = STEP_COMPONENTS[state.step];

  // Handle back button
  const handleBack = () => {
    const currentIdx = Object.keys(STEP_COMPONENTS).indexOf(state.step);
    if (currentIdx > 0) {
      const prevStep = Object.keys(STEP_COMPONENTS)[currentIdx - 1] as Step;
      dispatch({ type: "GO_TO_STEP", payload: prevStep });
    } else {
      // First step - go back to listing
      setShowListing(true);
    }
  };

  if (showListing) {
    return <Listing onArrangeViewing={() => setShowListing(false)} />;
  }

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100">
      <div className="w-full bg-surface flex flex-col h-screen" style={{ maxWidth: "430px", margin: "0 auto" }}>
        {/* Debug step jumper - only in ?debug=1 mode */}
        {showDebug && (
          <div className="px-4 py-3 bg-white border-b border-border">
            <div className="text-xs font-mono mb-2 text-slate">Debug: Jump to step</div>
            <div className="flex flex-wrap gap-1">
              {Object.keys(STEP_COMPONENTS).map((step) => (
                <button
                  key={step}
                  onClick={() => dispatch({ type: "GO_TO_STEP", payload: step as any })}
                  className="px-2 py-1 text-xs bg-coral text-white rounded hover:bg-coral-dark transition"
                >
                  {step}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Nav header - respects safe area top */}
        <div className="bg-white border-b border-border sticky top-0 z-10" style={{ paddingTop: "env(safe-area-inset-top)" }}>
            <div className="px-4 pt-3 pb-3">
              <div className="flex items-center gap-3 mb-3">
                <button
                  onClick={handleBack}
                  className="w-11 h-11 rounded-full border border-charcoal flex items-center justify-center hover:bg-surface transition text-lg"
                >
                  &lt;
                </button>
                <div className="flex-1">
                  <div className="font-barlow-condensed uppercase text-base font-bold tracking-wide">
                    {STEP_NAMES[state.step]}
                  </div>
                  <div className="text-xs text-secondary mt-1">Marina Gate · Unit 1204</div>
                </div>
                <div className="font-mono text-xs text-secondary font-medium">{STEP_COUNTER[state.step]}/9</div>
              </div>
              {/* Progress bar */}
              <div className="h-0.5 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-coral transition-all duration-500"
                  style={{ width: `${((STEP_COUNTER[state.step] as number) / 9) * 100}%` }}
                />
              </div>
            </div>
          </div>

        {/* Main content area - scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-6">
            {StepComponent && <StepComponent state={state} dispatch={dispatch} />}
          </div>
        </div>

        {/* Bottom nav - persistent */}
        <BottomNav activeTab="home" />
      </div>
    </div>
  );
}
