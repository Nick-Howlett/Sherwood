export const formatMoney = float => {
  if(float === "—"){ // error check for — in stock details
    return float;
  } else if(typeof(float) === "string") return "$" + float;
  return `$${float.toFixed(2)}`;
}