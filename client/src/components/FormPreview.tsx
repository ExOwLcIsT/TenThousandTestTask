export default function FormPreview(props: { title: string; id: string }) {
  

  return (
    <>
      <a href={`/form/${props.id}`}>
        <div className="form-preview">
          <h2>{props.title}</h2>
        </div>
      </a>
    </>
  );
}
