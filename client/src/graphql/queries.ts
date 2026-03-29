import { gql } from "graphql-tag";

export const GET_FORMS = gql`
  query GetForms {
    forms {
      id
      title
    }
  }
`;