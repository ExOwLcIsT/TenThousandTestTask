type CheckInputProps = {
  choices: string[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
};

export default function CheckInput({ choices, selectedValues, onChange }: CheckInputProps) {
  const handleToggle = (choice: string) => {
    let newValues: string[];
    if (selectedValues.includes(choice)) {
      newValues = selectedValues.filter((v) => v !== choice);
    } else {
      newValues = [...selectedValues, choice];
    }
    onChange(newValues);
  };

  return (
    <div className="input">
      {choices.map((choice) => (
        <div key={choice}>
          <input
            type="checkbox"
            checked={selectedValues.includes(choice)}
            onChange={() => handleToggle(choice)}
          />
          <label>{choice}</label>
        </div>
      ))}
    </div>
  );
}