import { createUseStyles } from "react-jss";

const styles = createUseStyles({
    header: {
        width: '100%',
        height: '10vh',
        maxHeight: '200px',
        position: 'sticky',
        top: 0,
        backgroundColor: '#1a1a1a',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        boxSizing: 'border-box',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.4)',
    },
    logo: {
        fontSize: '1.4rem',
        fontWeight: 700,
        color: '#fff',
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        cursor: 'pointer',
        '&:hover': {
            color: '#4caf50',
        },
    },
    nav: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    navButton: {
        background: 'transparent',
        border: '1.5px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '24px',
        color: '#e2e8f0',
        padding: '8px 20px',
        fontSize: '0.85rem',
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        letterSpacing: '0.3px',
        '&:hover': {
            background: 'rgba(76, 175, 80, 0.15)',
            borderColor: '#4caf50',
            color: '#fff',
        },
    },
    addButton: {
        background: 'linear-gradient(135deg, #e65100, #f57c00)',
        border: 'none',
        borderRadius: '24px',
        color: '#fff',
        padding: '8px 22px',
        fontSize: '0.85rem',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        letterSpacing: '0.3px',
        boxShadow: '0 2px 8px rgba(230, 81, 0, 0.35)',
        '&:hover': {
            background: 'linear-gradient(135deg, #bf360c, #e65100)',
            boxShadow: '0 4px 14px rgba(230, 81, 0, 0.5)',
            transform: 'translateY(-1px)',
        },
    },
    userName: {
        color: '#4caf50',
        fontSize: '0.9rem',
        fontWeight: 500,
        marginLeft: '8px',
        cursor: 'pointer',
        '&:hover': {
            color: '#81c784',
        },
    },
});

export default styles;
