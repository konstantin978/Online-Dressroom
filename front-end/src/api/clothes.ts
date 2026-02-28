const API_URL = "http://localhost:3001";

export interface ClothItem {
  cloth_type: string;
  color: string;
  gender: string;
  season: string;
}

export interface ClothesResponse {
  status: string;
  data?: ClothItem[];
  message?: string;
}

export const getClothes = async (username: string): Promise<ClothesResponse> => {
  const res = await fetch(`${API_URL}/clothes/getAll?username=${encodeURIComponent(username)}`);
  return res.json();
};

export const addCloth = async (
  username: string,
  clothType: string,
  clothColor: string,
  clothSeason: string,
): Promise<{ status: string; message: string }> => {
  const res = await fetch(`${API_URL}/clothes/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, clothType, clothColor, clothSeason }),
  });
  return res.json();
};
