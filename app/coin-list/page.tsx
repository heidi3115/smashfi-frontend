"use client";

import {useEffect, useMemo, useState} from "react";
import {formatNumber} from "@/utils/commonUtils";
import Image from "next/image";
import { IoSearchOutline } from "react-icons/io5";
import { FaCircleArrowDown } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

import toast from "react-hot-toast";
import { Coin } from "@/app/types/coin";
import {useFavoriteStore} from "@/app/store/useFavoriteStore";


export default function CoinList() {
    const [coins, setCoins] = useState<Coin[]>([]);
    const { favorites, toggleFavorite, isFavorited } = useFavoriteStore();
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");


    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => clearTimeout(handler);
    }, [search]);


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

    useEffect(() => {
        const fetchCoins = async () => {
            const res = await fetch('/api/coins');
            const data: Coin[] = await res.json();

            setCoins(data);
        };

        fetchCoins();
    }, []);


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
            <div className="flex gap-2 items-center bg-[#1e1e1e] rounded-full px-4 py-2 w-full mx-auto shadow-md">
                <div><IoSearchOutline color="gray" /></div>
                <input
                    type="text"
                    placeholder="Search something...(BTC, Bitcoin, B...)"
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-transparent text-gray-200 placeholder-gray-500 focus:outline-none"
                />
            </div>
            <table className="min-w-full border-separate border-spacing-y-2">
                <thead>
                <tr className='text-gray-400 text-sm'>
                    <th className="text-left">Name</th>
                    <th className="text-left">Price</th>
                    <th>
                        <div className="flex gap-2 items-center">
                            <span>24h Change</span>
                            <span><FaCircleArrowDown /></span>
                        </div>

                    </th>
                    <th>
                        <div className="flex gap-2 items-center">
                            <span>24h Volume</span>
                            <span><FaCircleArrowDown /></span>
                        </div>

                    </th>
                    <th>Market Cap</th>
                </tr>
                </thead>
                <tbody>
                {filteredCoins.map((coin) => (
                    <tr key={coin.id}>
                        <td className="flex items-center gap-2">
                            <span onClick={() => handleFavoriteToggle(coin.id)}>
                                {isFavorited(coin.id) ? (
                                    <FaStar className="text-yellow-400" />
                                ) : (
                                    <CiStar />
                                )}
                            </span>
                            <Image
                                src={coin.icon}
                                alt={coin.name}
                                width={24}
                                height={24}
                            />
                            <span className="font-semibold">{coin.symbol}</span>
                            <span className="text-gray-400">{coin.name}</span>
                        </td>
                        <td>
                            <div className="flex flex-col gap-1">
                                <span>{coin.price}</span>
                                <span>{formatNumber(coin.price)}</span>
                            </div>
                        </td>
                        <td className="text-center">{coin.change24h}%</td>
                        <td className="text-right">{formatNumber(coin.volume24h)}</td>
                        <td className="text-right">{formatNumber(coin.marketCap)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}