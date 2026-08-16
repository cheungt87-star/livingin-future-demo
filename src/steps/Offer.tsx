import { useState } from "react";
import { motion } from "framer-motion";
import { CONTENT } from "../content";
import {
  Card,
  Badge,
  Avatar,
  PrimaryButton,
  PendingState,
  SubHeading,
} from "../components";
import { AppState, StepAction } from "../types";

interface OfferProps {
  state: AppState;
  dispatch: React.Dispatch<StepAction>;
}

const formatAED = (amount: number) => `AED ${amount.toLocaleString()}`;

export function Offer({ state, dispatch }: OfferProps) {
  const [offerAmount, setOfferAmount] = useState(CONTENT.negotiation.offer);
  const [chequeCount, setChequeCount] = useState(4);
  const paymentMethod = state.rentalPaymentMethod ?? "monthly";
  const { asking, counter, final } = CONTENT.negotiation;

  const installments = paymentMethod === "cheques" ? chequeCount : 12;
  const perPaymentAmount = Math.round(offerAmount / installments);

  // Compose state - tenant makes offer
  if (state.substep === "picking" || state.substep === undefined) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <Card className="mb-4">
          <SubHeading>Asking price</SubHeading>
          <p className="text-lg font-mono font-bold text-charcoal mb-4">
            {formatAED(asking)}/yr
          </p>

          <SubHeading>Your offer</SubHeading>
          <input
            type="number"
            value={offerAmount}
            onChange={(e) => setOfferAmount(parseInt(e.target.value))}
            step="500"
            className="w-full px-3 py-2 border border-border rounded-lg text-lg font-mono font-bold text-charcoal mb-4"
          />

          <SubHeading>Payment method</SubHeading>
          <div className="flex gap-3 mb-4">
            <button
              onClick={() => dispatch({ type: "SET_RENTAL_PAYMENT_METHOD", payload: "cheques" })}
              className={`flex-1 px-3 py-2 rounded-lg font-medium transition ${
                paymentMethod === "cheques"
                  ? "bg-charcoal text-white"
                  : "bg-border text-charcoal hover:bg-slate-200"
              }`}
            >
              Cheques (1-12)
            </button>
            <button
              onClick={() => dispatch({ type: "SET_RENTAL_PAYMENT_METHOD", payload: "monthly" })}
              className={`flex-1 px-3 py-2 rounded-lg font-medium transition ${
                paymentMethod === "monthly"
                  ? "bg-charcoal text-white"
                  : "bg-border text-charcoal hover:bg-slate-200"
              }`}
            >
              Monthly Payments
            </button>
          </div>

          {paymentMethod === "cheques" && (
            <div className="flex items-center justify-between mb-4">
              <SubHeading className="mb-0">Number of cheques</SubHeading>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setChequeCount((n) => Math.max(1, n - 1))}
                  disabled={chequeCount <= 1}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-border text-charcoal font-bold hover:bg-slate-200 disabled:opacity-40 disabled:hover:bg-border"
                >
                  −
                </button>
                <span className="w-6 text-center font-mono font-bold text-charcoal">
                  {chequeCount}
                </span>
                <button
                  type="button"
                  onClick={() => setChequeCount((n) => Math.min(12, n + 1))}
                  disabled={chequeCount >= 12}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-border text-charcoal font-bold hover:bg-slate-200 disabled:opacity-40 disabled:hover:bg-border"
                >
                  +
                </button>
              </div>
            </div>
          )}

          <div className="bg-slate-50 rounded-lg p-3 mb-4">
            <p className="text-xs text-secondary mb-1">Per payment</p>
            <p className="text-lg font-mono font-bold text-charcoal">
              {formatAED(perPaymentAmount)}
            </p>
          </div>
        </Card>

        <PrimaryButton
          onClick={() => {
            dispatch({ type: "UPDATE_OFFER", payload: offerAmount });
            dispatch({ type: "SUBMIT_OFFER" });
          }}
          fullWidth
        >
          Send Offer
        </PrimaryButton>
      </motion.div>
    );
  }

  // Pending state - awaiting landlord response
  if (state.substep === "pending") {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <PendingState
          badge="Awaiting response"
          title="Your offer"
          supporting={formatAED(offerAmount)}
          delay={CONTENT.timings.landlordCounter}
          onResolve={() => dispatch({ type: "OFFER_COUNTERED" })}
        />
      </motion.div>
    );
  }

  // Countered state - landlord countered
  if (state.substep === "countered") {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <Card className="mb-4">
          <div className="flex items-start gap-3 mb-4">
            <Avatar initials={CONTENT.landlord.initials} color="coral" size="md" />
            <Badge variant="outline">Countered by Ahmed Al Farsi</Badge>
          </div>

          <SubHeading>Your offer</SubHeading>
          <p className="text-lg font-mono font-bold text-slate mb-4">
            {formatAED(offerAmount)}/yr
          </p>

          <SubHeading>Landlord's counter</SubHeading>
          <p className="text-lg font-mono font-bold text-charcoal mb-4">
            {formatAED(counter)}/yr
          </p>

          <p className="text-xs text-secondary">Ahmed is open to negotiation</p>
        </Card>

        <PrimaryButton
          onClick={() => dispatch({ type: "ACCEPT_COUNTER" })}
          fullWidth
          className="mb-3"
        >
          Accept Counter
        </PrimaryButton>
      </motion.div>
    );
  }

  // Accepted state - offer accepted
  if (state.substep === "accepted") {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <Card className="mb-4">
          <div className="mb-4">
            <Badge variant="green">Accepted</Badge>
          </div>

          <SubHeading>Annual rent</SubHeading>
          <p className="text-xl font-mono font-bold text-charcoal">
            {formatAED(final)}/yr
          </p>
        </Card>

        <PrimaryButton
          onClick={() => dispatch({ type: "NEXT_STEP" })}
          fullWidth
        >
          Continue to Contract
        </PrimaryButton>
      </motion.div>
    );
  }

  return null;
}
