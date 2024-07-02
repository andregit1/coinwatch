function formatNumber(number) {
  const SI_SYMBOLS = ["", "k", "M", "B", "T", "P", "E"];
  const absNumber = Math.abs(number);
  const tier = Math.floor(Math.log10(absNumber) / 3);

  if (tier === 0) return number.toString();

  const scaledNumber = (absNumber / Math.pow(10, tier * 3));
  const formattedNumber = scaledNumber.toFixed(1); // Adjust decimal places as needed

  return formattedNumber + SI_SYMBOLS[tier];
}

export default formatNumber;
