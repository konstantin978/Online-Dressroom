import { useState } from 'react';
import Body from '../Body';
import Header from '../Header';
import Footer from '../Footer';
import ClothesModal from '../ClothesModal';
import LooksModal from '../LooksModal';
import useStyles from './styles';

const Page = () => {
    const classes = useStyles();
    const [clothesOpen, setClothesOpen] = useState(false);
    const [looksOpen, setLooksOpen] = useState(false);

    return (
        <div className={classes.page}>
            <Header
                onMyClothesClick={() => setClothesOpen(true)}
                onMyLooksClick={() => setLooksOpen(true)}
            />
            <Body />
            <Footer />
            {clothesOpen && <ClothesModal onClose={() => setClothesOpen(false)} />}
            {looksOpen && <LooksModal onClose={() => setLooksOpen(false)} />}
        </div>
    );
};

export default Page;