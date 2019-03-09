export const formatMoney = float => {
  if(typeof float === "string"){ // error check for — in stock details
    return float;
  }
  return `$${float.toFixed(2)}`;
}