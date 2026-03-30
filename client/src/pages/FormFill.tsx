import { useState } from "react";
import Question from "../components/Question";
import { useParams } from "react-router-dom";
import {
  useGetFormQuery,
  useSubmitResponseMutation,
} from "../app/api/generated";

export default function FormFill() {
  const { id } = useParams();

  const { data, isLoading, isError } = useGetFormQuery({ id: id! });
  const [submitResponse] = useSubmitResponseMutation();

  const [answers, setAnswers] = useState<
    { questionText: string; value?: string;}[]
  >([]);
  if (!id) return <div>No form id</div>;
  const updateAnswer = (
    questionText: string,
    value: string,
    values?: string[],
  ) => {
    setAnswers((prev) => {
      const existing = prev.find((a) => a.questionText === questionText);
      if (existing) {
        return prev.map((a) =>
          a.questionText === questionText ? { ...a, value, values } : a,
        );
      } else {
        return [...prev, { questionText, value, values }];
      }
    });
  };

  const submitForm = async () => {
    try {
      await submitResponse({ formId: id, answers }).unwrap();
      alert("Form submitted successfully!");
    } catch (err) {
      console.error("Failed to submit form:", err);
      alert("Failed to submit form");
    }
  };

  if (isLoading) return <div>Loading form...</div>;
  if (isError) return <div>Error loading form</div>;
  if (!data?.form) return <div>Form not found</div>;

  const form = data.form;

  return (
    <div className="form">
      <h1>{form.title}</h1>
      <p>{form.description}</p>
      <div className="form-container">
        {form.questions.map((question) => (
          <Question
            key={question.id}
            question={{
              id: question.id,
              text: question.text,
              type: question.type,
              choices: question.choices ?? [],
            }}
            onAnswer={(value, values) =>
              updateAnswer(question.text, value, values)
            }
          />
        ))}
      </div>
      <button onClick={submitForm}>Submit Form</button>
    </div>
  );
}
