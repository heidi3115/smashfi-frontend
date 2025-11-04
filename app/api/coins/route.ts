import { NextResponse } from "next/server";

export async function GET() {
    const mockData = [
        {
            id: 'bitcoin',
            symbol: "BTC",
            name: "Bitcoin",
            price: 107495.13,
            change24h: 2.91,
            volume24h: "$74.95B",
            marketCap: "$2.13T",
        },
        {
            id: 'ethereum',
            symbol: "ETH",
            name: "Ethereum",
            price: 3640.52,
            change24h: -3.05,
            volume24h: "$53.10B",
            marketCap: "$445.88B",
        },
        {
            id: "aave",
            symbol: "AAVE",
            name: "Aave",
            price: 203.59,
            change24h: -9.22,
            volume24h: "175.93M",
            marketCap: "$26.22B",
        },
        {
            id: "polygon",
            symbol: "MATIC",
            name: "Polygon",
            price: 168.11,
            change24h: -6.94,
            volume24h: "$13.53B",
            marketCap: "$140.57B",
        },
        {
            id: "solana",
            symbol: "Sol",
            name: "Solana",
            price: 167.88,
            change24h: 1.06,
            volume24h: "$1.88B",
            marketCap: "$75.80B",
        },
        {
            id: "cosmos",
            symbol: "Atom",
            name: "Cosmos",
            price: 2.52,
            change24h: -4.53,
            volume24h: "$817.00M",
            marketCap: "96.74B",
        },
        {
            id: "xrp",
            symbol: "XRP",
            name: "XRP",
            price: 2.3499,
            change24h: 3.42,
            volume24h: "$3.66B",
            marketCap: "$183.44B",
        },
        {
            id: "sui",
            symbol: "SUI",
            name: "Sui",
            price: 2.09,
            change24h: 5.39,
            volume24h: "$28.77M",
            marketCap: "$14.50B",
        },
        {
            id: "tetherUS",
            symbol: "USDT",
            name: "ThtherUS",
            price: 1.00,
            change24h: 0.01,
            volume24h: "$116.61B",
            marketCap: "$144.37B",
        },
        {
            id: "cardano",
            symbol: "ADA",
            name: "Cardano",
            price: 0.5595,
            change24h: -2.35,
            volume24h: "$885.66M",
            marketCap: "$27.29B",
        },
        {
            id: "arbitrum",
            symbol: "ARB",
            name: "Arbitrum",
            price: 0.2661,
            change24h: 22.14,
            volume24h: "$319.94M",
            marketCap: "$20.60B"
        }
    ];

    return NextResponse.json(mockData);
}