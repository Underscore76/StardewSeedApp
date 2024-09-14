import { classNames } from "../../utils";

type InputFieldProps = {
  id: string;
  label: string;
  name: string;
  type: string;
  value: string | number;
  setValue: React.Dispatch<React.SetStateAction<string | number>>;
  maxValue?: number;
  minValue?: number;
};

export default function InputField(props: InputFieldProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.type === "number") {
      props.setValue(Number(event.target.value));
    } else {
      props.setValue(event.target.value);
    }
  };
  const invalidValue =
    typeof props.value === "number" &&
    ((props.minValue && props.value < props.minValue) ||
      (props.maxValue && props.value > props.maxValue));
  return (
    <div>
      <label
        htmlFor={props.name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {props.label}
      </label>
      <div className="mt-2">
        <input
          id={props.id}
          name={props.name}
          type={props.type}
          value={props.value}
          onChange={handleChange}
          min={props.minValue}
          max={props.maxValue}
          className={classNames(
            invalidValue
              ? "ring-red-300 focus:ring-red-600"
              : "focus:ring-indigo-600",
            "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
          )}
        />
      </div>
    </div>
  );
}
