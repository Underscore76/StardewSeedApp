import { Field, Label, Switch } from "@headlessui/react";

type ToggleProps = {
  value: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
};

export default function Toggle(props: ToggleProps) {
  return (
    <Field className="flex items-center">
      <Switch
        checked={props.value}
        onChange={props.setValue}
        className="group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 data-[checked]:bg-green-600"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
        />
      </Switch>
      <Label as="span" className="ml-3 text-sm">
        <span className="font-medium text-gray-900">{props.text}</span>
      </Label>
    </Field>
  );
}
