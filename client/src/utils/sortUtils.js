const sortProducts = (products, sortByOption) => {
  let sortedProducts = [...products];
  switch (sortByOption) {
    case 'price-asc':
      sortedProducts.sort((a, b) => {
        const discountedPriceA = a.discountPercentage
          ? a.price - a.price * (a.discountPercentage / 100)
          : a.price;
        const discountedPriceB = b.discountPercentage
          ? b.price - b.price * (b.discountPercentage / 100)
          : b.price;
        return discountedPriceA - discountedPriceB;
      });
      break;
    case 'price-desc':
      sortedProducts.sort((a, b) => {
        const discountedPriceA = a.discountPercentage
          ? a.price - a.price * (a.discountPercentage / 100)
          : a.price;
        const discountedPriceB = b.discountPercentage
          ? b.price - b.price * (b.discountPercentage / 100)
          : b.price;
        return discountedPriceB - discountedPriceA;
      });
      break;
    case 'rating-desc':
      sortedProducts.sort((a, b) => b.rating - a.rating);
      break;
    case 'numReviews-desc':
      sortedProducts.sort((a, b) => b.numReviews - a.numReviews);
      break;
    default:
      break;
  }
  return sortedProducts;
};

export default sortProducts;
