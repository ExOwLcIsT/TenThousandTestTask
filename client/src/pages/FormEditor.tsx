import { useState } from "react";
import QuestionEditor from "../components/QuestionEditor";
import QuestionItem from "../types/QuestionItem";
import { useCreateFormMutation } from "../app/api/generated";

export default function FormEditor() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [createForm, { isLoading, error }] = useCreateFormMutation();
  async function publishForm() {
    if (!title) {
      alert("Form title is required");
      return;
    }

    try {
      const result = await createForm({
        title,
        description: description || "", // ensure non-null
        questions: questions.map((q) => ({
          text: q.text,
          type: q.type,
          choices: q.choices?.length ? q.choices : undefined,
        })),
      }).unwrap();
      setTitle("");
      setDescription("");
      setQuestions([]);
      alert(`Form "${result.createForm.title}" created!`);
    } catch (err) {
      console.error("Failed to create form", err);
      alert("Failed to create form");
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
      <br />
      <label htmlFor="description">Form description</label>
      <input
        type="text"
        id="description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
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
