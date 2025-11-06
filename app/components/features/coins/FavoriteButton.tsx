"use client";

import {FaStar} from "react-icons/fa";
import {CiStar} from "react-icons/ci";

type FavoriteButtonProps = {
    isFavorited: boolean;
    onToggle: () => void;
    size?: number;
}

export const FavoriteButton = ({
    isFavorited,
    onToggle,
    size = 20
}: FavoriteButtonProps) => {
    return (
        <button
            onClick={onToggle}
        >
            {isFavorited ? (
                <FaStar className="text-yellow-400" size={size} />
            ) : (
                <CiStar size={size} />
            )}
        </button>
    )
}