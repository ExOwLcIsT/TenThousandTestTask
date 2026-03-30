export default function RadioInput(props: {
  name: string;
  choices: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="input">
      {props.choices.map((choice, index) => (
        <div key={`radio_choice_${index}`}>
          <input type="radio" onChange={() => props.onChange(choice)} name={props.name}/>{" "}
          <label>{choice}</label>
        </div>
      ))}
    </div>
  );
}
