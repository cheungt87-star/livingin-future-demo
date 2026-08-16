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

interface DepositProps {
  state: AppState;
  dispatch: React.Dispatch<StepAction>;
}

const formatAED = (amount: number) => `AED ${amount.toLocaleString()}`;

export function Deposit({ state, dispatch }: DepositProps) {
  const { accountName, bank, iban, amount, confirmationBadge, confirmationHero } =
    CONTENT.deposit;

  // Awaiting state
  if (state.substep === "awaiting" || state.substep === undefined) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-4"
      >
        <Card>
          <SubHeading>Bank details</SubHeading>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-xs text-secondary mb-1">Account name</p>
              <p className="font-medium text-charcoal">{accountName}</p>
            </div>
            <div>
              <p className="text-xs text-secondary mb-1">Bank</p>
              <p className="font-medium text-charcoal">{bank}</p>
            </div>
            <div>
              <p className="text-xs text-secondary mb-1">IBAN</p>
              <p className="font-mono font-medium text-charcoal text-xs">{iban}</p>
            </div>
          </div>
        </Card>

        <Card>
          <SubHeading>Amount due</SubHeading>
          <p className="text-xl font-mono font-bold text-charcoal">{formatAED(amount)}</p>
          <p className="text-xs text-secondary mt-2">Security deposit (5% of annual rent)</p>
        </Card>

        <PrimaryButton
          onClick={() => dispatch({ type: "SEND_TRANSFER" })}
          fullWidth
        >
          I've Sent the Transfer
        </PrimaryButton>
      </motion.div>
    );
  }

  // Pending state
  if (state.substep === "pending") {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <PendingState
          badge="Awaiting confirmation"
          title="Transfer sent"
          supporting={`${formatAED(amount)} to ${accountName}`}
          delay={CONTENT.timings.landlordDepositConfirm}
          onResolve={() => dispatch({ type: "DEPOSIT_CONFIRMED" })}
        />
      </motion.div>
    );
  }

  // Confirmed state
  if (state.substep === "confirmed") {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <ConfirmationPanel
          badge={<div className="text-teal font-medium">✓ {confirmationBadge}</div>}
          hero={confirmationHero}
          tint="teal"
          className="mb-4"
        />

        <PrimaryButton
          onClick={() => dispatch({ type: "NEXT_STEP" })}
          fullWidth
        >
          Continue to Rent Setup
        </PrimaryButton>
      </motion.div>
    );
  }

  return null;
}
