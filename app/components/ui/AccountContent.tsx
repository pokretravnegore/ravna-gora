"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "../../../i18n/navigation";
import { useAuth } from "../providers/AuthProvider";
import { supabase } from "../../../lib/supabase";

// type Edition = "digital" | "print" | "both";

function SectionTitle({ title }: { title: string }) {
  return <h2 className="type-h3 text-black">{title}</h2>;
}

function Divider() {
  return <div className="h-px bg-black/10 w-full" />;
}

// function Toggle({ active, onChange }: { active: boolean; onChange: () => void }) {
//   return (
//     <button
//       onClick={onChange}
//       className={`cursor-pointer relative w-11 h-6 rounded-full transition-colors ${active ? "bg-blue-2" : "bg-black/20"}`}
//       role="switch"
//       aria-checked={active}
//     >
//       <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${active ? "translate-x-5" : "translate-x-0"}`} />
//     </button>
//   );
// }

function initials(name: string | undefined, email: string | undefined): string {
  if (name) {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (email ?? "?").slice(0, 2).toUpperCase();
}

export function AccountContent() {
  const t = useTranslations("account");
  const tAuth = useTranslations("auth");
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  // const [twoFactor, setTwoFactor] = useState(false);
  // const [edition, setEdition] = useState<Edition>("digital");

  // Profile
  const [name, setName] = useState("");
  // const [email, setEmail] = useState(""); // email update disabled for now
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileMsg, setProfileMsg] = useState<{ text: string; ok: boolean } | null>(null);

  // Password
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [newPwTouched, setNewPwTouched] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);
  const [pwMsg, setPwMsg] = useState<{ text: string; ok: boolean } | null>(null);

  useEffect(() => {
    if (user) {
      setName(user.user_metadata?.full_name ?? "");
      // setEmail(user.email ?? "");
    }
  }, [user]);

  if (authLoading) {
    return <div className="type-body text-gray-2 py-10">…</div>;
  }

  if (!user) {
    return (
      <div className="flex flex-col gap-4 py-10">
        <p className="type-body text-gray-2">{t("notLoggedIn")}</p>
        <button
          onClick={() => router.push("/login")}
          className="cursor-pointer bg-blue-2 text-white type-ui-medium px-8 py-3 hover:opacity-90 transition-opacity self-start"
        >
          {t("goToSignIn")}
        </button>
      </div>
    );
  }

  const newPwRequirements = [
    { label: tAuth("reqMinLength"), met: newPw.length >= 8 },
    { label: tAuth("reqLowercase"), met: /[a-z]/.test(newPw) },
    { label: tAuth("reqUppercase"), met: /[A-Z]/.test(newPw) },
    { label: tAuth("reqNumber"),    met: /[0-9]/.test(newPw) },
    { label: tAuth("reqSymbol"),    met: /[^a-zA-Z0-9]/.test(newPw) },
  ];

  async function handleProfileSave(e: React.FormEvent) {
    e.preventDefault();
    setProfileMsg(null);
    setProfileLoading(true);

    if (name === (user?.user_metadata?.full_name ?? "")) {
      setProfileLoading(false);
      setProfileMsg({ text: t("successProfileUpdate"), ok: true });
      return;
    }

    const { error } = await supabase.auth.updateUser({ data: { full_name: name } });
    setProfileLoading(false);

    if (error) {
      setProfileMsg({ text: t("errorGeneric"), ok: false });
      return;
    }

    setProfileMsg({ text: t("successProfileUpdate"), ok: true });
  }

  async function handlePasswordUpdate(e: React.FormEvent) {
    e.preventDefault();
    setPwMsg(null);

    if (!newPwRequirements.every((r) => r.met)) {
      setPwMsg({ text: t("errorGeneric"), ok: false });
      return;
    }
    if (newPw !== confirmPw) {
      setPwMsg({ text: t("errorPasswordMismatch"), ok: false });
      return;
    }

    setPwLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user?.email ?? "",
      password: currentPw,
    });

    if (signInError) {
      setPwLoading(false);
      setPwMsg({ text: t("errorCurrentPassword"), ok: false });
      return;
    }

    const { error } = await supabase.auth.updateUser({ password: newPw });
    setPwLoading(false);

    if (error) {
      setPwMsg({ text: t("errorGeneric"), ok: false });
      return;
    }

    setPwMsg({ text: t("successPasswordUpdate"), ok: true });
    setCurrentPw("");
    setNewPw("");
    setConfirmPw("");
    setNewPwTouched(false);
  }

  // const EDITIONS: { key: Edition; label: string }[] = [
  //   { key: "digital", label: t("digital") },
  //   { key: "print",   label: t("print") },
  //   { key: "both",    label: t("both") },
  // ];

  return (
    <div className="flex flex-col gap-10 pb-(--space-8) max-w-180">

      {/* ── Profile ── */}
      <section className="flex flex-col gap-6">
        <SectionTitle title={t("profile")} />

        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-blue-2 flex items-center justify-center shrink-0">
            <span className="type-h3 text-white select-none">
              {initials(user.user_metadata?.full_name, user.email)}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="type-ui-medium text-black">{user.user_metadata?.full_name || user.email}</p>
            <p className="type-body text-gray-2">{user.email}</p>
          </div>
        </div>

        <form onSubmit={handleProfileSave} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="type-label text-gray-2">{t("name")}</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-black/20 bg-white px-4 py-3 type-body text-black outline-none focus:border-blue-2 transition-colors"
            />
          </div>
          {/* email update disabled for now
          <div className="flex flex-col gap-1.5">
            <label className="type-label text-gray-2">{t("email")}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-black/20 bg-white px-4 py-3 type-body text-black outline-none focus:border-blue-2 transition-colors"
            />
          </div>
          */}

          {profileMsg && (
            <p className={`type-caption ${profileMsg.ok ? "text-green-700" : "text-red-600"}`}>
              {profileMsg.text}
            </p>
          )}

          <div>
            <button
              type="submit"
              disabled={profileLoading}
              className="cursor-pointer bg-blue-2 text-white type-ui-medium px-8 py-3 hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {profileLoading ? "…" : t("saveChanges")}
            </button>
          </div>
        </form>
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

        <form onSubmit={handlePasswordUpdate} className="flex flex-col gap-4">
          <p className="type-ui-medium text-black">{t("changePassword")}</p>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="type-label text-gray-2">{t("currentPassword")}</label>
              <input
                type="password"
                placeholder="••••••••"
                value={currentPw}
                onChange={(e) => setCurrentPw(e.target.value)}
                className="border border-black/20 bg-white px-4 py-3 type-body text-black outline-none focus:border-blue-2 transition-colors"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="type-label text-gray-2">{t("newPassword")}</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={newPw}
                  onChange={(e) => setNewPw(e.target.value)}
                  onFocus={() => setNewPwTouched(true)}
                  className="border border-black/20 bg-white px-4 py-3 type-body text-black outline-none focus:border-blue-2 transition-colors"
                />
                {newPwTouched && (
                  <div className="flex flex-col gap-1 mt-1">
                    <p className="type-caption text-gray-2">{tAuth("passwordHint")}</p>
                    {newPwRequirements.map((req) => (
                      <div key={req.label} className="flex items-center gap-1.5">
                        <span className={`text-xs ${req.met ? "text-green-600" : "text-gray-2"}`}>
                          {req.met ? "✓" : "○"}
                        </span>
                        <span className={`type-caption ${req.met ? "text-green-600" : "text-gray-2"}`}>
                          {req.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="type-label text-gray-2">{t("confirmNewPassword")}</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPw}
                  onChange={(e) => setConfirmPw(e.target.value)}
                  className="border border-black/20 bg-white px-4 py-3 type-body text-black outline-none focus:border-blue-2 transition-colors"
                />
              </div>
            </div>

            {pwMsg && (
              <p className={`type-caption ${pwMsg.ok ? "text-green-700" : "text-red-600"}`}>
                {pwMsg.text}
              </p>
            )}

            <div>
              <button
                type="submit"
                disabled={pwLoading}
                className="cursor-pointer bg-blue-2 text-white type-ui-medium px-8 py-3 hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                {pwLoading ? "…" : t("updatePassword")}
              </button>
            </div>
          </div>
        </form>

        {/* two-factor authentication — disabled for now
        <div className="flex items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            <p className="type-ui-medium text-black">{t("twoFactor")}</p>
            <p className="type-body text-gray-2">{t("twoFactorDesc")}</p>
          </div>
          <Toggle active={twoFactor} onChange={() => setTwoFactor((v) => !v)} />
        </div>
        */}
      </section>

      {/* newsletter delivery preferences — disabled for now
      <Divider />

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
      */}

      <Divider />

      {/* ── Sign out ── */}
      <section className="flex flex-col gap-4">
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            router.push("/");
          }}
          className="cursor-pointer border border-black/20 type-ui-medium text-black px-8 py-3 hover:bg-black hover:text-white transition-colors self-start"
        >
          {t("signOut")}
        </button>
      </section>

    </div>
  );
}
