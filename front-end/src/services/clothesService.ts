import { createContext, useContext } from "react";
import type { ClothItem } from "../api/clothes";

export interface ClothesContextType {
  clothes: ClothItem[];
  loading: boolean;
  refresh: () => Promise<void>;
}

export const ClothesContext = createContext<ClothesContextType>({
  clothes: [],
  loading: false,
  refresh: async () => {},
});

export const useClothes = () => useContext(ClothesContext);
