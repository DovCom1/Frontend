import { DropdownOption } from "../Dropdown";

export const createTextOption = (
    value: string,
    text: string,
): DropdownOption<string> => ({
    value,
    content: text,
    key: `text-${value}`
});

export const createTextOptions = (
    options: Array<{ value: string; text: string }>
): DropdownOption<string>[] =>
    options.map(opt => createTextOption(opt.value, opt.text))
