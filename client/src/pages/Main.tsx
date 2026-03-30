import { useEffect, useState } from "react";
import FormPreview from "../components/FormPreview";

export default function Main() {
  const [forms, setForms] = useState<{ id: string; title: string }[]>([]);
  useEffect(() => {
    async function fetchForms() {
      try {
        const res = await fetch("http://localhost:4000/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `
            query {
              forms {
              id, title
              }
            }
          `,
          }),
        });

        const json = await res.json();

        const dataForms = json.data.forms;
        // Optional: reset form editor
        setForms(dataForms);
      } catch (err) {
        console.error("Failed to load forms", err);
        alert("Failed to load forms");
      }
    }
    fetchForms();
  }, []);
  return (
    <>
      <a href="/form/create">
        {" "}
        <div className=" form-preview create-form">Create form</div>
      </a>
      <br />
      <hr />
      {forms.map((f) => (
        <FormPreview title={f.title} id={f.id} key={`form_${f.id}`}></FormPreview>
      ))}
    </>
  );
}
