import React from "react";
import { motion } from "framer-motion";
import { CONTENT } from "../content";
import { Card, SubHeading, PrimaryButton } from "../components";
import { AppState, StepAction } from "../types";

interface ContractProps {
  state: AppState;
  dispatch: React.Dispatch<StepAction>;
}

const formatAED = (amount: number) => `AED ${amount.toLocaleString()}`;

export function Contract({ dispatch }: ContractProps) {
  const { annualRent, duration, startDate, moveInDate, paymentSchedule, securityDeposit, agencyFee, livingFee, clauses } =
    CONTENT.contract;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      {/* Terms section */}
      <Card>
        <SubHeading>Terms</SubHeading>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-secondary">Annual rent</span>
            <span className="font-mono font-bold text-charcoal">{formatAED(annualRent)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary">Duration</span>
            <span className="font-medium text-charcoal">{duration}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary">Start date</span>
            <span className="font-medium text-charcoal">{startDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary">Move-in date</span>
            <span className="font-medium text-charcoal">{moveInDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary">Payment schedule</span>
            <span className="font-medium text-charcoal">{paymentSchedule}</span>
          </div>
        </div>
      </Card>

      {/* Price breakdown section */}
      <Card>
        <SubHeading>Price breakdown</SubHeading>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-secondary">Rent</span>
            <span className="text-sm text-slate">{formatAED(annualRent)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary">Security deposit (5%)</span>
            <span className="text-sm text-slate">{formatAED(securityDeposit)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary">Agency fee (5%)</span>
            <span className="text-sm text-slate">{formatAED(agencyFee)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary">Living fee (2%, non-refundable)</span>
            <span className="text-sm text-slate">{formatAED(livingFee)}</span>
          </div>
          <div className="border-t border-border pt-3 flex justify-between">
            <span className="font-semibold text-charcoal">Due before move-in</span>
            <span className="font-mono font-bold text-lg text-charcoal">
              {formatAED(securityDeposit + livingFee)}
            </span>
          </div>
        </div>
      </Card>

      {/* Key clauses section */}
      <Card>
        <SubHeading>Key clauses</SubHeading>
        <div className="space-y-2 text-sm text-slate">
          {clauses.map((clause, idx) => (
            <p key={idx}>• {clause}</p>
          ))}
        </div>
      </Card>

      <PrimaryButton
        onClick={() => dispatch({ type: "ACCEPT_CONTRACT" })}
        fullWidth
      >
        Accept Contract
      </PrimaryButton>
    </motion.div>
  );
}
