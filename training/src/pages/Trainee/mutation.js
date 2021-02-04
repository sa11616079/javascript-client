import { gql } from 'apollo-boost';

const CREATE_TRAINEE = gql`
mutation CreateTrainee($name: String, $email: String, $password: String) {
  createTrainee(payload: { name: $name, email: $email,password: $password})
}
`;

const UPDATE_TRAINEE = gql`
mutation UpdateTrainee($originalId: String $name: String, $email: String) {
  updateTrainee(payload: { originalId: $originalId,name: $name, email: $email})
}
`;

const DELETE_TRAINEE = gql`
mutation deleteTrainee($originalId: String) {
  deleteTrainee(payload: { originalId: $originalId })
}
`;

export { DELETE_TRAINEE, UPDATE_TRAINEE, CREATE_TRAINEE };
