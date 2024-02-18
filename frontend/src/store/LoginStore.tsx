import { create } from "zustand";

type Store = {
    isLogged: boolean;
    username: string;
    saveUsername: (username: string) => void;
    logIn: () => void;
    logOut: () => void;
};

export const useLoginStore = create<Store>()((set) => ({
    isLogged: false,
    username: "",
    saveUsername: (username) => set({ username }),
    logIn: () => set({ isLogged: true }),
    logOut: () => set({ isLogged: false }),
}));
