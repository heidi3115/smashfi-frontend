import {FaCircleArrowDown, FaCircleArrowUp} from "react-icons/fa6";

type SortableHeaderProps = {
    column: any;
    label: string;
    align?: "start" | "center" | "end";
}

export const SortableHeader = ({column, label, align = "start"}: SortableHeaderProps) => {
    const sorted = column.getIsSorted();

    const alignClass = align === "center" ? "justify-center" : align === "end" ? "justify-end" : "justify-start";

    return (
        <button
            className={`flex gap-2 items-center gap-2 w-full ${alignClass}`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            <span>{label}</span>
            {sorted === "asc" ? (
                <FaCircleArrowUp className="text-blue-500" />
            ) : sorted === "desc" ? (
                <FaCircleArrowDown className="text-blue-500" />
            ) : (
                <FaCircleArrowDown className="opacity-30" />
            )}
        </button>
    )
}