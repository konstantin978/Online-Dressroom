const API_URL = "http://localhost:3001";

export interface AiOutfit {
  top: string;
  bottom: string;
  shoes: string;
  outerwear: string;
}

export interface AiWeather {
  temperature: string;
  conditions: string;
}

export interface AiRecommendation {
  weather: AiWeather;
  outfit: AiOutfit;
  reasoning: string;
}

export interface AiResponse {
  status: string;
  data?: { status: string; data: AiRecommendation };
  message?: string;
}

export const getDailyInfo = async (
  username: string,
  location: string,
): Promise<AiResponse> => {
  const res = await fetch(
    `${API_URL}/ai/dailyInfo?username=${encodeURIComponent(username)}&location=${encodeURIComponent(location)}`,
  );
  return res.json();
};

export const getUserLocation = (): Promise<string> => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve("Yerevan");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`,
          );
          const data = await res.json();
          resolve(data.address?.city || data.address?.town || "Yerevan");
        } catch {
          resolve("Yerevan");
        }
      },
      () => resolve("Yerevan"),
      { timeout: 5000 },
    );
  });
};
