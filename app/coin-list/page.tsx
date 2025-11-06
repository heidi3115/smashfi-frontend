"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {Coin} from "@/app/types/coin";
import { useFavoriteStore } from "@/app/store/useFavoriteStore";
import SearchInput from "@/app/components/common/SearchInput";
import { useDebounce } from "@/app/hooks/useDebounce";
import { CoinListTable } from "@/app/components/ui/CoinListTable";
import {Tab, TabItem} from "@/app/components/common/Tab";


type CoinTab = "all" | "favorite"

export default function CoinList() {
    const [coins, setCoins] = useState<Coin[]>([]);
    const { toggleFavorite, isFavorited } = useFavoriteStore();
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search);

    const [currentTab, setCurrentTab] = useState<CoinTab>("all");

    const tabItems: TabItem<CoinTab>[] = [
        {value: "all", label: "All"},
        {value: "favorite", label: "My Favorite"},
    ]


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
            <Tab items={tabItems} activeTab={currentTab} onTabChange={setCurrentTab} />
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