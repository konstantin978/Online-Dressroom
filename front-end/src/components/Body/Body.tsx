import { useEffect, useState } from "react";
import useStyles from "./styles";
import { useClothes } from "../../services/clothesService";
import { MOCK_LOOKS, getClothesForLook } from "../../data/mockData";
import {
  type AiRecommendation,
  getDailyInfo,
  getUserLocation,
} from "../../api/ai";

const TYPE_EMOJI: Record<string, string> = {
  top: "👕",
  bottom: "👖",
  shoes: "👟",
  outerwear: "🧥",
  accessory: "🎒",
};

interface BodyProps {
  username: string | null;
}

const Body = ({ username }: BodyProps) => {
  const classes = useStyles();
  const { clothes } = useClothes();
  const [aiData, setAiData] = useState<AiRecommendation | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");

  useEffect(() => {
    if (!username) return;

    const fetchAi = async () => {
      setAiLoading(true);
      setAiError("");
      try {
        const location = await getUserLocation();
        const res = await getDailyInfo(username, location);
        if (res.status === "Success" && res.data?.data) {
          setAiData(res.data.data);
        } else {
          setAiError("Could not get recommendation");
        }
      } catch {
        setAiError("AI service unavailable");
      } finally {
        setAiLoading(false);
      }
    };

    fetchAi();
  }, [username]);

  const stats = [
    { icon: "/icons/stat-items.png", value: clothes.length, label: "Total Items" },
    { icon: "/icons/stat-looks.png", value: MOCK_LOOKS.length, label: "Saved Looks" },
    { icon: "/icons/stat-favorites.png", value: 3, label: "Favorites" },
    { icon: "/icons/stat-week.png", value: 5, label: "This Week" },
  ];

  const greeting = username ? `Good evening, ${username}` : "Good evening";

  return (
    <main className={classes.body}>
      <div className={classes.banner}>
        <div className={classes.bannerText}>
          <div className={classes.bannerGreeting}>{greeting}</div>
          <h2 className={classes.bannerTitle}>
            Outfit of the Day
            {aiData && (
              <span className={classes.bannerWeatherBadge}>
                {aiData.weather.temperature} · {aiData.weather.conditions}
              </span>
            )}
          </h2>

          {!username && (
            <p className={classes.bannerSubtitle}>
              Sign in to get personalized AI outfit recommendations!
            </p>
          )}

          {username && aiLoading && (
            <p className={classes.bannerSubtitle}>
              Asking AI for today's outfit...
            </p>
          )}

          {username && aiError && (
            <p className={classes.bannerSubtitle}>{aiError}</p>
          )}

          {username && aiData && !aiLoading && (
            <p className={classes.bannerSubtitle}>{aiData.reasoning}</p>
          )}

          {!username && (
            <p className={classes.bannerSubtitle}>
              Here's a look we picked for you today. Mix and match from your
              dressroom!
            </p>
          )}
        </div>

        <div className={classes.bannerOutfit}>
          {username && aiData && !aiLoading ? (
            <>
              {aiData.outfit.top && (
                <div className={classes.outfitPiece}>
                  <span className={classes.outfitPieceLabel}>Top</span>
                  <span className={classes.outfitPieceValue}>{aiData.outfit.top}</span>
                </div>
              )}
              {aiData.outfit.bottom && (
                <div className={classes.outfitPiece}>
                  <span className={classes.outfitPieceLabel}>Bottom</span>
                  <span className={classes.outfitPieceValue}>{aiData.outfit.bottom}</span>
                </div>
              )}
              {aiData.outfit.shoes && (
                <div className={classes.outfitPiece}>
                  <span className={classes.outfitPieceLabel}>Shoes</span>
                  <span className={classes.outfitPieceValue}>{aiData.outfit.shoes}</span>
                </div>
              )}
              {aiData.outfit.outerwear && (
                <div className={classes.outfitPiece}>
                  <span className={classes.outfitPieceLabel}>Outerwear</span>
                  <span className={classes.outfitPieceValue}>{aiData.outfit.outerwear}</span>
                </div>
              )}
            </>
          ) : clothes.length > 0 ? (
            clothes.slice(0, 4).map((item, i) => (
              <div
                key={i}
                className={classes.outfitPiece}
                style={{ background: `${item.color}22` }}
              >
                {TYPE_EMOJI[item.cloth_type] || "👔"}
              </div>
            ))
          ) : (
            getClothesForLook(MOCK_LOOKS[0]).map((item) => (
              <div
                key={item.id}
                className={classes.outfitPiece}
                style={{ background: `${item.color}22` }}
              >
                {item.emoji}
              </div>
            ))
          )}
        </div>
      </div>

      <div className={classes.statsRow}>
        {stats.map((stat) => (
          <div key={stat.label} className={classes.statCard}>
            <img className={classes.statIcon} src={stat.icon} alt={stat.label} />
            <p className={classes.statValue}>{stat.value}</p>
            <p className={classes.statLabel}>{stat.label}</p>
          </div>
        ))}
      </div>

      <div className={classes.sectionHeader}>
        <h3 className={classes.sectionTitle}>Recent Looks</h3>
        <button className={classes.seeAllLink}>See all →</button>
      </div>

      <div className={classes.looksGrid}>
        {MOCK_LOOKS.map((look) => {
          const items = getClothesForLook(look);
          return (
            <div key={look.id} className={classes.lookCard}>
              <div
                className={classes.lookPreview}
                style={{ background: look.gradient }}
              >
                {items.map((item) => (
                  <span key={item.id}>{item.emoji}</span>
                ))}
              </div>
              <div className={classes.lookInfo}>
                <p className={classes.lookName}>{look.name}</p>
                <div className={classes.lookTags}>
                  {look.tags.map((tag) => (
                    <span key={tag} className={classes.lookTag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className={classes.lookDate}>{look.date}</div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Body;
