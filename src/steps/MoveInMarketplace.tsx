import React, { useState } from "react";
import { motion } from "framer-motion";
import { CONTENT } from "../content";
import {
  Card,
  SubHeading,
  PrimaryButton,
  SecondaryButton,
  ChecklistRow,
  ConfirmationPanel,
  Badge,
  Toast,
  PendingState,
} from "../components";
import { AppState, StepAction, CartItem } from "../types";
import { ShoppingCart } from "lucide-react";

interface MoveInMarketplaceProps {
  state: AppState;
  dispatch: React.Dispatch<StepAction>;
}

const formatAED = (amount: number) => `AED ${amount.toLocaleString()}`;

export function MoveInMarketplace({ state, dispatch }: MoveInMarketplaceProps) {
  const { confirmedCopy, checklist, marketplaceCategories, marketplaceProviders } = CONTENT.moveIn;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);

  // Move-in confirmed state
  if (state.substep === undefined) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-4"
      >
        <ConfirmationPanel
          badge={<div className="text-sun font-medium">✓ You're all set</div>}
          hero="1 Sept 2026"
          supporting="Move-in confirmed. Your journey with Livingin starts now."
          tint="sun"
          className="mb-4"
        />

        <Card>
          <SubHeading>What's set up</SubHeading>
          <div className="space-y-0">
            {checklist.map((item, idx) => (
              <ChecklistRow key={idx} label={item} checked={true} />
            ))}
          </div>
        </Card>

        <PrimaryButton
          onClick={() => dispatch({ type: "TAB_BROWSE" })}
          fullWidth
        >
          Explore Move-In Services
        </PrimaryButton>
      </motion.div>
    );
  }

  // Marketplace browse
  if (state.marketplaceTab === "browse") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-4"
      >
        <Toast
          message={toastVisible ? "Added to cart" : ""}
          visible={toastVisible}
        />

        {/* Categories grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {marketplaceCategories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`
                relative rounded-xl overflow-hidden transition-all duration-200
                ${
                  selectedCategory === cat.name
                    ? "ring-2 ring-coral scale-95"
                    : "hover:shadow-md active:scale-95"
                }
              `}
            >
              {/* Background image with overlay */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30" />

              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white font-semibold text-center px-2 text-sm">
                  {cat.name}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Provider card */}
        {selectedCategory && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {marketplaceProviders
              .filter((p) => p.category === selectedCategory)
              .map((provider) => (
                <Card key={provider.name} className="mb-4">
                  <div className="mb-3">
                    <p className="font-medium text-charcoal mb-1">{provider.name}</p>
                    <Badge variant="outline">{provider.rate}</Badge>
                  </div>
                  <p className="text-lg font-mono font-bold text-coral mb-4">
                    {formatAED(provider.price)}
                  </p>
                  <PrimaryButton
                    onClick={() => {
                      dispatch({
                        type: "ADD_TO_CART",
                        payload: {
                          id: `${provider.category}-${provider.name}`,
                          category: provider.category,
                          name: provider.name,
                          price: provider.price,
                        },
                      });
                      setToastVisible(true);
                      setTimeout(() => setToastVisible(false), 3000);
                    }}
                    fullWidth
                  >
                    Add to Cart
                  </PrimaryButton>
                </Card>
              ))}

            {state.cartItems.length > 0 && (
              <SecondaryButton
                onClick={() => dispatch({ type: "TAB_CART" })}
                fullWidth
              >
                <ShoppingCart size={16} className="inline mr-2" />
                View Cart ({state.cartItems.length})
              </SecondaryButton>
            )}
          </motion.div>
        )}
      </motion.div>
    );
  }

  // Cart & checkout
  if (state.marketplaceTab === "cart") {
    const total = state.cartItems.reduce((sum, item) => sum + item.price, 0);

    if (state.substep === "processing") {
      return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <PendingState
            badge="Processing"
            title="Completing your order"
            supporting={`Total: ${formatAED(total)}`}
            delay={CONTENT.timings.orderProcess}
            onResolve={() => dispatch({ type: "ORDER_CONFIRMED" })}
          />
        </motion.div>
      );
    }

    if (state.substep === "confirmed") {
      return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <ConfirmationPanel
            badge={<div className="text-teal font-medium">✓ Order confirmed</div>}
            hero={formatAED(total)}
            supporting="Your providers will be in touch to schedule."
            tint="teal"
            className="mb-4"
          />

          <PrimaryButton
            onClick={() => dispatch({ type: "RESTART" })}
            fullWidth
          >
            Restart Demo
          </PrimaryButton>
        </motion.div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-4"
      >
        {/* Cart items */}
        <Card>
          <SubHeading>Your cart</SubHeading>
          <div className="space-y-3">
            {state.cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-2">
                <div>
                  <p className="text-sm font-medium text-charcoal">{item.name}</p>
                  <p className="text-xs text-secondary">{item.category}</p>
                </div>
                <p className="font-mono font-bold text-charcoal">{formatAED(item.price)}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-3 mt-3 flex justify-between">
            <p className="font-semibold text-charcoal">Total</p>
            <p className="font-mono font-bold text-lg text-charcoal">{formatAED(total)}</p>
          </div>
        </Card>

        {/* Checkout buttons */}
        <PrimaryButton
          onClick={() => dispatch({ type: "ORDER_PROCESSING" })}
          fullWidth
          className="mb-3"
        >
          Checkout
        </PrimaryButton>

        <SecondaryButton
          onClick={() => dispatch({ type: "TAB_BROWSE" })}
          fullWidth
        >
          Continue Shopping
        </SecondaryButton>
      </motion.div>
    );
  }

  return null;
}
