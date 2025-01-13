export const PriceDisplay: React.FC<{ price: number }> = ({ price }) => {
  const formattedPrice = new Intl.NumberFormat("pl-PL", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);

  return <span>{formattedPrice} PLN</span>;
};
