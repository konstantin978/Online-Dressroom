import { createUseStyles } from "react-jss";

const styles = createUseStyles({
    overlay: {
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(4px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    modal: {
        backgroundColor: '#12162e',
        borderRadius: '20px',
        width: '780px',
        maxWidth: '90vw',
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid rgba(167, 139, 250, 0.15)',
        boxShadow: '0 24px 64px rgba(0, 0, 0, 0.5)',
        overflow: 'hidden',
    },

    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '24px 28px 16px',
        borderBottom: '1px solid rgba(167, 139, 250, 0.1)',
    },
    title: {
        fontSize: '1.3rem',
        fontWeight: 700,
        color: '#fff',
        margin: 0,
    },
    closeButton: {
        background: 'rgba(255, 255, 255, 0.06)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '10px',
        color: '#94a3b8',
        fontSize: '1.1rem',
        width: '36px',
        height: '36px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease',
        '&:hover': {
            background: 'rgba(255, 255, 255, 0.1)',
            color: '#fff',
        },
    },

    filters: {
        display: 'flex',
        gap: '8px',
        padding: '16px 28px',
        flexWrap: 'wrap',
    },
    filterChip: {
        background: 'transparent',
        border: '1.5px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '20px',
        color: '#94a3b8',
        padding: '6px 16px',
        fontSize: '0.8rem',
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        '&:hover': {
            borderColor: '#a78bfa',
            color: '#c4b5fd',
        },
    },
    filterChipActive: {
        background: 'rgba(167, 139, 250, 0.15)',
        border: '1.5px solid #a78bfa',
        color: '#a78bfa',
        fontWeight: 600,
    },

    list: {
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        padding: '8px 28px 28px',
        overflowY: 'auto',
        flex: 1,
    },

    lookCard: {
        background: 'linear-gradient(145deg, #1a1e3c, #1f2347)',
        borderRadius: '16px',
        border: '1px solid rgba(167, 139, 250, 0.08)',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        overflow: 'hidden',
        '&:hover': {
            border: '1px solid rgba(167, 139, 250, 0.25)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
        },
    },
    lookTop: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '18px 20px',
    },
    lookNameSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
    },
    lookName: {
        fontSize: '1rem',
        fontWeight: 600,
        color: '#e2e8f0',
        margin: 0,
    },
    lookDate: {
        fontSize: '0.75rem',
        color: '#475569',
    },
    lookTags: {
        display: 'flex',
        gap: '6px',
    },
    lookTag: {
        fontSize: '0.7rem',
        fontWeight: 500,
        color: '#a78bfa',
        background: 'rgba(167, 139, 250, 0.1)',
        padding: '3px 10px',
        borderRadius: '20px',
        border: '1px solid rgba(167, 139, 250, 0.15)',
    },

    itemsRow: {
        display: 'flex',
        gap: '10px',
        padding: '0 20px 18px',
        overflowX: 'auto',
    },
    itemChip: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        background: 'rgba(255, 255, 255, 0.04)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '10px',
        padding: '6px 12px',
        flexShrink: 0,
    },
    itemEmoji: {
        fontSize: '1.2rem',
    },
    itemName: {
        fontSize: '0.75rem',
        color: '#94a3b8',
        fontWeight: 500,
        whiteSpace: 'nowrap',
    },
    itemColor: {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.15)',
        flexShrink: 0,
    },

    emptyState: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 28px',
        color: '#475569',
        fontSize: '0.9rem',
        gap: '8px',
        flex: 1,
    },
    emptyIcon: {
        fontSize: '2.5rem',
        opacity: 0.5,
    },
});

export default styles;
