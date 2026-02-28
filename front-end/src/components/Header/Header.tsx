import useStyles from './styles';

interface HeaderProps {
    onMyClothesClick?: () => void;
    onMyLooksClick?: () => void;
}

const Header = ({ onMyClothesClick, onMyLooksClick }: HeaderProps) => {
    const classes = useStyles();

    return (
        <header className={classes.header}>
            <span className={classes.logo}>Online Dressroom</span>
            <nav className={classes.nav}>
                <button className={classes.navButton} onClick={onMyClothesClick}>My Clothes</button>
                <button className={classes.navButton} onClick={onMyLooksClick}>My Looks</button>
                <button className={classes.addButton}>+ Add New Look</button>
                <span className={classes.userName}>Konstantin</span>
            </nav>
        </header>
    );
};

export default Header;