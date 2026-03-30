import FormPreview from "../components/FormPreview";
import { useGetFormsQuery } from "../app/api/generated";

export default function Main() {
  const { data: forms, isLoading, isError } = useGetFormsQuery();
  console.log(forms);
  return (
    <>
      <a href="/form/create">
        {" "}
        <div className=" form-preview create-form">Create form</div>
      </a>
      <br />
      <hr />
      {isLoading && <div>Forms are loading</div>}
      {forms?.forms.map((f) => (
        <FormPreview
          title={f.title}
          id={f.id}
          key={`form_${f.id}`}
          description={f.description}
        ></FormPreview>
      ))}
    </>
  );
}
