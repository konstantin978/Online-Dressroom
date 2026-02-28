import { useState } from 'react';
import useStyles from './styles';
import { MOCK_LOOKS, getClothesForLook } from '../../data/mockData';

const TAG_SET = Array.from(new Set(MOCK_LOOKS.flatMap((l) => l.tags)));
const FILTER_OPTIONS = ['all', ...TAG_SET];

interface LooksModalProps {
    onClose: () => void;
}

const LooksModal = ({ onClose }: LooksModalProps) => {
    const classes = useStyles();
    const [activeFilter, setActiveFilter] = useState('all');

    const filtered = activeFilter === 'all'
        ? MOCK_LOOKS
        : MOCK_LOOKS.filter((look) => look.tags.includes(activeFilter));

    return (
        <div className={classes.overlay} onClick={onClose}>
            <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
                <div className={classes.header}>
                    <h2 className={classes.title}>My Looks</h2>
                    <button className={classes.closeButton} onClick={onClose}>✕</button>
                </div>

                <div className={classes.filters}>
                    {FILTER_OPTIONS.map((filter) => (
                        <button
                            key={filter}
                            className={`${classes.filterChip} ${activeFilter === filter ? classes.filterChipActive : ''}`}
                            onClick={() => setActiveFilter(filter)}
                        >
                            {filter === 'all' ? 'All' : filter}
                        </button>
                    ))}
                </div>

                {filtered.length > 0 ? (
                    <div className={classes.list}>
                        {filtered.map((look) => {
                            const items = getClothesForLook(look);
                            return (
                                <div key={look.id} className={classes.lookCard}>
                                    <div className={classes.lookTop}>
                                        <div className={classes.lookNameSection}>
                                            <p className={classes.lookName}>{look.name}</p>
                                            <span className={classes.lookDate}>{look.date}</span>
                                        </div>
                                        <div className={classes.lookTags}>
                                            {look.tags.map((tag) => (
                                                <span key={tag} className={classes.lookTag}>{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className={classes.itemsRow}>
                                        {items.map((item) => (
                                            <div key={item.id} className={classes.itemChip}>
                                                <span className={classes.itemEmoji}>{item.emoji}</span>
                                                <span className={classes.itemName}>{item.name}</span>
                                                <span className={classes.itemColor} style={{ backgroundColor: item.color }} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className={classes.emptyState}>
                        <span className={classes.emptyIcon}>🔍</span>
                        <span>No looks with this tag yet</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LooksModal;
