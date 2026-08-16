// TypeScript types and state machine definitions

export type Step =
  | "appointment"
  | "offer"
  | "contract"
  | "livingFee"
  | "documents"
  | "ejari"
  | "deposit"
  | "rentSetup"
  | "moveIn";

export type AppState = {
  // Navigation
  step: Step;
  substep?: string;

  // Appointment
  selectedTime?: string;
  appointmentPending?: boolean;

  // Offer & negotiation
  offerAmount?: number;
  counterAmount?: number;
  offerPending?: boolean;
  rentalPaymentMethod?: "cheques" | "monthly";

  // Living Fee
  paymentMethod?: "card" | "tabby";
  termsAccepted?: boolean;
  feePending?: boolean;

  // Documents
  documentsVerified: Record<string, boolean>;
  uploading?: string;

  // Ejari
  ejariStep?: number;
  ejariSigned?: boolean;
  ejariPending?: boolean;

  // Deposit
  depositPending?: boolean;
  depositConfirmed?: boolean;

  // Rent Setup
  keyperConnecting?: boolean;
  keyperConnected?: boolean;

  // Marketplace
  marketplaceTab?: "browse" | "cart";
  cartItems: CartItem[];
  orderProcessing?: boolean;

  // Toast
  toast?: {
    message: string;
    type: "success" | "info";
  };
};

export type CartItem = {
  id: string;
  category: string;
  name: string;
  price: number;
};

export type StepAction =
  // Appointment
  | { type: "SELECT_TIME"; payload: string }
  | { type: "APPOINTMENT_PENDING" }
  | { type: "APPOINTMENT_CONFIRMED" }
  // Offer
  | { type: "UPDATE_OFFER"; payload: number }
  | { type: "SET_RENTAL_PAYMENT_METHOD"; payload: "cheques" | "monthly" }
  | { type: "SUBMIT_OFFER" }
  | { type: "OFFER_PENDING" }
  | { type: "OFFER_COUNTERED" }
  | { type: "ACCEPT_COUNTER" }
  | { type: "OFFER_ACCEPTED" }
  // Contract
  | { type: "ACCEPT_CONTRACT" }
  // Living Fee
  | { type: "SET_PAYMENT_METHOD"; payload: "card" | "tabby" }
  | { type: "TOGGLE_TERMS" }
  | { type: "PAY_FEE" }
  | { type: "FEE_PENDING" }
  | { type: "FEE_PAID" }
  // Documents
  | { type: "UPLOAD_DOCUMENT"; payload: string }
  | { type: "DOCUMENT_UPLOADED"; payload: string }
  | { type: "DOCUMENT_VERIFIED"; payload: string }
  // Ejari
  | { type: "EJARI_STEP_AUTO_ADVANCE" }
  | { type: "SIGN_EJARI" }
  | { type: "EJARI_SIGNED" }
  | { type: "EJARI_FILED" }
  // Deposit
  | { type: "SEND_TRANSFER" }
  | { type: "DEPOSIT_PENDING" }
  | { type: "DEPOSIT_CONFIRMED" }
  // Rent Setup
  | { type: "CONNECT_KEYPER" }
  | { type: "KEYPER_CONNECTING" }
  | { type: "KEYPER_CONNECTED" }
  // Marketplace
  | { type: "TAB_BROWSE" }
  | { type: "TAB_CART" }
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "CHECKOUT" }
  | { type: "ORDER_PROCESSING" }
  | { type: "ORDER_CONFIRMED" }
  // Navigation
  | { type: "NEXT_STEP" }
  | { type: "GO_TO_STEP"; payload: Step }
  | { type: "RESTART" }
  // Toast
  | { type: "SHOW_TOAST"; payload: { message: string; type: "success" | "info" } }
  | { type: "HIDE_TOAST" };

export const STEP_NAMES: Record<Step, string> = {
  appointment: "Appointment",
  offer: "Offer",
  contract: "Contract",
  livingFee: "Living Fee",
  documents: "Documents",
  ejari: "Ejari",
  deposit: "Deposit",
  rentSetup: "Rent Setup",
  moveIn: "Move-In",
};

export const STEP_COUNTER: Record<Step, number> = {
  appointment: 1,
  offer: 2,
  contract: 3,
  livingFee: 4,
  documents: 5,
  ejari: 6,
  deposit: 7,
  rentSetup: 8,
  moveIn: 9,
};

export const STEP_ORDER: Step[] = [
  "appointment",
  "offer",
  "contract",
  "livingFee",
  "documents",
  "ejari",
  "deposit",
  "rentSetup",
  "moveIn",
];
