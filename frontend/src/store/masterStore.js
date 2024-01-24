import { create } from 'zustand'
import { createJSONStorage, persist } from "zustand/middleware"

export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            setUser: (data) => set({
                user: { ...data }
            }),
            clearUser: () => set({
                user: null
            })
        }),
        {
            name: 'user',
            storage: createJSONStorage(() => localStorage)
        },
    ),
);


export const useListingStore = create(
    persist(
        (set) => ({
            listing: [],
            setListing: (data) => set({
                listing: data
            }),
        }),
        {
            name: 'listing',
            storage: createJSONStorage(() => localStorage),
        },
    ),
);



