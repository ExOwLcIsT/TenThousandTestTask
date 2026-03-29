import { useEffect, useState } from "react";
import Question from "../components/Question";
import QuestionItem from "../types/QuestionItem";
import { useParams } from "react-router-dom";

export default function FormFill() {
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [title, setTitle] = useState<string>("")
  const { id } = useParams();
  useEffect(() => {

    console.log("ID"+id)
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

        console.log(json);
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
  
    console.log("ID"+id)
  return (
    <>
      <div className="form-filling">
        <h1>{title}</h1>
        <div className="form">
          {questions.map((question, i) => (
            <Question key={i} question={question} />
          ))}
        </div>
      </div>
    </>
  );
}
