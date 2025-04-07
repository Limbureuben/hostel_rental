import { gql } from "apollo-angular";


export const REGISTER_USER = gql`
  mutation RegisterUser(
    $username: String!
    $password: String!
    $confirmPassword: String!
    $role: String!
  ) {
    registerUser(
      username: $username
      password: $password
      confirmPassword: $confirmPassword
      role: $role
    ) {
      message
      success
      user {
        id
        isStaff
        username
      }
    }
  }
`;
