import create from "zustand";

const token = localStorage.getItem("token");

export const useIsLoggedIn = create()((set) => ({
  isLoggedIn: !!token,
  setIsLoggedIn: (state) => set(() => ({ isLoggedIn: state })),
}));
