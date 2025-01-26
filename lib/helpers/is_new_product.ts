export const isNewProduct = (createdAt: Date): boolean => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  return createdAt >= sevenDaysAgo;
};
