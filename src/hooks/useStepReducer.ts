import { useReducer, useCallback } from "react";
import { AppState, StepAction, STEP_ORDER } from "../types";

const initialState: AppState = {
  step: "appointment",
  documentsVerified: {},
  cartItems: [],
};

export function stepReducer(state: AppState, action: StepAction): AppState {
  switch (action.type) {
    // Appointment
    case "SELECT_TIME":
      return { ...state, selectedTime: action.payload };
    case "APPOINTMENT_PENDING":
      return { ...state, substep: "pending" };
    case "APPOINTMENT_CONFIRMED":
      return { ...state, substep: "confirmed" };

    // Offer
    case "UPDATE_OFFER":
      return { ...state, offerAmount: action.payload };
    case "SET_RENTAL_PAYMENT_METHOD":
      return { ...state, rentalPaymentMethod: action.payload };
    case "SUBMIT_OFFER":
      return { ...state, substep: "pending", offerPending: true };
    case "OFFER_COUNTERED":
      return { ...state, substep: "countered", offerPending: false };
    case "ACCEPT_COUNTER":
      return { ...state, substep: "accepted" };

    // Contract
    case "ACCEPT_CONTRACT":
      return {
        ...state,
        step: "livingFee",
        substep: "checkout",
      };

    // Living Fee
    case "SET_PAYMENT_METHOD":
      return { ...state, paymentMethod: action.payload };
    case "TOGGLE_TERMS":
      return { ...state, termsAccepted: !state.termsAccepted };
    case "PAY_FEE":
      return { ...state, substep: "pending", feePending: true };
    case "FEE_PAID":
      return { ...state, substep: "paid", feePending: false };

    // Documents
    case "UPLOAD_DOCUMENT":
      return { ...state, uploading: action.payload };
    case "DOCUMENT_UPLOADED":
      return { ...state, uploading: undefined };
    case "DOCUMENT_VERIFIED":
      return {
        ...state,
        documentsVerified: {
          ...state.documentsVerified,
          [action.payload]: true,
        },
      };

    // Ejari
    case "EJARI_STEP_AUTO_ADVANCE":
      return { ...state, ejariStep: (state.ejariStep ?? 0) + 1 };
    case "SIGN_EJARI":
      return { ...state, ejariSigned: true };
    case "EJARI_FILED":
      return { ...state, substep: "filed" };

    // Deposit
    case "SEND_TRANSFER":
      return { ...state, substep: "pending", depositPending: true };
    case "DEPOSIT_CONFIRMED":
      return { ...state, substep: "confirmed", depositPending: false };

    // Marketplace
    case "TAB_BROWSE":
      return { ...state, marketplaceTab: "browse", substep: "browse" };
    case "TAB_CART":
      return { ...state, marketplaceTab: "cart" };
    case "ADD_TO_CART":
      return { ...state, cartItems: [...state.cartItems, action.payload] };
    case "ORDER_PROCESSING":
      return { ...state, orderProcessing: true };
    case "ORDER_CONFIRMED":
      return { ...state, orderProcessing: false, substep: "confirmed" };

    // Navigation
    case "NEXT_STEP": {
      const currentIndex = STEP_ORDER.indexOf(state.step);
      if (currentIndex < STEP_ORDER.length - 1) {
        const nextStep = STEP_ORDER[currentIndex + 1];
        const nextState = { ...state, step: nextStep, substep: undefined };
        // Set initial substep for move-in
        if (nextStep === "moveIn") {
          return { ...nextState, substep: undefined, marketplaceTab: "browse" };
        }
        return nextState;
      }
      return state;
    }
    case "GO_TO_STEP":
      return { ...state, step: action.payload, substep: undefined };
    case "RESTART":
      return initialState;

    // Marketplace-specific
    case "KEYPER_CONNECTING":
      return { ...state, substep: "connecting", keyperConnecting: true };
    case "KEYPER_CONNECTED":
      return { ...state, substep: "connected", keyperConnecting: false, keyperConnected: true };
    case "CHECKOUT":
      return { ...state, substep: "processing", orderProcessing: true };

    // Toast
    case "SHOW_TOAST":
      return { ...state, toast: action.payload };
    case "HIDE_TOAST":
      return { ...state, toast: undefined };

    default:
      return state;
  }
}

export function useStepReducer() {
  const [state, dispatch] = useReducer(stepReducer, initialState);

  const nextStep = useCallback(() => {
    dispatch({ type: "NEXT_STEP" });
  }, []);

  const goToStep = useCallback((step: string) => {
    dispatch({ type: "GO_TO_STEP", payload: step as any });
  }, []);

  const restart = useCallback(() => {
    dispatch({ type: "RESTART" });
  }, []);

  return { state, dispatch, nextStep, goToStep, restart };
}
