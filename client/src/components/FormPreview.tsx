export default function FormPreview(props: {
  title: string;
  id: string;
  description: string;
}) {
  return (
    <>
      <a href={`/form/${props.id}`}>
        <div className="form-preview">
          <h2>{props.title}</h2>
          <p>{props.description}</p>
        </div>
      </a>
    </>
  );
}
