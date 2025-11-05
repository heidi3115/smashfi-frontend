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
    const { toggleFavorite, isFavorited } = useFavoriteStore();
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search);

    const [currentTab, setCurrentTab] = useState<"all" | "favorite">("all");

    useEffect(() => {
        const fetchCoins = async () => {
            const res = await fetch('/api/coins');
            const data: Coin[] = await res.json();

            setCoins(data);
        };

        fetchCoins();
    }, []);

    const displayCoins = useMemo(() => {
        const list = currentTab === "favorite"
            ? coins.filter(coin => isFavorited(coin.id))
            : coins;

        if (!debouncedSearch) return list;

        return list.filter((coin) =>
            [coin.name, coin.symbol]
                .filter(Boolean)
                .some((it) =>
                    it.toLowerCase().includes(debouncedSearch.toLowerCase())
                )
        )
    }, [coins, debouncedSearch, currentTab, isFavorited]);

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
            <h1 className="text-3xl font-bold py-5">Coin List</h1>
            <div className="flex text-lg gap-10 font-bold py-5">
                <button
                    onClick={() => setCurrentTab("all")}
                    className={`cursor-pointer ${currentTab === "all" ? "text-border" : "text-gray-400"}`}

                >
                    All
                </button>
                <button
                    onClick={() => setCurrentTab("favorite")}
                    className={`cursor-pointer ${currentTab === "favorite" ? "text-border" : "text-gray-400"}`}
                >
                    My favorite
                </button>
            </div>
            <SearchInput
                placeholder="Search something...(BTC, Bitcoin, B...)"
                value={search}
                onChange={setSearch}
            />
            <CoinListTable
                coins={displayCoins}
                onToggleFavorite={handleFavoriteToggle}
                isFavorited={isFavorited}
            />
        </div>
    )
}