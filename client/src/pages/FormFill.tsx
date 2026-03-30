import { useEffect, useState } from "react";
import Question from "../components/Question";
import QuestionItem from "../types/QuestionItem";
import { useParams } from "react-router-dom";

export default function FormFill() {
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [title, setTitle] = useState<string>("");
  const [answers, setAnswers] = useState<
    { questionId: string; value?: string; values?: string[] }[]
  >([]);
  const { id } = useParams();
  useEffect(() => {
    if (!id) return;
    async function fetchForm() {
      try {
        const res = await fetch("http://localhost:4000/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `
              query GetForm($id: ID!) {
                form(id: $id) {
                  id
                  title
                  questions {
                    id
                    text
                    type
                    choices
                  }
                }
              }
            `,
            variables: { id },
          }),
        });

        const json = await res.json();

        if (json.errors) {
          console.error("GraphQL errors:", json.errors);
          return;
        }

        const form = json.data.form;
        if (form) {
          setTitle(form.title);
          setQuestions(form.questions);
        }
      } catch (err) {
        console.error("Failed to fetch form:", err);
      }
    }

    fetchForm();
  }, [id]);
  if (!id) {
    return <div>No form id</div>;
  }

  const updateAnswer = (
    questionId: string,
    value: string,
    values?: string[],
  ) => {
    setAnswers((prev) => {
      if (prev.find((a) => a.questionId === questionId) !== undefined) {
        return prev.map((a) =>
          a.questionId === questionId ? { ...a, value, values } : a,
        );
      } else {
        return [...prev, { questionId, value, values }];
      }
    });
  };
  const submitForm = async () => {
    try {
      const res = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            mutation SubmitResponse($formId: ID!, $answers: [AnswerInput!]!) {
              submitResponse(formId: $formId, answers: $answers) {
                id
                formId
              }
            }
          `,
          variables: {
            formId: id,
            answers,
          },
        }),
      });
      const json = await res.json();
      if (json.errors) {
        console.error("GraphQL errors:", json.errors);
        return;
      }

      alert("Form submitted successfully!");
    } catch (err) {
      console.error("Failed to submit form:", err);
    }
  };
  return (
    <>
      <div className="form-filling">
        <h1>{title}</h1>
        <div className="form">
          {questions.map((question) => (
            <Question
              key={question.id}
              question={question}
              onAnswer={(value, values) =>
                updateAnswer(question.id!, value, values)
              }
            />
          ))}
        </div>
        <button onClick={submitForm}>Submit Form</button>
      </div>
    </>
  );
}
