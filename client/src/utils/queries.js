import { gql } from '@apollo/client';

export const GET_CAMPING_PRODUCTS = gql`
  query {
    getCampingProducts {
      _id
      title
      description
      price
      image
      productId
      category
      isUsed
      isOnSale
      discountPercentage
      rating
      numReviews
      countInStock
      slug
    }
  }
`;

export const GET_HIKING_PRODUCTS = gql`
  query {
    getHikingProducts {
      _id
      title
      description
      price
      image
      productId
      category
      isUsed
      isOnSale
      discountPercentage
      rating
      numReviews
      countInStock
      slug
    }
  }
`;

export const GET_WATER_PRODUCTS = gql`
  query {
    getWaterProducts {
      _id
      title
      description
      price
      image
      productId
      category
      isUsed
      isOnSale
      discountPercentage
      rating
      numReviews
      countInStock
      slug
    }
  }
`;

export const GET_SNOW_PRODUCTS = gql`
  query {
    getSnowProducts {
      _id
      title
      description
      price
      image
      productId
      category
      isUsed
      isOnSale
      discountPercentage
      rating
      numReviews
      countInStock
      slug
    }
  }
`;

export const GET_TRAVEL_PRODUCTS = gql`
  query {
    getTravelProducts {
      _id
      title
      description
      price
      image
      productId
      category
      isUsed
      isOnSale
      discountPercentage
      rating
      numReviews
      countInStock
      slug
    }
  }
`;

export const GET_USED_PRODUCTS = gql`
  query {
    getUsedProducts {
      _id
      title
      description
      price
      image
      productId
      category
      isUsed
      isOnSale
      discountPercentage
      rating
      numReviews
      countInStock
      slug
    }
  }
`;

export const GET_DISCOUNTED_PRODUCTS = gql`
  query {
    getDiscountedProducts {
      _id
      title
      description
      price
      image
      productId
      category
      isUsed
      isOnSale
      discountPercentage
      rating
      numReviews
      countInStock
      slug
    }
  }
`;

export const GET_PRODUCT_BY_SLUG = gql`
  query GetProductBySlug($slug: String!) {
    getProductBySlug(slug: $slug) {
      _id
      title
      description
      price
      image
      productId
      category
      isUsed
      isOnSale
      discountPercentage
      rating
      numReviews
      countInStock
      slug
    }
  }
`;

export const GET_ALL_PRODUCTS = gql`
  query {
    getAllProducts {
      _id
      title
      description
      price
      image
      productId
      category
      isUsed
      isOnSale
      discountPercentage
      rating
      numReviews
      countInStock
      slug
    }
  }
`;

export const SEARCH_PRODUCTS_QUERY = gql`
  query SearchProducts($query: String!) {
    searchProducts(query: $query) {
      _id
      title
      description
      price
      image
      category
      isUsed
      isOnSale
      discountPercentage
      rating
      numReviews
      countInStock
      slug
    }
  }
`;