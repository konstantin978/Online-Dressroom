import useStyles from "./styles";

interface HeaderProps {
  onMyClothesClick?: () => void;
  onMyLooksClick?: () => void;
  username: string | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

const Header = ({
  onMyClothesClick,
  onMyLooksClick,
  username,
  onLoginClick,
  onLogout,
}: HeaderProps) => {
  const classes = useStyles();

  return (
    <header className={classes.header}>
      <span className={classes.logo}>Online Dressroom</span>
      <nav className={classes.nav}>
        {username ? (
          <>
            <button className={classes.navButton} onClick={onMyClothesClick}>
              My Clothes
            </button>
            <button className={classes.navButton} onClick={onMyLooksClick}>
              My Looks
            </button>
            <button className={classes.addButton}>+ Add New Look</button>
            <span className={classes.userName}>{username}</span>
            <button className={classes.navButton} onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <button className={classes.addButton} onClick={onLoginClick}>
            Sign In
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
