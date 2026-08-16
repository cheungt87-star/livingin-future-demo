import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CONTENT } from "../content";
import { Card, SubHeading, PrimaryButton, ChecklistRow } from "../components";
import { AppState, StepAction } from "../types";

interface DocumentsProps {
  state: AppState;
  dispatch: React.Dispatch<StepAction>;
}

export function Documents({ state, dispatch }: DocumentsProps) {
  const { items, timings } = CONTENT.documents;
  const [documentStates, setDocumentStates] = useState<Record<string, string>>({
    "Emirates ID": "pending",
    Passport: "pending",
    Visa: "pending",
  });

  const allVerified = Object.values(documentStates).every((s) => s === "verified");

  const handleUpload = (docName: string) => {
    setDocumentStates((prev) => ({
      ...prev,
      [docName]: "uploading",
    }));

    // Simulate upload
    setTimeout(() => {
      setDocumentStates((prev) => ({
        ...prev,
        [docName]: "verifying",
      }));

      // Simulate verification
      const timingIdx = Object.keys(documentStates).indexOf(docName);
      setTimeout(() => {
        setDocumentStates((prev) => ({
          ...prev,
          [docName]: "verified",
        }));
        dispatch({ type: "DOCUMENT_VERIFIED", payload: docName });
      }, timings[timingIdx] || 2000);
    }, 600);
  };

  const getDocumentLabel = (docName: string) => {
    const status = documentStates[docName];
    if (status === "pending") return "Not uploaded";
    if (status === "uploading") return "Uploading…";
    if (status === "verifying") return "Verifying…";
    return "Verified";
  };

  const getDocumentChecked = (docName: string) => {
    return documentStates[docName] === "verified";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      {/* Your documents */}
      <Card>
        <SubHeading>Your documents</SubHeading>
        <div className="space-y-0">
          {items.map((item) => (
            <ChecklistRow
              key={item.name}
              label={`${item.name} • ${getDocumentLabel(item.name)}`}
              checked={getDocumentChecked(item.name)}
              onAction={() => handleUpload(item.name)}
              actionLabel={
                documentStates[item.name] === "pending" ? "Upload" : undefined
              }
            />
          ))}
        </div>
      </Card>

      {/* Landlord's progress */}
      <Card>
        <SubHeading>Landlord's progress</SubHeading>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
            <div className="h-full bg-teal w-full" />
          </div>
          <p className="text-xs font-medium text-slate">2/2</p>
        </div>
      </Card>

      {/* CTA - only enabled when all verified */}
      {allVerified && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <PrimaryButton
            onClick={() => dispatch({ type: "NEXT_STEP" })}
            fullWidth
          >
            Continue to Ejari
          </PrimaryButton>
        </motion.div>
      )}
    </motion.div>
  );
}
