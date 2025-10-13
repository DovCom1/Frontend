import Label from "../../labels/Label";
import { DropdownOption } from "../Dropdown";

export const createTextOption = (
  value: string,
  text: string
): DropdownOption<string> => ({
  value,
  content: <Label text={text} color="white" />,
  key: `text-${value}`,
});

export const createTextOptions = (
  options: Array<{ value: string; text: string }>
): DropdownOption<string>[] =>
  options.map((opt) => createTextOption(opt.value, opt.text));
