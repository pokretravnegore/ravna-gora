"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Edition = "digital" | "print" | "both";

function SectionTitle({ title }: { title: string }) {
  return <h2 className="type-h3 text-black">{title}</h2>;
}

function Divider() {
  return <div className="h-px bg-black/10 w-full" />;
}

function Toggle({ active, onChange }: { active: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`cursor-pointer relative w-11 h-6 rounded-full transition-colors ${active ? "bg-blue-2" : "bg-black/20"}`}
      role="switch"
      aria-checked={active}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${active ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  );
}

export function AccountContent() {
  const t = useTranslations("account");
  const [twoFactor, setTwoFactor] = useState(false);
  const [edition, setEdition] = useState<Edition>("digital");

  const EDITIONS: { key: Edition; label: string }[] = [
    { key: "digital", label: t("digital") },
    { key: "print",   label: t("print") },
    { key: "both",    label: t("both") },
  ];

  return (
    <div className="flex flex-col gap-10 pb-(--space-8) max-w-[720px]">

      {/* ── Profile ── */}
      <section className="flex flex-col gap-6">
        <SectionTitle title={t("profile")} />

        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-blue-2 flex items-center justify-center shrink-0">
            <span className="type-h3 text-white select-none">JD</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="type-ui-medium text-black">John Doe</p>
            <p className="type-body text-gray-2">john.doe@example.com</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="type-label text-gray-2">{t("name")}</label>
              <input
                type="text"
                defaultValue="John Doe"
                className="border border-black/20 bg-white px-4 py-3 type-body text-black outline-none focus:border-blue-2 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="type-label text-gray-2">{t("email")}</label>
              <input
                type="email"
                defaultValue="john.doe@example.com"
                className="border border-black/20 bg-white px-4 py-3 type-body text-black outline-none focus:border-blue-2 transition-colors"
              />
            </div>
          </div>
          <div>
            <button className="cursor-pointer bg-blue-2 text-white type-ui-medium px-8 py-3 hover:opacity-90 transition-opacity">
              {t("saveChanges")}
            </button>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── Subscription ── */}
      <section className="flex flex-col gap-6">
        <SectionTitle title={t("subscription")} />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border border-black/15 p-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <p className="type-ui-medium text-black">{t("currentPlan")}</p>
              <span className="type-label text-white bg-blue-2 px-2.5 py-0.5">Full Member</span>
            </div>
            <p className="type-body text-gray-2">{t("renewsOn")} January 1, 2027</p>
          </div>
          <button className="cursor-pointer border border-black type-ui-medium text-black px-6 py-2.5 hover:bg-black hover:text-white transition-colors whitespace-nowrap self-start md:self-auto">
            {t("managePlan")}
          </button>
        </div>
      </section>

      <Divider />

      {/* ── Security ── */}
      <section className="flex flex-col gap-6">
        <SectionTitle title={t("security")} />

        {/* Change password */}
        <div className="flex flex-col gap-4">
          <p className="type-ui-medium text-black">{t("changePassword")}</p>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="type-label text-gray-2">{t("currentPassword")}</label>
              <input
                type="password"
                placeholder="••••••••"
                className="border border-black/20 bg-white px-4 py-3 type-body text-black outline-none focus:border-blue-2 transition-colors"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="type-label text-gray-2">{t("newPassword")}</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="border border-black/20 bg-white px-4 py-3 type-body text-black outline-none focus:border-blue-2 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="type-label text-gray-2">{t("confirmNewPassword")}</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="border border-black/20 bg-white px-4 py-3 type-body text-black outline-none focus:border-blue-2 transition-colors"
                />
              </div>
            </div>
            <div>
              <button className="cursor-pointer bg-blue-2 text-white type-ui-medium px-8 py-3 hover:opacity-90 transition-opacity">
                {t("updatePassword")}
              </button>
            </div>
          </div>
        </div>

        {/* 2FA */}
        <div className="flex items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            <p className="type-ui-medium text-black">{t("twoFactor")}</p>
            <p className="type-body text-gray-2">{t("twoFactorDesc")}</p>
          </div>
          <Toggle active={twoFactor} onChange={() => setTwoFactor((v) => !v)} />
        </div>
      </section>

      <Divider />

      {/* ── Preferences ── */}
      <section className="flex flex-col gap-6">
        <SectionTitle title={t("preferences")} />

        <div className="flex flex-col gap-3">
          <p className="type-ui-medium text-black">{t("newsletterDelivery")}</p>
          <div className="flex flex-wrap gap-3">
            {EDITIONS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setEdition(key)}
                className={`cursor-pointer type-ui-medium px-6 py-2.5 border transition-colors ${edition === key ? "bg-black text-white border-black" : "border-black/20 text-black hover:border-black"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── Danger zone ── */}
      <section className="flex flex-col gap-4">
        <SectionTitle title={t("dangerZone")} />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border border-red-500/30 p-6">
          <div className="flex flex-col gap-1">
            <p className="type-ui-medium text-black">{t("deleteAccount")}</p>
            <p className="type-body text-gray-2">{t("deleteAccountDesc")}</p>
          </div>
          <button className="cursor-pointer border border-red-500 text-red-500 type-ui-medium px-6 py-2.5 hover:bg-red-500 hover:text-white transition-colors whitespace-nowrap self-start md:self-auto">
            {t("deleteAccount")}
          </button>
        </div>
      </section>

    </div>
  );
}
