import { createUseStyles } from "react-jss";

const styles = createUseStyles({
    footer: {
        backgroundColor: 'darkblue',
        height: '10vh',
        width: '100vw',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
    }
});

export default styles;