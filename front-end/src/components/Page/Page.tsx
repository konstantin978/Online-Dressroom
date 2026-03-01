import { useCallback, useEffect, useState } from "react";

import Body from "../Body";
import Header from "../Header";
import Footer from "../Footer";
import AuthModal from "../AuthModal";
import useStyles from "./styles";
import LooksModal from "../LooksModal";
import ClothesModal from "../ClothesModal";
import { ClothesContext } from "../../services/clothesService";
import { type ClothItem, getClothes } from "../../api/clothes";

interface PageProps {
  username: string | null;
  onLoginSuccess: (token: string) => void;
  onLogout: () => void;
}

const Page = ({ username, onLoginSuccess, onLogout }: PageProps) => {
  const classes = useStyles();
  const [clothesOpen, setClothesOpen] = useState(false);
  const [looksOpen, setLooksOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [clothes, setClothes] = useState<ClothItem[]>([]);
  const [clothesLoading, setClothesLoading] = useState(false);

  const fetchClothes = useCallback(async () => {
    if (!username) return;
    setClothesLoading(true);
    try {
      const res = await getClothes(username);
      if (res.status === "Success" && res.data) {
        setClothes(res.data);
      }
    } finally {
      setClothesLoading(false);
    }
  }, [username]);

  useEffect(() => {
    fetchClothes();
  }, [fetchClothes]);

  const handleLoginSuccess = (token: string) => {
    setAuthOpen(false);
    onLoginSuccess(token);
  };

  return (
    <ClothesContext.Provider
      value={{ clothes, loading: clothesLoading, refresh: fetchClothes }}
    >
      <div className={classes.page}>
        <Header
          onMyClothesClick={() => setClothesOpen(true)}
          onMyLooksClick={() => setLooksOpen(true)}
          username={username}
          onLoginClick={() => setAuthOpen(true)}
          onLogout={onLogout}
        />
        <Body username={username} />
        <Footer />
        {clothesOpen && username && (
          <ClothesModal
            onClose={() => setClothesOpen(false)}
            username={username}
          />
        )}
        {looksOpen && <LooksModal onClose={() => setLooksOpen(false)} />}
        {authOpen && (
          <AuthModal
            onClose={() => username && setAuthOpen(false)}
            onLoginSuccess={handleLoginSuccess}
          />
        )}
      </div>
    </ClothesContext.Provider>
  );
};

export default Page;
