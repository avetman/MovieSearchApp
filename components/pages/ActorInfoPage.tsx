import {View, Text, StyleSheet, SafeAreaView, ScrollView, Image, FlatList} from "react-native";
import {useRoute, useNavigation} from "@react-navigation/native";
import {useAppTheme} from "../../hooks/useAppTheme";
import {useGetActorInfoQuery, useGetActorMoviesQuery} from "../../store/api/rtkQueryApi";
import {formatDateString, options} from "../../utils";
import HorizontalList from "../ui/HorizontalList";
import  {useMemo} from "react";
import ListItem from "../ui/HorizontalList/ListItem";
import {imageUri} from "../../utils";


const ActorInfoPage = () => {
    const theme = useAppTheme();
    const navigation = useNavigation();
    const route = useRoute();
    const { movieId } = route.params;

    const {
        data: actorsData,
        isLoading: isActorsLoading,
        isError: isActorsError,
    } = useGetActorInfoQuery(movieId);
    const {
        data: actorMovies,
        isLoading: isActorMoviesLoading,
        isError: isActorMoviesError,
    } = useGetActorMoviesQuery(movieId);

    const Movie = useMemo(() => actorMovies,[actorMovies])

    const handleMovieClick = (movieId, name) => {
        navigation.navigate('TrendingDetails', { movieId, name });
    };
    const sortedMovies = (movie) => {
        const actingRoles = [...movie.cast]

        // Sort acting roles by release date (newest first)
        const sortedRoles = actingRoles.sort((a, b) => {
            const releaseDateA = new Date(a.release_date);
            const releaseDateB = new Date(b.release_date);
            return releaseDateB - releaseDateA;
        });

        return sortedRoles;
    };


    const getTopMovies = (movie) => {
        const topRated = movie?.cast.filter(movie => movie.vote_average > 6.0)
        return topRated
    }
    const topRated = getTopMovies(Movie)

    console.log('actorsMovies', actorsData)
    return(
        <SafeAreaView style={[styles.container, theme.container]}>
            <ScrollView>
                <View>
                   <View style={[styles.imagePart, theme.card]}>
                       <Image style={styles.pic} source={{ uri: `${imageUri.norm}${actorsData?.profile_path}` }} />
                       <View style={styles.textContainer}>
                           <Text style={[theme.themeText, styles.name]}>{actorsData?.name}</Text>
                           <Text style={[theme.themeText]}>{actorsData?.known_for_department}</Text>

                           <Text style={[theme.themeText]}>{formatDateString(actorsData?.birthday,options)}</Text>
                           <Text style={[theme.themeText]}>{actorsData?.place_of_birth}</Text>
                       </View>
                   </View>

                    {Movie && Movie.cast.length > 0 ? (
                        <View style={[styles.popular, theme.block]}>
                            <Text style={[{fontSize: 24, fontWeight: '500', padding: 10,}, theme.themeText]}>
                                {actorsData?.name}'s Top Movies
                            </Text>
                            <View>
                                <FlatList
                                    data={topRated}
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={({ item }) => (
                                        <ListItem movie={item} onMovieClick={handleMovieClick}/>
                                    )}
                                    horizontal={true}
                                    nestedScrollEnabled
                                />
                            </View>
                        </View>
                    ) : ("")
                    }

                    {Movie && Movie.cast.length > 0 ? (
                        <View style={[styles.popular, theme.block]}>
                            <Text style={[{fontSize: 24, fontWeight: '500', padding: 10,}, theme.themeText]}>
                                {actorsData?.name}'s All Movies
                            </Text>
                            <View>
                                <FlatList
                                    data={sortedMovies(Movie)}
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={({ item }) => (
                                        <View style={[styles.actingSection, theme.card ]}>
                                            <Text style={[theme.themeText, styles.text]}>{formatDateString(item.release_date,{ year: 'numeric',})}</Text>
                                            <Text ellipsizeMode="tail" numberOfLines={2} style={[theme.themeText, styles.name]}>{item.original_title}</Text>
                                        </View>
                                    )}
                                    nestedScrollEnabled
                                />
                            </View>
                        </View>
                    ) : ("")
                    }

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imagePart: {
        flex: 1,
        marginTop:40,
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#e1e1e1',
        borderRadius: 12,
    },
    pic: {
        aspectRatio: 2/2.5,
        flex: 1,
        borderRadius:8,
        resizeMode: 'cover',
        alignItems: 'flex-end'
    },
    textContainer: {
        flex: 1,
        alignItems: 'flex-end'
    },
    name: {
        fontSize: 20,
    },
    popular : {
        marginTop: 40,
        margin:5,
        backgroundColor: 'white',
        borderRadius: 12,
    },
    text: {
      fontSize: 18,
    },
    actingSection: {
        marginTop: 20,
        margin:10,
        flex:1,
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#e0e0e0',
        borderRadius:10,
        justifyContent: 'space-between'
    }
})

export default ActorInfoPage;

