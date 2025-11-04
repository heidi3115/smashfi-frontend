"use client";

import { useEffect, useState } from "react";
import {formatNumber} from "@/utils/commonUtils";
import Image from "next/image";

export default function CoinList() {
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        const fetchCoins = async () => {
            const res = await fetch('/api/coins');
            const data = await res.json();

            setCoins(data);
        };

        fetchCoins();
    }, []);


    console.log(coins)

    return (
        <div className="p-20">
            <h1 className="text-2xl">Coin List</h1>
            <div className="flex gap-5">
                <div>All</div>
                <div>My favorite</div>
            </div>
            <div className="flex items-center bg-[#1e1e1e] rounded-full px-4 py-2 w-full mx-auto shadow-md">
                {/*<div>돋보기</div>*/}
                <input
                    type="text"
                    placeholder="Search something...(BTC, Bitcoin, B...)"
                    className="w-full bg-transparent text-gray-200 placeholder-gray-500 focus:outline-none"
                />
            </div>
            <table className="min-w-full border-separate border-spacing-y-2">
                <thead>
                <tr className='text-gray-400 text-sm'>
                    <th className="text-left">Name</th>
                    <th className="text-left">Price</th>
                    <th>24h Change</th>
                    <th>24h Volume</th>
                    <th>Market Cap</th>
                </tr>
                </thead>
                <tbody>
                {coins.map((coin) => (
                    <tr key={coin.id}>
                        <td className="flex items-center gap-2">
                            <span>별</span>
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