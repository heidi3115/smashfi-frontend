import {FaStar} from "react-icons/fa";
import {CiStar} from "react-icons/ci";
import Image from "next/image";
import {formatNumber, formatPrice} from "@/utils/commonUtils";
import {Coin} from "@/app/types/coin";

type CoinListRowProps = {
    coin: Coin;
    onToggleFavorite: (coinId: string) => void;
    isFavorited: (coinId: string) => boolean;
}

export const CoinListRow = ({
                                coin,
                                onToggleFavorite,
                                isFavorited,
}:CoinListRowProps) => {
    return (
        <tr className="m-10">
            <td className="flex items-center gap-2">
                <button onClick={() => onToggleFavorite(coin.id)}>
                    {isFavorited(coin.id) ? (
                        <FaStar className="text-yellow-400" />
                    ) : (
                        <CiStar />
                    )}
                </button>
                <Image
                    src={coin.icon}
                    alt={coin.name}
                    width={24}
                    height={24}
                />
                <span className="font-semibold">{coin.symbol}</span>
                <span className="text-gray-400 text-sm">{coin.name}</span>
            </td>
            <td>
                <div className="flex flex-col gap-1">
                    <span>{formatPrice(coin.price.toFixed(2))}</span>
                    <span className="text-gray-400 text-xs">{formatNumber(coin.price)}</span>
                </div>
            </td>
            <td className={`text-center ${coin.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {coin.change24h > 0 ? "+" : ""}{coin.change24h}%
            </td>
            <td className="text-right">{formatNumber(coin.volume24h)}</td>
            <td className="text-right">{formatNumber(coin.marketCap)}</td>
        </tr>

    )
}