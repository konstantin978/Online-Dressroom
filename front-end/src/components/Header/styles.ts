import { createUseStyles } from "react-jss";

const styles = createUseStyles({
    header: {
        width: '100vw',
        height: '10vh',
        maxHeight: '200px',
        position: 'absolute',
        backgroundColor: 'darkblue',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
    }
});

export default styles;