export type Step = "appointment" | "offer" | "contract" | "livingFee" | "documents" | "ejari" | "deposit" | "rentSetup" | "moveIn";
export type AppState = {
    step: Step;
    substep?: string;
    selectedTime?: string;
    appointmentPending?: boolean;
    offerAmount?: number;
    counterAmount?: number;
    offerPending?: boolean;
    paymentMethod?: "card" | "tabby";
    termsAccepted?: boolean;
    feePending?: boolean;
    documentsVerified: Record<string, boolean>;
    uploading?: string;
    ejariStep?: number;
    ejariSigned?: boolean;
    ejariPending?: boolean;
    depositPending?: boolean;
    depositConfirmed?: boolean;
    keyperConnecting?: boolean;
    keyperConnected?: boolean;
    marketplaceTab?: "browse" | "cart";
    cartItems: CartItem[];
    orderProcessing?: boolean;
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
export type StepAction = {
    type: "SELECT_TIME";
    payload: string;
} | {
    type: "APPOINTMENT_PENDING";
} | {
    type: "APPOINTMENT_CONFIRMED";
} | {
    type: "UPDATE_OFFER";
    payload: number;
} | {
    type: "SUBMIT_OFFER";
} | {
    type: "OFFER_PENDING";
} | {
    type: "OFFER_COUNTERED";
} | {
    type: "ACCEPT_COUNTER";
} | {
    type: "OFFER_ACCEPTED";
} | {
    type: "ACCEPT_CONTRACT";
} | {
    type: "SET_PAYMENT_METHOD";
    payload: "card" | "tabby";
} | {
    type: "TOGGLE_TERMS";
} | {
    type: "PAY_FEE";
} | {
    type: "FEE_PENDING";
} | {
    type: "FEE_PAID";
} | {
    type: "UPLOAD_DOCUMENT";
    payload: string;
} | {
    type: "DOCUMENT_UPLOADED";
    payload: string;
} | {
    type: "DOCUMENT_VERIFIED";
    payload: string;
} | {
    type: "EJARI_STEP_AUTO_ADVANCE";
} | {
    type: "SIGN_EJARI";
} | {
    type: "EJARI_SIGNED";
} | {
    type: "EJARI_FILED";
} | {
    type: "SEND_TRANSFER";
} | {
    type: "DEPOSIT_PENDING";
} | {
    type: "DEPOSIT_CONFIRMED";
} | {
    type: "CONNECT_KEYPER";
} | {
    type: "KEYPER_CONNECTING";
} | {
    type: "KEYPER_CONNECTED";
} | {
    type: "TAB_BROWSE";
} | {
    type: "TAB_CART";
} | {
    type: "ADD_TO_CART";
    payload: CartItem;
} | {
    type: "CHECKOUT";
} | {
    type: "ORDER_PROCESSING";
} | {
    type: "ORDER_CONFIRMED";
} | {
    type: "NEXT_STEP";
} | {
    type: "GO_TO_STEP";
    payload: Step;
} | {
    type: "RESTART";
} | {
    type: "SHOW_TOAST";
    payload: {
        message: string;
        type: "success" | "info";
    };
} | {
    type: "HIDE_TOAST";
};
export declare const STEP_NAMES: Record<Step, string>;
export declare const STEP_COUNTER: Record<Step, number>;
export declare const STEP_ORDER: Step[];
