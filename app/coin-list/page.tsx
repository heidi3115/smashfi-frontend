"use client";

import { useEffect, useState } from "react";

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
        <div>
            {coins.map((it) => {
                return (
                <div>{it.name}</div>)
            })}
        </div>
    )
}