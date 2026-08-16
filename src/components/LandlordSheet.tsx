import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Shield } from "lucide-react";
import { Avatar } from "./Avatar";
import { Badge } from "./Badge";

interface LandlordSheetProps {
  isOpen: boolean;
  onClose: () => void;
  initials: string;
  memberSince: number;
  buildingsListed: number;
  responsesWithin: string;
  responseRate: number;
  bio: string;
}

export function LandlordSheet({
  isOpen,
  onClose,
  initials,
  memberSince,
  buildingsListed,
  responsesWithin,
  responseRate,
  bio,
}: LandlordSheetProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-w-sm mx-auto"
          >
            <div className="p-6 max-h-[80vh] overflow-y-auto">
              {/* Header with close affordance */}
              <div className="flex justify-center mb-6">
                <button
                  onClick={onClose}
                  className="w-12 h-1 bg-gray-300 rounded-full hover:bg-gray-400 transition"
                />
              </div>

              {/* Verification header */}
              <div className="text-center mb-6">
                <Avatar initials={initials} size="lg" className="mx-auto mb-3" />
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Badge variant="green">Verified landlord</Badge>
                  <CheckCircle size={16} className="text-teal-600" />
                </div>
                <div className="flex items-center justify-center gap-1 text-xs text-secondary">
                  <Shield size={14} />
                  Trusted property manager
                </div>
              </div>

              {/* Trust signals */}
              <div className="space-y-4 bg-teal-50 p-4 rounded-lg mb-6">
                <div>
                  <div className="text-xs text-secondary mb-1">Established since</div>
                  <div className="text-lg font-bold text-charcoal">{memberSince}</div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs text-secondary mb-1">Properties managed</div>
                    <div className="text-xl font-bold text-charcoal">{buildingsListed}</div>
                  </div>
                  <div>
                    <div className="text-xs text-secondary mb-1">Response rate</div>
                    <div className="text-xl font-bold text-charcoal">{responseRate}%</div>
                  </div>
                </div>
                <div className="text-sm text-secondary border-t border-teal-200 pt-3">
                  Responds within {responsesWithin}
                </div>
              </div>

              {/* About */}
              <div>
                <div className="text-xs text-secondary uppercase tracking-wider mb-2">About</div>
                <div className="text-sm text-charcoal leading-relaxed">{bio}</div>
              </div>

              {/* Close button area to match spec */}
              <button
                onClick={onClose}
                className="w-full mt-6 py-2 text-center text-sm text-secondary hover:text-charcoal transition"
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
