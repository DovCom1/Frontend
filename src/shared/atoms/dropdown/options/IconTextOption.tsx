import React from "react";
import { DropdownOption } from "../Dropdown";
import Icon from "../../icons/Icon";

interface IconTextOptionProps {
  icon: React.ReactElement<typeof Icon>;
  text: string;
  gap?: number;
}

export const IconText: React.FC<IconTextOptionProps> = ({
  icon,
  text,
  gap = 8,
}) => (
  <div style={{ display: "flex", alignItems: "center", gap: `${gap}px` }}>
    {icon}
    <span>{text}</span>
  </div>
);

export const createIconTextOption = (
  value: string,
  icon: React.ReactElement<typeof Icon>,
  text: string
): DropdownOption<string> => ({
  value,
  content: <IconText icon={icon} text={text} />,
  key: `icon-text-${value}`,
});

export const createIconTextOptions = (
  options: Array<{
    value: string;
    icon: React.ReactElement<typeof Icon>;
    text: string;
  }>
): DropdownOption<string>[] =>
  options.map((opt) => createIconTextOption(opt.value, opt.icon, opt.text));

const extractIconFromContent = (
  content: React.ReactNode
): React.ReactElement<typeof Icon> | null => {
  if (!React.isValidElement(content)) {
    return null;
  }
  if (content.type === IconText) {
    const iconText = content.props as IconTextOptionProps;
    return iconText.icon;
  }
  if (content.type === Icon) {
    return content as React.ReactElement<typeof Icon>;
  }
  return null;
};

export const renderFirstNIcons = (
  selected: DropdownOption[],
  placeholder: React.ReactNode,
  maxVisible: number
) => {
  if (selected.length === 0) {
    return placeholder;
  }

  const visibleOptions = selected.slice(0, maxVisible);
  const remainingCount = selected.length - maxVisible;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
      }}
    >
      {visibleOptions.map((option) => {
        const icon = extractIconFromContent(option.content);

        if (!icon) {
          return (
            <div
              key={option.value}
              style={{
                width: "20px",
                height: "20px",
                background: "#4B5563",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                color: "#F6F6F6",
              }}
            >
              ?
            </div>
          );
        }

        const iconProps = icon.props as any;

        return (
          <div key={option.value}>
            {React.cloneElement(icon, {
              ...iconProps,
              size: "20px",
              style: {
                ...(iconProps.style || {}),
                borderRadius: "4px",
              },
            } as any)}
          </div>
        );
      })}

      {remainingCount > 0 && (
        <span
          style={{
            color: "#9CA3AF",
            fontSize: "12px",
            background: "#4B5563",
            padding: "2px 6px",
            borderRadius: "8px",
          }}
        >
          +{remainingCount}
        </span>
      )}
    </div>
  );
};
