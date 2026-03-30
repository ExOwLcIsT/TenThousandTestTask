import { useState, useEffect } from "react";
import QuestionItem from "../types/QuestionItem";
import TextInput from "./inputs/TextInput";
import DateInput from "./inputs/DateInput";
import RadioInput from "./inputs/RadioInput";
import CheckboxInput from "./inputs/CheckboxInput"; 

type QuestionProps = {
  question: QuestionItem;
  onAnswer: (value: string, values?: string[]) => void;
};

export default function Question({
  question,
  onAnswer
}: QuestionProps) {
  const [answer, setAnswer] = useState<string>("");
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  useEffect(() => {
    if (question.type === "checkbox") {
      onAnswer("", selectedValues);
    } else {
      onAnswer(answer);
    }
  }, [answer, selectedValues]);

  return (
    <div className="question">
      <p>{question.text}</p>
      <br />
      {
        {
          text: (
            <TextInput value={answer} onChange={(value) => setAnswer(value)} />
          ),
          date: (
            <DateInput value={answer} onChange={(value) => setAnswer(value)} />
          ),
          radio: (
            <RadioInput
              name={question.text}
              choices={question.choices}
              onChange={(value) => setAnswer(value)}
            />
          ),
          checkbox: (
            <CheckboxInput
              choices={question.choices}
              selectedValues={selectedValues}
              onChange={(values) => setSelectedValues(values)}
            />
          ),
        }[question.type]
      }
    </div>
  );
}
