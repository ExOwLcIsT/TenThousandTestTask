const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const cors = require("cors");
// --------------------
// In-memory storage
// --------------------
let forms = [];
let responses = [];

let nextFormId = 1;
let nextResponseId = 1;

// --------------------
// GraphQL schema
// --------------------
const schema = buildSchema(`
 

  type Question {
    id: ID!
    formId: ID!
    text: String!
    type: String!
    choices: [String!]
  }

  type Form {
    id: ID!
    title: String!
    description: String
    questions: [Question!]!
  }

  type Answer {
    questionId: ID!
    value: String
    values: [String!]
  }

  type Response {
    id: ID!
    formId: ID!
    answers: [Answer!]!
  }

  input QuestionInput {
    text: String!
    type: String!
    choices: [String!]
  }

  input AnswerInput {
    questionId: ID!
    value: String
    values: [String!]
  }

  type Query {
    forms: [Form!]!
    form(id: ID!): Form
    responses(formId: ID!): [Response!]!
  }

  type Mutation {
    createForm(
      title: String!
      description: String
      questions: [QuestionInput!]
    ): Form!

    submitResponse(
      formId: ID!
      answers: [AnswerInput!]!
    ): Response!
  }
`);

// --------------------
// Resolvers
// --------------------
const root = {
  // Queries
  forms: () => forms,

  form: ({ id }) => forms.find((f) => f.id === id),

  responses: ({ formId }) => responses.filter((r) => r.formId === formId),

  // Mutations
  createForm: ({ title, description, questions }) => {
    const formId = String(nextFormId++);
    const form = {
      id: formId,
      title,
      questions: (questions || []).map((q, index) => ({
        id: String(index + 1),
        formId: formId,
        text: q.text,
        type: q.type,
        choices: q.choices || [],
      })),
    };
    forms.push(form);
    return form;
  },

  submitResponse: ({ formId, answers }) => {
    const form = forms.find((f) => f.id === formId);
    if (!form) throw new Error("Form not found");

    const response = {
      id: String(nextResponseId++),
      formId,
      answers,
    };
    responses.push(response);
    return response;
  },
};

// --------------------
// Server setup
// --------------------
const app = express();
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  }),
);

app.listen(4000, () => {
  console.log("GraphQL server running at http://localhost:4000/graphql");
});
