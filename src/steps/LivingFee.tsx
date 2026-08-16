import React, { useState } from "react";
import { motion } from "framer-motion";
import { CONTENT } from "../content";
import {
  Card,
  SubHeading,
  PrimaryButton,
  SegmentedControl,
  ConfirmationPanel,
} from "../components";
import { AppState, StepAction } from "../types";

interface LivingFeeProps {
  state: AppState;
  dispatch: React.Dispatch<StepAction>;
}

const formatAED = (amount: number) => `AED ${amount.toLocaleString()}`;

export function LivingFee({ state, dispatch }: LivingFeeProps) {
  const { calculation, total, disclosure, supportingLine, paymentMethods, tabbyInstallments, confirmationCopy } =
    CONTENT.livingFee;
  const [paymentMethod, setPaymentMethod] = useState<"card" | "tabby">("card");
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Checkout state
  if (state.substep === "checkout" || state.substep === undefined) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-4"
      >
        {/* Disclosure banner */}
        <div className="bg-renter-red bg-opacity-10 border border-renter-red rounded-lg p-3">
          <p className="text-xs font-medium text-renter-red">{disclosure}</p>
        </div>

        {/* Fee calculation */}
        <Card>
          <SubHeading>Living fee</SubHeading>
          <p className="text-sm text-secondary mb-3">{calculation} = {formatAED(total)}</p>
          <p className="text-xs text-slate">{supportingLine}</p>
        </Card>

        {/* Payment method selection */}
        <Card>
          <SubHeading>Payment method</SubHeading>
          <SegmentedControl
            options={[
              { label: "Card", value: "card" },
              { label: "Tabby", value: "tabby" },
            ]}
            value={paymentMethod}
            onChange={(value) => setPaymentMethod(value as "card" | "tabby")}
          />
        </Card>

        {/* Payment details */}
        <Card>
          {paymentMethod === "card" ? (
            <div className="space-y-3">
              <div>
                <label className="text-xs text-secondary block mb-1">Card number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-secondary block mb-1">Expiry</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-secondary block mb-1">CVC</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-sm text-slate mb-3">4 payments of {formatAED(tabbyInstallments.amount)}</p>
              <p className="text-xs text-secondary">No interest, no fees</p>
            </div>
          )}
        </Card>

        {/* Terms checkbox */}
        <Card>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mt-1"
            />
            <span className="text-xs text-slate">
              I agree to the Terms & Conditions
            </span>
          </label>
        </Card>

        <PrimaryButton
          onClick={() => dispatch({ type: "FEE_PAID" })}
          disabled={!termsAccepted}
          fullWidth
        >
          Pay {formatAED(total)}
        </PrimaryButton>
      </motion.div>
    );
  }

  // Paid state
  if (state.substep === "paid") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <ConfirmationPanel
          badge={<div className="text-teal font-medium">✓ Payment successful</div>}
          hero={formatAED(total)}
          supporting={confirmationCopy}
          tint="coral"
          className="mb-4"
        />

        <PrimaryButton
          onClick={() => dispatch({ type: "NEXT_STEP" })}
          fullWidth
        >
          Continue to Documents
        </PrimaryButton>
      </motion.div>
    );
  }

  return null;
}
