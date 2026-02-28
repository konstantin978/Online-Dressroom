import { type FormEvent, useEffect, useState } from "react";
import useStyles from "./styles";
import { type ClothItem, getClothes, addCloth } from "../../api/clothes";

const FILTER_OPTIONS = ["all", "top", "bottom", "shoes", "outerwear", "accessory"] as const;

const FILTER_LABELS: Record<string, string> = {
  all: "All",
  top: "Tops",
  bottom: "Bottoms",
  shoes: "Shoes",
  outerwear: "Outerwear",
  accessory: "Accessories",
};

const TYPE_EMOJI: Record<string, string> = {
  top: "👕",
  bottom: "👖",
  shoes: "👟",
  outerwear: "🧥",
  accessory: "🎒",
};

interface ClothesModalProps {
  onClose: () => void;
  username: string;
}

const ClothesModal = ({ onClose, username }: ClothesModalProps) => {
  const classes = useStyles();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [clothes, setClothes] = useState<ClothItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [clothType, setClothType] = useState("");
  const [clothColor, setClothColor] = useState("");
  const [clothSeason, setClothSeason] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchClothes = async () => {
    setLoading(true);
    try {
      const res = await getClothes(username);
      if (res.status === "Success" && res.data) {
        setClothes(res.data);
      }
    } catch {
      setError("Failed to load clothes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClothes();
  }, [username]);

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await addCloth(username, clothType, clothColor, clothSeason);
      if (res.status === "Success") {
        setClothType("");
        setClothColor("");
        setClothSeason("");
        setShowForm(false);
        await fetchClothes();
      } else {
        setError(res.message);
      }
    } catch {
      setError("Failed to add cloth");
    } finally {
      setSubmitting(false);
    }
  };

  const filtered =
    activeFilter === "all"
      ? clothes
      : clothes.filter((item) => item.cloth_type === activeFilter);

  return (
    <div className={classes.overlay} onClick={onClose}>
      <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
        <div className={classes.header}>
          <h2 className={classes.title}>My Clothes</h2>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <button
              className={classes.addButton}
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Cancel" : "+ Add"}
            </button>
            <button className={classes.closeButton} onClick={onClose}>
              ✕
            </button>
          </div>
        </div>

        {showForm && (
          <form className={classes.addForm} onSubmit={handleAdd}>
            {error && <div className={classes.error}>{error}</div>}
            <div className={classes.addFormRow}>
              <select
                className={classes.addSelect}
                value={clothType}
                onChange={(e) => setClothType(e.target.value)}
                required
              >
                <option value="">Type</option>
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                <option value="shoes">Shoes</option>
                <option value="outerwear">Outerwear</option>
                <option value="accessory">Accessory</option>
              </select>
              <input
                className={classes.addInput}
                placeholder="Color (e.g. red)"
                value={clothColor}
                onChange={(e) => setClothColor(e.target.value)}
                required
              />
              <select
                className={classes.addSelect}
                value={clothSeason}
                onChange={(e) => setClothSeason(e.target.value)}
                required
              >
                <option value="">Season</option>
                <option value="winter">Winter</option>
                <option value="spring">Spring</option>
                <option value="summer">Summer</option>
                <option value="autumn">Autumn</option>
              </select>
            </div>
            <button
              className={classes.submitButton}
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Adding..." : "Add Cloth"}
            </button>
          </form>
        )}

        <div className={classes.filters}>
          {FILTER_OPTIONS.map((filter) => (
            <button
              key={filter}
              className={`${classes.filterChip} ${activeFilter === filter ? classes.filterChipActive : ""}`}
              onClick={() => setActiveFilter(filter)}
            >
              {FILTER_LABELS[filter]}
            </button>
          ))}
        </div>

        {loading ? (
          <div className={classes.loading}>Loading...</div>
        ) : filtered.length > 0 ? (
          <div className={classes.grid}>
            {filtered.map((item, i) => (
              <div key={i} className={classes.card}>
                <span className={classes.cardEmoji}>
                  {TYPE_EMOJI[item.cloth_type] || "👔"}
                </span>
                <span className={classes.cardName}>{item.cloth_type}</span>
                <div className={classes.cardMeta}>
                  <span
                    className={classes.colorDot}
                    style={{ backgroundColor: item.color }}
                  />
                  <span className={classes.cardType}>
                    {item.color} · {item.season}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={classes.emptyState}>
            <span className={classes.emptyIcon}>🔍</span>
            <span>No items in this category yet</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClothesModal;
