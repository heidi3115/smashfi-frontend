"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Coin } from "@/app/types/coin";
import { useFavoriteStore } from "@/app/store/useFavoriteStore";
import SearchInput from "@/app/components/SearchInput";
import useDebounce from "@/app/hooks/useDebounce";
import { CoinListTable } from "@/app/components/ui/CoinListTable";


export default function CoinList() {
    const [coins, setCoins] = useState<Coin[]>([]);
    const { favorites, toggleFavorite, isFavorited } = useFavoriteStore();
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search);

    useEffect(() => {
        const fetchCoins = async () => {
            const res = await fetch('/api/coins');
            const data: Coin[] = await res.json();
            setCoins(data);
        };
        fetchCoins();
    }, []);

    const filteredCoins = useMemo(() => {
        if (!debouncedSearch) return coins;

        return coins.filter((coin) =>
            [coin.name, coin.symbol]
                .filter(Boolean)
                .some((it) =>
                    it.toLowerCase().includes(debouncedSearch.toLowerCase())
                )
        );
    }, [coins, debouncedSearch]);

    const handleFavoriteToggle = (coinId: string) => {
        const favoritedStatus = isFavorited(coinId);
        toggleFavorite(coinId);

        if (favoritedStatus) {
            toast.success("Successfully deleted!");
        } else {
            toast.success("Successfully added!");
        }
    }

    return (
        <div className="p-20">
            <h1 className="text-2xl">Coin List</h1>
            <div className="flex gap-5">
                <div>All</div>
                <div>My favorite</div>
            </div>
            <SearchInput
                placeholder="Search something...(BTC, Bitcoin, B...)"
                value={search}
                onChange={setSearch}
            />
            <CoinListTable
                coins={filteredCoins}
                onToggleFavorite={handleFavoriteToggle}
                isFavorited={isFavorited}
            />
        </div>
    )
}