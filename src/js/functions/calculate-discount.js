export const calculateDiscount = (currentPrice, oldPrice) => {
  const discount = oldPrice - currentPrice;
  const discountPercentage = (discount / oldPrice) * 100;

  return discountPercentage.toFixed(0);
}
