import React from "react";
import { motion } from "framer-motion";
import { CONTENT } from "../content";
import {
  Card,
  Badge,
  Avatar,
  PrimaryButton,
  PendingState,
  ConfirmationPanel,
  Toast,
} from "../components";
import { AppState, StepAction } from "../types";

interface AppointmentProps {
  state: AppState;
  dispatch: React.Dispatch<StepAction>;
}

export function Appointment({ state, dispatch }: AppointmentProps) {
  const { date, slots, selectedTime, pendingCopy, confirmedBadge, toast } =
    CONTENT.appointment;

  const handleSelectTime = (time: string) => {
    dispatch({ type: "SELECT_TIME", payload: time });
    dispatch({ type: "APPOINTMENT_PENDING" });
  };

  // Picking state - show time slot grid
  if (!state.substep || state.substep === "picking") {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <Card className="mb-4">
          <p className="text-sm text-slate mb-4">Select your preferred time</p>
          <p className="text-xs text-secondary mb-4">{date}</p>

          {/* Time slot grid - 3 columns */}
          <div className="grid grid-cols-3 gap-2">
            {slots.map((slot, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectTime(slot.time)}
                disabled={!slot.available}
                className={`
                  py-3 px-2 rounded-lg font-medium text-sm transition
                  ${
                    slot.available
                      ? "border border-border bg-white hover:bg-surface text-charcoal cursor-pointer"
                      : "border border-border bg-surface text-slate cursor-not-allowed opacity-50"
                  }
                `}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </Card>
      </motion.div>
    );
  }

  // Pending state - awaiting landlord response
  if (state.substep === "pending") {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <PendingState
          badge="Awaiting landlord"
          title={
            <div>
              <p className="text-sm mb-1">{state.selectedTime || selectedTime}</p>
              <p className="text-xs text-secondary">{date}</p>
            </div>
          }
          supporting={pendingCopy}
          delay={CONTENT.timings.landlordAccept}
          onResolve={() => dispatch({ type: "APPOINTMENT_CONFIRMED" })}
        />
      </motion.div>
    );
  }

  // Confirmed state - show confirmation
  if (state.substep === "confirmed") {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <Toast message={toast} visible={true} />

        <Card className="mb-4">
          <div className="flex items-start gap-3 mb-4">
            <Avatar initials={CONTENT.landlord.initials} color="teal" size="md" />
            <div>
              <Badge variant="green" className="mb-2">
                {confirmedBadge}
              </Badge>
              <p className="text-sm font-medium text-charcoal mb-1">{state.selectedTime || selectedTime}</p>
              <p className="text-xs text-secondary">{date}</p>
            </div>
          </div>
        </Card>

        <PrimaryButton
          onClick={() => dispatch({ type: "NEXT_STEP" })}
          fullWidth
        >
          Continue to Offer
        </PrimaryButton>
      </motion.div>
    );
  }

  return null;
}
