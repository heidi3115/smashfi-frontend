"use client";

import { useState, useMemo } from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table";
import { Coin } from "@/app/types/coin";
import { SortableHeader } from "@/app/components/ui/SortableHeader";
import {CoinListRow} from "@/app/components/features/coins/CoinListRow";

type TableProps = {
    coins: Coin[]
    onToggleFavorite: (coinId: string) => void
    isFavorited: (coinId: string) => boolean
}

export const CoinListTable = ({coins, onToggleFavorite, isFavorited}: TableProps) => {
    const [sorting, setSorting] = useState([
        {id: "price", desc: true} // 초기정렬 Price 내림차순
    ])

    const columns = useMemo<ColumnDef<Coin>[]>(() => [
        {accessorKey: "name", header: "Name"},
        {
            accessorKey: "price",
            header: ({column}) => <SortableHeader column={column} label="Price" />
        },
        {
            accessorKey: "change24h",
            header: ({column}) => <SortableHeader column={column} label="24h Change" align="center" />
        },
        {
            accessorKey: "volume24h",
            header: ({column}) => <SortableHeader column={column} label="24h Volume" align="end" />
        },
        {
            accessorKey: "marketCap",
            header: ({column}) => <SortableHeader column={column} label="Market Cap" align="end" />
        },
    ], [])

    const table = useReactTable({
        data: coins,
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    return (
     <div>
         <table className="min-w-full border-separate border-spacing-y-6 py-2">
             <thead>
             {table.getHeaderGroups().map(headerGroup => (
                 <tr key={headerGroup.id} className="text-gray-400 text-sm">
                     {headerGroup.headers.map(header => (
                         <th key={header.id} className="text-left">
                             {flexRender(header.column.columnDef.header, header.getContext())}
                         </th>
                     ))}
                 </tr>
             ))}
             </thead>
             <tbody>
             {table.getRowModel().rows.map((it) => (
                 <CoinListRow
                    key={it.id}
                    coin={it.original}
                    onToggleFavorite={() => onToggleFavorite(it.original.id)}
                    isFavorited={isFavorited(it.original.id)}
                 />
             ))}
             </tbody>
         </table>
     </div>
    )
}