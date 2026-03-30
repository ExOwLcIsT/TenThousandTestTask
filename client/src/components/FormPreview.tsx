export default function FormPreview(props: {
  title: string;
  id: string;
  description: string;
}) {
  return (
    <>
      <div className="form-preview">
        <h2>{props.title}</h2>
        <p>{props.description}</p>
        <a href={`/form/${props.id}/fill`}>Fill</a>
        <a href={`/form/${props.id}/responses`}>Check responses</a>
      </div>
    </>
  );
}
