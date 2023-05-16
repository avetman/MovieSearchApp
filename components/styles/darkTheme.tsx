import {Platform} from "react-native";

const darkTheme = {
    container: {
        backgroundColor: '#121212',
    },
    block: {
        backgroundColor:'#242424',
        ...Platform.select({
            android: {
                elevation: 2,
            },
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
            },
        }),
    },
    card: {
        backgroundColor:'#272727',

    },
    day: {
        backgroundColor: '#272727',
    },
    themeText: {
        color: '#a0a0a0',
    },

}

export default darkTheme;