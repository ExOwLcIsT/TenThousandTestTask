export default function DateInput(props: { value : string, onChange: (value: string) => void }) {
  return (
    <div className="input">
      <input type="date" value={props.value} onChange={(e) => props.onChange(e.target.value)} />
    </div>
  );
}
