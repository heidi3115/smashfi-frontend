import {FaCircleArrowDown, FaCircleArrowUp} from "react-icons/fa6";
import {Column} from "@tanstack/react-table";

type SortableHeaderProps<TData> = {
    column: Column<TData, unknown>;
    label: string;
    align?: "start" | "center" | "end";
}

export const SortableHeader = <TData,>({
                                   column,
                                   label,
                                   align = "start",
}: SortableHeaderProps<TData>) => {
    const sorted = column.getIsSorted();

    const alignClass = {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
    };

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