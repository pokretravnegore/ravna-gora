import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "sr-cyrl", "sr-latn"],
  defaultLocale: "en",
});
