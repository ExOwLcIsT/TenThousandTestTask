export default function TextInput(props: { value: string,
  onChange: (value: string) => void;
}) {
  return (
    <div className="input">
      <input type="text" value={props.value} onChange={(e) => props.onChange(e.target.value)} />
    </div>
  );
}
