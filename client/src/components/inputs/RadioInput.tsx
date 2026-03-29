export default function RadioInput(props: {
  choices: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="input">
      {props.choices.map((choice) => (
        <>
          <input type="radio" onChange={() => props.onChange(choice)} />{" "}
          <label>{choice}</label>
        </>
      ))}
    </div>
  );
}
