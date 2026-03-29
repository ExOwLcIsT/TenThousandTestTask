import { useState } from "react";
import QuestionItem from "../types/QuestionItem";

const questionTypes: readonly string[] = [
  "text",
  "radio",
  "checkboxes",
  "date",
  "time",
];

export default function QuestionEditor(props: {
  question: QuestionItem;
  onChange: (q: QuestionItem) => void;
}) {
  return (
    <div className="question-editor">
      <input
        id="text"
        name="text"
        type="text"
        value={props.question.text}
        onChange={(e) => {
          props.onChange({
            ...props.question,
            text: e.target.value,
          });
        }}
      />

      <select
        name="type"
        id="type"
        onChange={(e) => {
          props.onChange({
            ...props.question,
            type: e.target.value,
            choices: [],
          });
        }}
      >
        {questionTypes.map((qt, i) => (
          <option key={"option_" + i}>{qt}</option>
        ))}
      </select>
      <br />

      {props.question.type === "radio" && (
        <>
          {props.question.choices.map((c, i) => (
            <div className="radio-choice" key={"radio_" + i}>
              <input type="radio" />
              <input
                type="text"
                value={c}
                onChange={(e) => {
                  const newChoices = [...props.question.choices];
                  newChoices[i] = e.target.value;
                  props.onChange({ ...props.question, choices: newChoices });
                }}
              />
            </div>
          ))}
          <button
            onClick={() =>
              props.onChange({
                ...props.question,
                choices: [...props.question.choices, "new choice"],
              })
            }
          >
            Add choice
          </button>
        </>
      )}
      {props.question.type === "checkboxes" && (
        <>
          {props.question.choices.map((c, i) => (
            <div className="check-choice" key={"check_" + i}>
              <input type="checkbox" />
              <input
                type="text"
                value={c}
                onChange={(e) => {
                  const newChoices = [...props.question.choices];
                  newChoices[i] = e.target.value;
                  props.onChange({ ...props.question, choices: newChoices });
                }}
              />
            </div>
          ))}
          <button
            onClick={() =>
              props.onChange({
                ...props.question,
                choices: [...props.question.choices, "new choice"],
              })
            }
          >
            Add choice
          </button>
          <div>{props.question.choices.join(" ")}</div>
        </>
      )}
    </div>
  );
}
