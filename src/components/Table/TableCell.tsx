interface TableCellProps {
  className?: string;
  children: string | React.ReactNode;
  colSpan?: number;
  asHead?: boolean;
}

export const TableCell: React.FC<TableCellProps> = ({
  children,
  className,
  colSpan,
  asHead = false,
}) => {
  const ComponentTag = asHead ? "th" : "td";
  return (
    <ComponentTag
      className={`px-2 py-2 sm:px-4 sm:py-6 font-medium ${
        asHead ? "text-lg text-gray-50" : "text-gray-900"
      } ${className ? className : null}`}
      colSpan={colSpan}
    >
      {children}
    </ComponentTag>
  );
};
