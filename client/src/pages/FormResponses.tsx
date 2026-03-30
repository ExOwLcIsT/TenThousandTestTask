import { useParams } from "react-router-dom";
import { useGetFormQuery } from "../app/api/generated";
import { useGetResponsesQuery } from "../app/api/generated";

export default function FormResponses() {
  const { id } = useParams();

  const { data: formData } = useGetFormQuery(
    { id: id! },
    { skip: !id }
  );

  const { data, isLoading, isError } = useGetResponsesQuery(
    { formId: id! },
    { skip: !id }
  );

  if (!id) return <div>No form id</div>;
  if (isLoading) return <div>Loading responses...</div>;
  if (isError) return <div>Error loading responses</div>;

  return (
    <div>
      <h1>Responses for: {formData?.form?.title}</h1>

      {data?.responses.length === 0 && <p>No responses yet</p>}

      {data?.responses.map((response) => (
        <div key={response.id} className="response">
          <h4>Response #{response.id}</h4>

          {response.answers.map((a) => (
            <div key={a.questionText}>
              <b>{a.questionText}:</b>{" "}
              {a.value}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}