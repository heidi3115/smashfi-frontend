import {FaCircleArrowDown, FaCircleArrowUp} from "react-icons/fa6";

type SortableHeaderProps = {
    column: any;
    label: string;
    align?: "left" | "center" | "right";
}

export const SortableHeader = ({column, label, align = "left"}: SortableHeaderProps) => {
    const sorted = column.getIsSorted();

    return (
        <button
            className={`flex gap-2 items-center gap-2 w-full justify-${align}`}
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