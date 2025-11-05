export type Coin = {
    id: string;
    symbol: string;
    name: string;
    icon: string;
    price: number;
    change24h: number;
    volume24h: number;
    marketCap: number;
};

export type SortKey = 'price' | 'change24h' | 'volume24h' | 'marketCap';
export type SortOrder = 'asc' | 'desc';
export type TapType = 'all' | 'favorite';