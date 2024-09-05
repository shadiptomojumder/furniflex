
export const formatEuroCurrency = (price: any) => {
  return Intl.NumberFormat("en-EU", {
    style: "currency",
    currency: "EUR",
  }).format(price);
};





export const formatDoller = (price:any) => {
  return Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
  }).format(price);
};
