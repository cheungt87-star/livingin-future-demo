import React from "react";
import { motion } from "framer-motion";
import { CONTENT } from "../content";
import {
  Card,
  SubHeading,
  PrimaryButton,
  PendingState,
  ConfirmationPanel,
} from "../components";
import { AppState, StepAction } from "../types";

interface RentSetupProps {
  state: AppState;
  dispatch: React.Dispatch<StepAction>;
}

const formatAED = (amount: number) => `AED ${amount.toLocaleString()}`;

export function RentSetup({ state, dispatch }: RentSetupProps) {
  const { provider, handoffCopy, connectingCopy, connectedBadge, firstPaymentAmount, firstPaymentDate } =
    CONTENT.rentSetup;

  // Initial state
  if (state.substep === undefined || state.substep === "initial") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-4"
      >
        <Card>
          <SubHeading>Monthly rent payment</SubHeading>
          <p className="text-sm font-medium text-charcoal mb-3">{provider}</p>
          <p className="text-xs text-slate">{handoffCopy}</p>
        </Card>

        <PrimaryButton
          onClick={() => dispatch({ type: "KEYPER_CONNECTING" })}
          fullWidth
        >
          Connect Keyper Account
        </PrimaryButton>
      </motion.div>
    );
  }

  // Connecting state
  if (state.substep === "connecting") {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <PendingState
          badge="Setting up"
          title={connectingCopy}
          supporting="Redirecting to Keyper…"
          delay={CONTENT.timings.keyperConnect}
          onResolve={() => dispatch({ type: "KEYPER_CONNECTED" })}
        />
      </motion.div>
    );
  }

  // Connected state
  if (state.substep === "connected") {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <ConfirmationPanel
          badge={<div className="text-teal font-medium">✓ {connectedBadge}</div>}
          hero={formatAED(firstPaymentAmount)}
          supporting={`First payment on ${firstPaymentDate}`}
          tint="teal"
          className="mb-4"
        />

        <PrimaryButton
          onClick={() => dispatch({ type: "NEXT_STEP" })}
          fullWidth
        >
          Continue to Move-In
        </PrimaryButton>
      </motion.div>
    );
  }

  return null;
}
