export const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

export const formatNumber = (value: number, maximumFractionDigits = 1) =>
  new Intl.NumberFormat("en", { maximumFractionDigits }).format(value);

export const countryFlag = (country: string) => {
  const flags: Record<string, string> = {
    India: "🇮🇳",
    "United States": "🇺🇸",
    Brazil: "🇧🇷",
    Kenya: "🇰🇪",
    Australia: "🇦🇺",
    Germany: "🇩🇪",
    Canada: "🇨🇦"
  };
  return flags[country] ?? "🌍";
};
