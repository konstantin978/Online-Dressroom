import { createUseStyles } from "react-jss";

const styles = createUseStyles({
    body: {
        width: '100%',
        flex: 1,
        backgroundColor: '#111111',
        padding: '32px 48px',
        boxSizing: 'border-box',
    },

    banner: {
        background: 'linear-gradient(135deg, #1b2e1b 0%, #2e3d1b 50%, #1b2e1b 100%)',
        borderRadius: '20px',
        padding: '40px 48px',
        marginBottom: '32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid rgba(76, 175, 80, 0.2)',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
    },
    bannerText: {
        flex: 1,
    },
    bannerGreeting: {
        fontSize: '0.9rem',
        color: '#f57c00',
        fontWeight: 500,
        letterSpacing: '1px',
        textTransform: 'uppercase',
        marginBottom: '8px',
    },
    bannerTitle: {
        fontSize: '1.8rem',
        fontWeight: 700,
        color: '#fff',
        margin: '0 0 12px 0',
        lineHeight: 1.3,
    },
    bannerSubtitle: {
        fontSize: '0.95rem',
        color: '#94a3b8',
        margin: 0,
        lineHeight: 1.5,
    },
    bannerOutfit: {
        display: 'flex',
        gap: '12px',
        marginLeft: '48px',
    },
    outfitPiece: {
        width: '80px',
        height: '100px',
        borderRadius: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2rem',
        border: '1px solid rgba(76, 175, 80, 0.25)',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.2)',
    },

    statsRow: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
        marginBottom: '40px',
    },
    statCard: {
        background: '#1e1e1e',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        transition: 'all 0.25s ease',
        '&:hover': {
            border: '1px solid rgba(76, 175, 80, 0.3)',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
        },
    },
    statIcon: {
        width: '44px',
        height: '44px',
        objectFit: 'cover',
        marginBottom: '12px',
        borderRadius: '10px',
    },
    statValue: {
        fontSize: '2rem',
        fontWeight: 700,
        color: '#fff',
        margin: '0 0 4px 0',
    },
    statLabel: {
        fontSize: '0.85rem',
        color: '#9ca3af',
        fontWeight: 500,
        margin: 0,
    },

    sectionHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
    sectionTitle: {
        fontSize: '1.3rem',
        fontWeight: 600,
        color: '#fff',
        margin: 0,
    },
    seeAllLink: {
        fontSize: '0.85rem',
        color: '#f57c00',
        fontWeight: 500,
        cursor: 'pointer',
        background: 'none',
        border: 'none',
        '&:hover': {
            color: '#ffb74d',
        },
    },

    looksGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '20px',
        paddingBottom: '8px',
    },
    lookCard: {
        background: '#1e1e1e',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
            border: '1px solid rgba(76, 175, 80, 0.3)',
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4)',
        },
    },
    lookPreview: {
        height: '180px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        fontSize: '2.2rem',
        position: 'relative',
    },
    lookInfo: {
        padding: '16px',
    },
    lookName: {
        fontSize: '0.95rem',
        fontWeight: 600,
        color: '#e2e8f0',
        margin: '0 0 8px 0',
    },
    lookTags: {
        display: 'flex',
        gap: '6px',
        flexWrap: 'wrap',
    },
    lookTag: {
        fontSize: '0.7rem',
        fontWeight: 500,
        color: '#4caf50',
        background: 'rgba(76, 175, 80, 0.1)',
        padding: '3px 10px',
        borderRadius: '20px',
        border: '1px solid rgba(76, 175, 80, 0.2)',
    },
    lookDate: {
        fontSize: '0.75rem',
        color: '#6b7280',
        marginTop: '10px',
    },
});

export default styles;
