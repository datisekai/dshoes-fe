export const limitCart = (quantity) => {
  let newQuantity = quantity || 0;
  if (quantity && quantity > 5) {
    newQuantity = 5;
    return `${newQuantity}+`;
  }
  return newQuantity;
};
