export default function CheckboxInput(props: {
  choices: string[];
  onChange: (value: string) => void;
  value : boolean;
}) {
  return (
    <div className="input">
      {props.choices.map((choice) => (
        <>
          <input checked={props.value} type="checkbox" onChange={() => props.onChange(choice)} />
          <label>{choice}</label>
        </>
      ))}
    </div>
  );
}
