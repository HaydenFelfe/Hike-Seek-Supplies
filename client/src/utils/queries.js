import { gql } from '@apollo/client';

export const GET_CAMPING_ITEMS = gql`
  query {
    getCampingItems {
      id
      name
      description
      price
    }
  }
`;

export const GET_HIKING_ITEMS = gql`
  query {
    getHikingItems {
      id
      name
      description
      price
    }
  }
`;

export const GET_SNOW_ITEMS = gql`
  query{
    getSnowItems{
      id
      name
      description
      price
    }
  }
`;

export const GET_WATER_ITEMS = gql`
  query{
    getWaterItems{
      id
      name
      descirption
      price
    }
  }
`;

export const GET_TRAVEL_ITEMS = gql`
  query{
    getWaterItems{
      id
      name
      descirption
      price
    }
  }
`;

export const GET_USEDEQUIPMENT_ITEMS = gql`
  query{
    getWaterItems{
      id
      name
      descirption
      price
    }
  }
`;