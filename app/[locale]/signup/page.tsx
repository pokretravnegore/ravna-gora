import { getTranslations } from "next-intl/server";
import { Link } from "../../../i18n/navigation";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

export default async function SignUpPage() {
  const t = await getTranslations("auth");

  return (
    <div className="min-h-screen bg-offwhite-1 flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md flex flex-col gap-8">

          {/* Heading */}
          <div className="flex flex-col gap-2 text-center">
            <h1 className="type-h2 text-black">{t("signUpTitle")}</h1>
          </div>

          {/* Google */}
          <button className="cursor-pointer flex items-center justify-center gap-3 w-full border border-black/20 bg-white px-4 py-3 type-ui-medium text-black hover:bg-black/5 transition-colors">
            <GoogleIcon />
            {t("continueWithGoogle")}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-black/15" />
            <span className="type-caption text-gray-2 uppercase tracking-widest">{t("or")}</span>
            <div className="flex-1 h-px bg-black/15" />
          </div>

          {/* Form */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="type-label text-gray-2">{t("fullName")}</label>
              <input
                type="text"
                placeholder={t("namePlaceholder")}
                className="border border-black/20 bg-white px-4 py-3 type-body text-black placeholder:text-gray-3 outline-none focus:border-blue-2 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="type-label text-gray-2">{t("email")}</label>
              <input
                type="email"
                placeholder={t("emailPlaceholder")}
                className="border border-black/20 bg-white px-4 py-3 type-body text-black placeholder:text-gray-3 outline-none focus:border-blue-2 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="type-label text-gray-2">{t("password")}</label>
              <input
                type="password"
                placeholder={t("passwordPlaceholder")}
                className="border border-black/20 bg-white px-4 py-3 type-body text-black placeholder:text-gray-3 outline-none focus:border-blue-2 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="type-label text-gray-2">{t("confirmPassword")}</label>
              <input
                type="password"
                placeholder={t("passwordPlaceholder")}
                className="border border-black/20 bg-white px-4 py-3 type-body text-black placeholder:text-gray-3 outline-none focus:border-blue-2 transition-colors"
              />
            </div>

            <button className="cursor-pointer bg-blue-2 text-white type-ui-medium w-full py-3.5 text-center hover:opacity-90 transition-opacity mt-2">
              {t("signUp")}
            </button>
          </div>

          {/* Sign in link */}
          <p className="type-body text-gray-2 text-center">
            {t("hasAccount")}{" "}
            <Link href="/login" className="text-blue-2 hover:underline">
              {t("signInLink")}
            </Link>
          </p>

        </div>
      </main>

      <Footer />
    </div>
  );
}
