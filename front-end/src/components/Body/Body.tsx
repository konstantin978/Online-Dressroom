import useStyles from './styles';
import { MOCK_CLOTHES, MOCK_LOOKS, getClothesForLook } from '../../data/mockData';

const MOCK_STATS = [
    { icon: '👔', value: MOCK_CLOTHES.length, label: 'Total Items' },
    { icon: '✨', value: MOCK_LOOKS.length, label: 'Saved Looks' },
    { icon: '❤️', value: 3, label: 'Favorites' },
    { icon: '📅', value: 5, label: 'This Week' },
];

const OUTFIT_OF_THE_DAY = MOCK_LOOKS[0];

const Body = () => {
    const classes = useStyles();

    return (
        <main className={classes.body}>
            <div className={classes.banner}>
                <div className={classes.bannerText}>
                    <div className={classes.bannerGreeting}>Good evening, Konstantin</div>
                    <h2 className={classes.bannerTitle}>Outfit of the Day</h2>
                    <p className={classes.bannerSubtitle}>
                        Here's a look we picked for you today. Mix and match from your dressroom!
                    </p>
                </div>
                <div className={classes.bannerOutfit}>
                    {getClothesForLook(OUTFIT_OF_THE_DAY).map((item) => (
                        <div
                            key={item.id}
                            className={classes.outfitPiece}
                            style={{ background: `${item.color}22` }}
                        >
                            {item.emoji}
                        </div>
                    ))}
                </div>
            </div>

            <div className={classes.statsRow}>
                {MOCK_STATS.map((stat) => (
                    <div key={stat.label} className={classes.statCard}>
                        <div className={classes.statIcon}>{stat.icon}</div>
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
                                    <span key={tag} className={classes.lookTag}>{tag}</span>
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