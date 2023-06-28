/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGolferDetails = /* GraphQL */ `
  query GetGolferDetails($id: ID!) {
    getGolferDetails(id: $id) {
      id
      firstName
      lastName
      mobileNumber
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listGolferDetails = /* GraphQL */ `
  query ListGolferDetails(
    $filter: ModelGolferDetailsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGolferDetails(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastName
        mobileNumber
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
