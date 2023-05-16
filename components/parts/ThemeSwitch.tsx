import {View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity,TouchableNativeFeedback} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import {toggleTheme} from "../../store/reducers/themeSlice";
import {useAppTheme} from "../../hooks/useAppTheme";
import darkTheme from "../styles/darkTheme";
import lightTheme from "../styles/lightTheme";

const ThemeSwitch = () => {
    const dispatch = useDispatch();
    const currentTheme = useSelector((state) => state.root.theme.currentTheme);


    const darkMode = currentTheme === 'dark' ? {mode: {borderColor: 'tomato', borderWidth: 2,}} : {mode: {}};
    const lightMode = currentTheme === 'light' ? {mode: {borderColor: 'tomato', borderWidth: 2,}} : {mode: {}};
    const toggleThemeMode = () => {
        dispatch(toggleTheme());
    };

    const themeStyles = useAppTheme();
    const defaultHitSlop = {top: 15, bottom: 15, right: 15, left: 15};
    const noop = () => {};

    return(


            <View style={styles.buttonsSection}>

                <TouchableNativeFeedback
                    onPress={toggleThemeMode}
                    background={TouchableNativeFeedback.Ripple('rgba(211,204,204,0.4)', false)}
                    hitSlop={defaultHitSlop}>
                    <View style={[styles.day, themeStyles.day, lightMode.mode]}>
                        <MaterialIcons name="wb-sunny" size={24} color="white" />
                        <Text style={[styles.themeText, themeStyles.themeText]}>Light</Text>
                    </View>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback
                    onPress={toggleThemeMode}
                    background={TouchableNativeFeedback.Ripple('rgba(211,204,204,0.4)', false)}
                    hitSlop={defaultHitSlop}>
                    <View style={[styles.day, themeStyles.day, darkMode.mode]}>
                        <MaterialIcons name="nightlight-round" size={24} color="white" />
                        <Text style={[styles.themeText, themeStyles.themeText]}>Dark</Text>
                    </View>
                </TouchableNativeFeedback>

            </View>

    )
}
const styles = StyleSheet.create({


    subtitle: {
        fontSize: 16,
    },
    buttonsSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        marginTop:5,
    },
    day:{
        marginLeft: 25,
        marginRight: 25,
        flex: 1,
        borderRadius: 8,
        backgroundColor: '#949090',
        padding:10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    themeText: {
        color: 'white',
        marginTop: 10,
    },

})
export default ThemeSwitch;