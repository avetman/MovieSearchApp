import {View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity,TouchableNativeFeedback} from "react-native";
import {Screen} from "react-native-screens";
import ThemeSwitch from "../parts/ThemeSwitch";
import {useAppTheme} from "../../hooks/useAppTheme";
import { MaterialIcons } from '@expo/vector-icons';
import Container from "../Container";
const ProfileScreen = () => {
const themeStyles = useAppTheme();

    return(
        <Container>
            <SafeAreaView style={themeStyles.container}>
                <ScrollView >
                    <View style={[styles.container, themeStyles.container]}>
                        <View style={[styles.section,styles.themeSection, themeStyles.block]}>
                            <Text style={[themeStyles.themeText]}>Choose Theme</Text>
                            <ThemeSwitch />
                        </View>
                        <View style={styles.titleSection}>
                            <Text style={[themeStyles.themeText, styles.title]}>Movies</Text>
                        </View>
                        <View style={[styles.section,themeStyles.block, styles.favoritesSection]}>
                            <TouchableOpacity style={styles.buttonSection}>
                                <MaterialIcons name="favorite-border" size={24} style={[{marginLeft:20,},themeStyles.themeText]} />
                                <Text style={[themeStyles.themeText, styles.favoriteText]}>Watch Favorites</Text>
                            </TouchableOpacity>

                        </View>
                        <View style={[styles.section,themeStyles.block, styles.favoritesSection]}>
                            <TouchableOpacity style={styles.buttonSection}>
                                <MaterialIcons name="remove-red-eye" size={24} style={[{marginLeft:20,},themeStyles.themeText]} />
                                <Text style={[themeStyles.themeText, styles.favoriteText]}>Recently Watched</Text>
                            </TouchableOpacity>

                        </View>

                        <View style={[styles.section,themeStyles.block, styles.favoritesSection]}>
                            <TouchableOpacity style={styles.buttonSection}>
                                <MaterialIcons name="favorite-border" size={24} style={[{marginLeft:20,},themeStyles.themeText]} />
                                <Text style={[themeStyles.themeText, styles.favoriteText]}>Favorite Actors</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </ScrollView>
            </SafeAreaView>
        </Container>


    );
}
const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        margin: 10,
        flex: 1,
    },
    section: {
        flex: 1,
        backgroundColor: '#c0c0c0',
        borderRadius: 10,
        padding: 10,
    },
    themeSection: {

    },
    favoritesSection: {
        marginTop:10,
        flex: 1,
    },
    subtitle: {
      fontSize: 16,
    },
    titleSection: {
      marginTop: 20,
        marginBottom: 10,
    },
    title: {
        fontSize: 22,
    },
    buttonSection: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    favoriteText:{
        fontSize: 20,
        marginLeft:40,
    }
})
export default ProfileScreen;