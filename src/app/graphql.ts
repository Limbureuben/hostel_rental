import { gql } from "apollo-angular";


export const REGISTER_USER = gql`
  mutation RegisterUser(
    $username: String!
    $password: String!
    $confirmPassword: String!
  ) {
    registerUser(
      username: $username
      password: $password
      confirmPassword: $confirmPassword
    ) {
      message
      success
      user {
        id
        isStaff
        isSuperuser
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      message
      role
      success
      user {
        id
        isStaff
        isSuperuser
        username
      }
    }
  }
`;
