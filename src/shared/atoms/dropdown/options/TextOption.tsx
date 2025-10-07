import Label from "../../labels/Label";
import { DropdownOption } from "../Dropdown";

export const createTextOption = (
    value: string,
    text: React.ReactElement<typeof Label>,
): DropdownOption<string> => ({
    value,
    content: text,
    key: `text-${value}`
});

export const createTextOptions = (
    options: Array<{ value: string; text: React.ReactElement<typeof Label> }>
): DropdownOption<string>[] =>
    options.map(opt => createTextOption(opt.value, opt.text))
