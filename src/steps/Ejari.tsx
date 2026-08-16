import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CONTENT } from "../content";
import { Card, SubHeading, PrimaryButton, ConfirmationPanel } from "../components";
import { AppState, StepAction } from "../types";

interface EjariProps {
  state: AppState;
  dispatch: React.Dispatch<StepAction>;
}

export function Ejari({ state, dispatch }: EjariProps) {
  const { steps, midFlowCopy, midFlowDetail, midFlowButton, filedBadge } = CONTENT.ejari;
  const [currentStep, setCurrentStep] = useState(0);
  const [showSigningPrompt, setShowSigningPrompt] = useState(false);

  // Auto-advance to step 3 (Sent for e-signature)
  useEffect(() => {
    if (currentStep < 2) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, CONTENT.timings.ejariAuto);
      return () => clearTimeout(timer);
    } else if (currentStep === 2) {
      // At step 3, show the signing prompt
      setShowSigningPrompt(true);
    }
  }, [currentStep]);

  const handleSigned = () => {
    setShowSigningPrompt(false);
    // Auto-advance to steps 4 and 5
    let nextStep = 3;
    const advance = () => {
      if (nextStep < 4) {
        setCurrentStep(nextStep);
        nextStep++;
        setTimeout(advance, CONTENT.timings.ejariAuto);
      } else {
        dispatch({ type: "EJARI_FILED" });
      }
    };
    advance();
  };

  // Filed state - show confirmation
  if (state.substep === "filed") {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <ConfirmationPanel
          badge={<div className="text-teal font-medium">✓ {filedBadge}</div>}
          hero="Ejari Filed"
          tint="teal"
          className="mb-4"
        />

        <PrimaryButton
          onClick={() => dispatch({ type: "NEXT_STEP" })}
          fullWidth
        >
          Continue to Deposit
        </PrimaryButton>
      </motion.div>
    );
  }

  // Tracker state
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      <Card>
        <SubHeading>Registration status</SubHeading>
        <div className="space-y-4">
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-3">
              {/* Dot */}
              <div
                className={`w-3 h-3 rounded-full flex-shrink-0 mt-1.5 ${
                  idx <= currentStep
                    ? "bg-teal"
                    : "border-2 border-border bg-white"
                }`}
              />

              {/* Vertical line */}
              {idx < steps.length - 1 && (
                <div
                  className={`w-0.5 absolute left-[17px] top-[60px] h-8 ${
                    idx < currentStep ? "bg-teal" : "bg-border"
                  }`}
                />
              )}

              {/* Label */}
              <span
                className={`text-sm ${
                  idx <= currentStep ? "font-medium text-charcoal" : "text-secondary"
                }`}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Signing prompt */}
      {showSigningPrompt && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <p className="text-sm font-medium text-charcoal mb-2">{midFlowCopy}</p>
            <p className="text-xs text-secondary mb-4">{midFlowDetail}</p>
            <PrimaryButton onClick={handleSigned} fullWidth>
              {midFlowButton}
            </PrimaryButton>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}
