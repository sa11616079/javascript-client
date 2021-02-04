import { gql } from 'apollo-boost';

const GET_TRAINEE = gql`
query GetTrainee($skip: Int, $limit: Int) {
  getAllTrainees(payload: {skip: $skip, limit: $limit}) {
    records{
      name,
      email,
      createdAt,
    },
    TotalCount,
  }
  }`;

export { GET_TRAINEE };
