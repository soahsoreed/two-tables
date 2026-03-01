export function isProduction() {
  const isProdRaw = import.meta.env.VITE_IS_PROD;
  const booleanToString = (target: string) => target === "true";
  const isProd = booleanToString(isProdRaw);
  // console.log('isProduction', isProd);
  return isProd;
}
