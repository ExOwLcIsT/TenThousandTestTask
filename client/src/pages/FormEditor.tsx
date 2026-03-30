import { useState } from "react";
import QuestionEditor from "../components/QuestionEditor";
import QuestionItem from "../types/QuestionItem";

export default function FormEditor() {
  const [title, setTitle] = useState<string>("");
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  async function publishForm() {
    if (!title) {
      alert("Form title is required");
      return;
    }


    try {
      const res = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            mutation CreateForm($title: String!, $questions: [QuestionInput!]) {
              createForm(title: $title, questions: $questions) {
                id
                title
              }
            }
          `,
          variables: {
            title,
            questions: questions.map((q) => ({
              text: q.text,
              type: q.type, 
              choices: q.choices?.length ? q.choices : undefined,
            })),
          },
        }),
      });

      const json = await res.json();
      const createdForm = json.data.createForm;

      // Optional: reset form editor
      setTitle("");
      setQuestions([]);
      alert(`Form "${createdForm.title}" created!`);
    } catch (err) {
      console.error("Failed to create form", err);
      alert("Failed to create form");
    } finally {
    }
  }
  function addQuestion() {
    setQuestions([
      ...questions,
      {
        type: "text",
        title: "",
        text: "",
        choices: [],
      },
    ]);
  }
  return (
    <>
      <label htmlFor="title">Form title</label>
      <input
        type="text"
        id="title"
        onChange={(e) => setTitle(e.target.value)}
      />
      {questions.map((q, id) => (
        <QuestionEditor
          key={"question_" + id}
          question={q}
          onChange={(updated) =>
            setQuestions((prev) =>
              prev.map((item, itemId) => (itemId === id ? updated : item)),
            )
          }
        />
      ))}
      <button onClick={addQuestion}>Add question</button>
      <button onClick={publishForm}>Submit</button>
    </>
  );
}
