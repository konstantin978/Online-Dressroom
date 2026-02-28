import { useState } from "react";
import Body from "../Body";
import Header from "../Header";
import Footer from "../Footer";
import ClothesModal from "../ClothesModal";
import LooksModal from "../LooksModal";
import AuthModal from "../AuthModal";
import useStyles from "./styles";

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

  const handleLoginSuccess = (token: string) => {
    setAuthOpen(false);
    onLoginSuccess(token);
  };

  return (
    <div className={classes.page}>
      <Header
        onMyClothesClick={() => setClothesOpen(true)}
        onMyLooksClick={() => setLooksOpen(true)}
        username={username}
        onLoginClick={() => setAuthOpen(true)}
        onLogout={onLogout}
      />
      <Body />
      <Footer />
      {clothesOpen && (
        <ClothesModal onClose={() => setClothesOpen(false)} />
      )}
      {looksOpen && <LooksModal onClose={() => setLooksOpen(false)} />}
      {authOpen && (
        <AuthModal
          onClose={() => username && setAuthOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
};

export default Page;
