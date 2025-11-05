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
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import Image from "next/image";
import { formatNumber } from "@/utils/commonUtils";
import { SortableHeader } from "@/app/components/ui/SortableHeader";

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
         <table className="min-w-full border-separate border-spacing-y-2 py-2">
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
             {table.getRowModel().rows.map((row) => (
                 <tr key={row.id}>
                     <td className="flex items-center gap-2">
                            <button onClick={() => onToggleFavorite(row.original.id)}>
                                {isFavorited(row.original.id) ? (
                                    <FaStar className="text-yellow-400" />
                                ) : (
                                    <CiStar />
                                )}
                            </button>
                         <Image
                             src={row.original.icon}
                             alt={row.original.name}
                             width={24}
                             height={24}
                         />
                         <span className="font-semibold">{row.original.symbol}</span>
                         <span className="text-gray-400">{row.original.name}</span>
                     </td>
                     <td>
                         <div className="flex flex-col gap-1">
                             <span>{row.original.price}</span>
                             <span>{formatNumber(row.original.price)}</span>
                         </div>
                     </td>
                     <td className={`text-center ${row.original.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                         {row.original.change24h > 0 ? "+" : ""}{row.original.change24h}%
                     </td>
                     <td className="text-right">{formatNumber(row.original.volume24h)}</td>
                     <td className="text-right">{formatNumber(row.original.marketCap)}</td>
                 </tr>
             ))}
             </tbody>
         </table>
     </div>
    )
}