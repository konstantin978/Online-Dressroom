import { useState } from 'react';
import useStyles from './styles';
import { MOCK_CLOTHES } from '../../data/mockData';

const FILTER_OPTIONS = ['all', 'top', 'bottom', 'shoes', 'outerwear', 'accessory'] as const;

const FILTER_LABELS: Record<string, string> = {
    all: 'All',
    top: 'Tops',
    bottom: 'Bottoms',
    shoes: 'Shoes',
    outerwear: 'Outerwear',
    accessory: 'Accessories',
};

interface ClothesModalProps {
    onClose: () => void;
}

const ClothesModal = ({ onClose }: ClothesModalProps) => {
    const classes = useStyles();
    const [activeFilter, setActiveFilter] = useState<string>('all');

    const filtered = activeFilter === 'all'
        ? MOCK_CLOTHES
        : MOCK_CLOTHES.filter((item) => item.type === activeFilter);

    return (
        <div className={classes.overlay} onClick={onClose}>
            <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
                <div className={classes.header}>
                    <h2 className={classes.title}>My Clothes</h2>
                    <button className={classes.closeButton} onClick={onClose}>✕</button>
                </div>

                <div className={classes.filters}>
                    {FILTER_OPTIONS.map((filter) => (
                        <button
                            key={filter}
                            className={`${classes.filterChip} ${activeFilter === filter ? classes.filterChipActive : ''}`}
                            onClick={() => setActiveFilter(filter)}
                        >
                            {FILTER_LABELS[filter]}
                        </button>
                    ))}
                </div>

                {filtered.length > 0 ? (
                    <div className={classes.grid}>
                        {filtered.map((item) => (
                            <div key={item.id} className={classes.card}>
                                <span className={classes.cardEmoji}>{item.emoji}</span>
                                <span className={classes.cardName}>{item.name}</span>
                                <div className={classes.cardMeta}>
                                    <span className={classes.colorDot} style={{ backgroundColor: item.color }} />
                                    <span className={classes.cardType}>{item.colorName}</span>
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
