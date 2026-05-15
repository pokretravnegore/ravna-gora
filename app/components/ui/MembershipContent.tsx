"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Plan = "supporting" | "full";
type Edition = "digital" | "print" | "both";

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function RadioDot({ active }: { active: boolean }) {
  return (
    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${active ? "border-blue-2" : "border-black/30"}`}>
      {active && <div className="w-2.5 h-2.5 rounded-full bg-blue-2" />}
    </div>
  );
}

export function MembershipContent() {
  const t = useTranslations("membership");
  const [plan, setPlan] = useState<Plan>("full");
  const [edition, setEdition] = useState<Edition>("digital");
  const [donation, setDonation] = useState("");
  const [customDonation, setCustomDonation] = useState("");

  const price = plan === "supporting" ? t("supportingPrice") : t("fullPrice");

  const EDITIONS: { key: Edition; label: string }[] = [
    { key: "digital", label: t("editionDigital") },
    { key: "print",   label: t("editionPrint") },
    { key: "both",    label: t("editionBoth") },
  ];

  const QUICK_AMOUNTS = ["$10", "$25", "$50", "$100"];

  return (
    <div className="flex flex-col gap-(--space-10) pb-(--space-8)">

      {/* ── Plan cards ── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

        {/* Supporting Member */}
        <button
          onClick={() => setPlan("supporting")}
          className={`cursor-pointer text-left flex flex-col gap-5 p-8 border-2 transition-colors ${plan === "supporting" ? "border-blue-2" : "border-black/15 hover:border-black/40"}`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <p className="type-large text-blue-2">{t("supporting")}</p>
              <p className="type-display text-black">
                {t("supportingPrice")}{" "}
                <span className="type-body text-gray-2">{t("perYear")}</span>
              </p>
            </div>
            <RadioDot active={plan === "supporting"} />
          </div>
          <p className="type-body text-gray-2">{t("supportingDesc")}</p>
          <div className="flex flex-wrap gap-2 pt-1">
            {EDITIONS.map(({ key, label }) => (
              <button
                key={key}
                onClick={(e) => { e.stopPropagation(); setPlan("supporting"); setEdition(key); }}
                className={`cursor-pointer type-label px-4 py-1.5 border transition-colors ${plan === "supporting" && edition === key ? "bg-blue-2 text-white border-blue-2" : "border-black/30 text-black hover:border-blue-2"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </button>

        {/* Full Member */}
        <button
          onClick={() => setPlan("full")}
          className={`cursor-pointer text-left flex flex-col gap-5 p-8 border-2 transition-colors ${plan === "full" ? "border-blue-2" : "border-black/15 hover:border-black/40"}`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <p className="type-large text-blue-2">{t("full")}</p>
              <p className="type-display text-black">
                {t("fullPrice")}{" "}
                <span className="type-body text-gray-2">{t("perYear")}</span>
              </p>
            </div>
            <RadioDot active={plan === "full"} />
          </div>
          <p className="type-body text-gray-2">{t("fullDesc")}</p>
        </button>
      </div>

      {/* ── Payment form ── */}
      <div className="flex flex-col gap-6 w-full xl:max-w-155">
        <h2 className="type-h3 text-black">{t("paymentDetails")}</h2>

        <div className="flex flex-col gap-4">

          {/* Card number */}
          <div className="flex flex-col gap-1.5">
            <label className="type-label text-gray-2">{t("cardNumber")}</label>
            <div className="flex items-center gap-3 border border-black/20 bg-white px-4 py-3">
              <span className="text-gray-2"><LockIcon /></span>
              <input
                type="text"
                placeholder={t("cardPlaceholder")}
                className="flex-1 bg-transparent type-body text-black placeholder:text-gray-3 outline-none"
              />
              <div className="flex gap-1.5 shrink-0">
                <div className="w-9 h-6 bg-blue-1 rounded-sm opacity-80" />
                <div className="w-9 h-6 bg-gray-3 rounded-sm opacity-60" />
              </div>
            </div>
          </div>

          {/* Expiry + CVC */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="type-label text-gray-2">{t("expiry")}</label>
              <input
                type="text"
                placeholder={t("expiryPlaceholder")}
                className="border border-black/20 bg-white px-4 py-3 type-body text-black placeholder:text-gray-3 outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="type-label text-gray-2">{t("cvc")}</label>
              <input
                type="text"
                placeholder={t("cvcPlaceholder")}
                className="border border-black/20 bg-white px-4 py-3 type-body text-black placeholder:text-gray-3 outline-none"
              />
            </div>
          </div>

          {/* Cardholder name */}
          <div className="flex flex-col gap-1.5">
            <label className="type-label text-gray-2">{t("cardholderName")}</label>
            <input
              type="text"
              placeholder={t("namePlaceholder")}
              className="border border-black/20 bg-white px-4 py-3 type-body text-black placeholder:text-gray-3 outline-none"
            />
          </div>

          {/* Summary */}
          <div className="flex items-center justify-between py-3 border-t border-black/10">
            <p className="type-body text-gray-2">{t("total")}</p>
            <p className="type-h4 text-black">{price} {t("perYear")}</p>
          </div>

          {/* Subscribe */}
          <button className="cursor-pointer bg-blue-2 text-white type-ui-medium w-full py-4 text-center hover:opacity-90 transition-opacity">
            {t("subscribe")}
          </button>

          <p className="type-caption text-gray-3 text-center">{t("comingSoon")}</p>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="h-px bg-black/15" />

      {/* ── Donation ── */}
      <div className="flex flex-col gap-6 w-full xl:max-w-155">
        <div className="flex flex-col gap-2">
          <h2 className="type-h3 text-black">{t("donationTitle")}</h2>
          <p className="type-body text-gray-2">{t("donationDesc")}</p>
        </div>

        {/* Quick amounts */}
        <div className="flex flex-wrap gap-3">
          {QUICK_AMOUNTS.map((amt) => (
            <button
              key={amt}
              onClick={() => { setDonation(amt); setCustomDonation(""); }}
              className={`cursor-pointer type-ui-medium px-6 py-2.5 border transition-colors ${donation === amt ? "bg-black text-white border-black" : "border-black/20 text-black hover:border-black"}`}
            >
              {amt}
            </button>
          ))}
        </div>

        {/* Custom amount */}
        <div className="flex flex-col gap-1.5">
          <label className="type-label text-gray-2">{t("donationCustom")}</label>
          <div className="flex items-center gap-2 border border-black/20 bg-white px-4 py-3">
            <span className="type-body text-gray-2">$</span>
            <input
              type="text"
              value={customDonation}
              onChange={(e) => { setCustomDonation(e.target.value); setDonation(""); }}
              placeholder="0.00"
              className="flex-1 bg-transparent type-body text-black placeholder:text-gray-3 outline-none"
            />
          </div>
        </div>

        <button className="cursor-pointer bg-blue-2 text-white type-ui-medium w-full xl:max-w-56 py-4 text-center hover:opacity-90 transition-opacity">
          {t("donate")}
        </button>
      </div>

    </div>
  );
}
