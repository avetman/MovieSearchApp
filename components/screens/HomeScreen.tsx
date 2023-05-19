import {View, Text, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator, Platform} from "react-native";
import {useGetPopularMoviesQuery, useGetUpcomingMoviesQuery,useGetPopularPersonQuery} from "../../store/api/rtkQueryApi";
import  HorizontalList  from "../ui/HorizontalList";
import VerticalList from "../ui/VerticalList";
import PopularPeopleSection from "../ui/PopularPeople";
import MainBottomNav from "../MainBottomNav";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useAppTheme} from "../../hooks/useAppTheme";

const Stack = createNativeStackNavigator();

const HomeScreen = () => {

    const {data: popularData, isLoading, isError, error} = useGetPopularMoviesQuery('week');
    const {data: upcomingMovies, isLoading: isUpcomingLoading} = useGetUpcomingMoviesQuery(1)
    const{data: popularPerson} = useGetPopularPersonQuery('day');

    const themeStyles = useAppTheme();

    if (isLoading) {
        return <ActivityIndicator color='black' />;
    }


    return(
        <SafeAreaView style={[styles.container, themeStyles.container]}>
            <ScrollView contentContainerStyle={styles.scrollContent} scrollEnabled={false}>

                <View style={[styles.popular, themeStyles.block, styles.card]}>
                    <Text style={[styles.text,themeStyles.themeText]}> Trending </Text>
                    <HorizontalList data={popularData} />
                </View>


                {upcomingMovies ? (
                    <View style={[styles.topRated, themeStyles.block, styles.card]}>
                        <Text style={[styles.text,themeStyles.themeText]}> Upcoming </Text>
                        <VerticalList data={upcomingMovies} />
                    </View>
                ) : (
                    <ActivityIndicator color="black" />
                )}


                <View style={[styles.people, themeStyles.block, styles.card]}>
                    <Text style={[styles.text,themeStyles.themeText]}> Popular People Today </Text>
                    <PopularPeopleSection data={popularPerson} />
                </View>
            </ScrollView>


        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%"
    },
    scrollContent: {
        flexGrow: 1,
    },
    popular : {
        marginTop: 40,
        marginBottom: 20,
        margin:5,
        backgroundColor: 'white',
        borderRadius: 12,
    },
    topRated: {
        flex: 1,
        margin:5,
        marginBottom: 20,
        backgroundColor: 'white',
        borderRadius: 12,
    },
    people : {
        margin:5,
        backgroundColor: 'white',
        borderRadius: 12,
    },
    latestTrailers: {

    },
    img: {
        height: 300,
        resizeMode: 'contain',
    },
    text: {
        fontSize: 20,
        fontWeight: "500",
        marginLeft: 10,
    },
    city: {

        paddingBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 4,
        borderColor: '#fff',
    },
    cityName: {
        color: '#fff',
        fontSize: 33,
        fontWeight: "700",
        marginLeft: 10,
    },
    weather: {

    },
    day: {
        flexDirection: 'column',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        backgroundColor: 'rgba(215,58,35,0.5)',
        marginBottom:10,
        marginTop:10,
        padding:20,
    },
    temp: {
        color: '#fff',
        fontSize: 88,
        fontWeight: "700",
    },
    description: {
        color: '#fff',
        fontSize: 38,
        fontWeight: "700",
    },
    tinyText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: "300",
    },
    drawerContainer: {
        backgroundColor: 'white',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
    card: {
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
    }

});

export default HomeScreen;