import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useAppTheme} from "../hooks/useAppTheme";
const Container = ({ children }) => {
    const theme = useAppTheme();
    return(
            <View style={[styles.container, theme.container]}>
                {children}
            </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Container;