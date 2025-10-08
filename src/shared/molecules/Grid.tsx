import React from "react";

interface GridProps {
  cols: number;
  rows: number;
  width?: string;
  height?: string;
  className?: string;
  verticalGap?: number;
  horizontalGap?: string;
  elements: React.ReactElement[];
  style?: React.CSSProperties;
}

const Grid: React.FC<GridProps> = ({
  cols,
  rows,
  width,
  height,
  className,
  verticalGap,
  horizontalGap,
  elements,
  style,
}) => {
  const gridStyle: React.CSSProperties = {
    display: "grid",
    width: width,
    height: height,
    gridTemplateRows: `repeat(${rows}, 1fr)`,
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    columnGap: horizontalGap,
    rowGap: verticalGap,
    alignItems: "center",
    ...style,
  };

  return (
    <div style={gridStyle}>
      {elements.map((el, i) => {
        if (!React.isValidElement(el)) return null;
        return React.cloneElement(el, { key: `el-${i}` });
      })}
    </div>
  );
};

export default Grid;
