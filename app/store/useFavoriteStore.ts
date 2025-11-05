import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type FavoriteStore = {
    favorites: string[]; // 코인 id 배열
    addFavorite: (id: string) => void;
    removeFavorite: (id: string) => void;
    toggleFavorite: (id: string) => void;
    isFavorited: (id: string) => boolean;
}

export const useFavoriteStore = create<FavoriteStore>()(
    persist(
        (set, get) => ({
            favorites: [],

            addFavorite: (id) => {
                set({favorites: [...get().favorites, id]});
            },

            removeFavorite: (id) => {
                set({ favorites: get().favorites.filter((f) => f!==id)});
            },

            toggleFavorite: (id) => {
                const { favorites, addFavorite, removeFavorite} = get();
                if (favorites.includes(id)) {
                    removeFavorite(id);
                } else {
                    addFavorite(id);
                }
            },

            isFavorited: (id) => {
                // 즐겨찾기에 있는지 확인
               return get().favorites.includes(id)
            },
        }),

        { name: 'coin-favorites' } // localStorage 키 이름
    )
);