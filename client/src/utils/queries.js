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
    }
  }
`;

export const GET_ON_SALE_PRODUCTS = gql`
  query {
    getOnSaleProducts {
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
    }
  }
`;
