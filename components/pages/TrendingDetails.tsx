import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    FlatList,
    ActivityIndicator,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import React, {useMemo, useRef, useEffect, useState, Suspense, lazy, useCallback} from "react";
import { MaterialIcons } from '@expo/vector-icons';
//import ActorsList from "../parts/ActorsList";
const LazyActorsList = lazy(() => import('../parts/ActorsList'));
import {
    useGetMovieByIdQuery,
    useGetActorsForMovieQuery,
    useGetSimilarMoviesByIdQuery,
    useGetMovieRecommendationsQuery,
    useGetMovieTrailerQuery
} from "../../store/api/rtkQueryApi";
import { useRoute,useNavigationState, useNavigation ,useScrollToTop } from '@react-navigation/native';
import {formatDateString, findJob} from "../../utils";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get("window");
const screenWidth = Dimensions.get('window').width;
const itemWidth = 100; // Adjust as needed
import HorizontalList from "../ui/HorizontalList";
import BackgroundVideo from "../parts/BackgroundVideo";
const numColumns = Math.floor(screenWidth / itemWidth);
import {useAppTheme} from "../../hooks/useAppTheme";
import {imageUri} from "../../utils";
import {Image} from 'expo-image';
import ListItem from "../ui/HorizontalList/ListItem";
const TrendingDetails = () => {
    const theme = useAppTheme();
    const navigationState = useNavigationState((state) => state);
    const route = navigationState.routes[navigationState.index];
    const { movieId } = route.params;
    const navigation = useNavigation();



    const navRef = useRef(null);
    const scrollRef = useRef(null);
    const [MoviesData, setMoviesData] = useState();
    const [isMovie, setIsMovie] = useState(true);
    const [showTrailer, setShowTrailer] = useState(false);
    const [poster, setPoster] = useState(true);


    const {
        data: movieData,
        isLoading: isMovieLoading,
        isError: isMovieError,
    } = useGetMovieByIdQuery(movieId);

    const {
        data: movieTrailer,
        isLoading: isMovieTrailerLoading,
        isError: isMovieTrailerError,
    } = useGetMovieTrailerQuery(movieId, {skip: isMovie});

    const {
        data: actorsData,
        isLoading: isActorsLoading,
        isError: isActorsError,
    } = useGetActorsForMovieQuery(movieId);


    const {
        data: similarMovies,
        isLoading: isSimilarLoading,
        isError: isSimilarError,
    } = useGetSimilarMoviesByIdQuery(movieId);
    const {
        data: recommendations,
        isLoading: isRecommendationsLoading,
        isError: isRecommendationsError,
    } =useGetMovieRecommendationsQuery(movieId)

    const Actors = useMemo(() => movieData, [movieData]);
    const Movie  = useMemo(() => actorsData, [actorsData]);
    const Similar = useMemo(() => similarMovies, [similarMovies]);
    const Recs = useMemo(() => recommendations,[recommendations])

    const DirectorName = findJob(movieData, 'Director');

    const handleMovieClick = (movieId, name) => {
        navigation.navigate('TrendingDetails', { movieId, name });
    };


    useEffect(() => {
        navRef.current?.scrollTo({ x: 0, y: 0, animated: true });
    }, [Actors]);


    useEffect(() => {
        setTimeout(() => {
            setMoviesData(movieTrailer);
            setIsMovie(false)
        },3000)

    },[movieTrailer])

    const handleClick = () => {
        setShowTrailer(prev => !prev)
    };
    const renderItem = useCallback(({item}) => (
        <LazyActorsList actor={item} />
    ), []);


    const handleScroll = (event: any) => {
        const scrollY = event.nativeEvent.contentOffset.y;


        if (scrollY >= 450) {
            //setShowTrailer(prev => !prev)
        }
    };


    return(
        <SafeAreaView style={[styles.container, theme.container]}>
            <ScrollView contentContainerStyle={styles.scrollContent} ref={navRef}  >
                <View>
                      {isMovieLoading ? (
                            <ActivityIndicator style={styles.indicator} color="black" />
                        ) : (
                            <View>
                                <View style={styles.imageContainer}>

                                    {showTrailer && MoviesData  ? (
                                        <BackgroundVideo videoSource={MoviesData} />
                                    ) : ("")
                                    }

                                    {!showTrailer && (

                                         <ImageBackground  blurRadius={1} style={styles.backdrop} source={{ uri: `${imageUri.low}${Movie?.backdrop_path}` }} />
                                    )}
                                    {!showTrailer === true && (
                                        <Image style={styles.poster} source={{ uri: `${imageUri.norm}${Movie?.poster_path}` }} contentFit='cover' placeholder={require('../../assets/img/fallback.png')} transition={1000}/>
                                     )}

                                    <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                                        <MaterialIcons name="arrow-back-ios" size={24} color="white" />
                                    </TouchableOpacity>

                                </View>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity style={styles.button} onPress={handleClick}>
                                        <Text style={{fontSize: 22, color: 'white', fontWeight: '300',textAlign: 'center',}}>
                                            Watch {showTrailer ? 'Poster': 'Trailer'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>


                                <View style={[styles.textContainer, theme.container]}>
                                    <Text ellipsizeMode="tail" numberOfLines={2} style={[styles.title,theme.themeText]}>
                                        {Movie?.original_title}
                                    </Text>
                                    <Text ellipsizeMode="tail" numberOfLines={2} style={[styles.tagline,theme.themeText]}>
                                        {Movie?.tagline}
                                    </Text>
                                    <Text style={[{fontSize: 16}, theme.themeText]}>Director: {DirectorName}</Text>
                                    <Text ellipsizeMode="tail" numberOfLines={2} style={[styles.tinytext,theme.themeText]}>
                                        {formatDateString(Movie?.release_date, {year: 'numeric', month: 'long', day: 'numeric',})}
                                    </Text>
                                    <Text ellipsizeMode="tail" numberOfLines={2} style={[styles.tinytext, theme.themeText]}>
                                        {Movie?.status}
                                    </Text>
                                    <View style={[{ flexDirection: 'row',}]}>
                                        {
                                            Movie?.production_countries.map((genre) => (
                                                <Text key={genre.iso_3166_1} style={[styles.genre, {margin: 0}, theme.themeText, theme.card]}>{genre?.iso_3166_1}</Text>
                                            ))
                                        }
                                    </View>


                                    <Text style={[styles.overview,theme.themeText]}>{Movie?.overview}</Text>
                                </View>
                            </View>

                        )}

                    <View style={[styles.genres]}>
                        {
                            Movie?.genres.map((genre) => (
                                <Text key={genre.id} style={[styles.genre, theme.card, theme.themeText]}>{genre?.name}</Text>
                            ))
                        }
                    </View>
                    <View style={[styles.ratingContainer, theme.card]}>
                        <Text style={[styles.rating]}>{Movie?.vote_average}</Text>
                        <Text style={[styles.text, theme.themeText]}>{Movie?.vote_count}</Text>

                    </View>
                    <View style={[styles.actors, theme.block]} >
                        <Text style={[{fontSize: 28, fontWeight: '500', padding: 20,}, theme.themeText]}>Actors </Text>

                            <ScrollView horizontal >
                                <Suspense fallback={<ActivityIndicator />}>
                                    <FlatList
                                        data={Actors?.cast}
                                        renderItem={renderItem}
                                       // renderItem={({ item }) => <LazyActorsList actor={item} />}
                                        keyExtractor={(item) => item.id.toString()}
                                        numColumns={numColumns}
                                    />

                                </Suspense>

                            </ScrollView>

                    </View>
                    {Similar && Similar.results.length > 0 ? (
                        <View style={[styles.popular, theme.block]}>
                            <Text style={[{fontSize: 24, fontWeight: '500', padding: 10,}, theme.themeText]}>Similar Movies </Text>
                            <HorizontalList data={Similar}  onMovieClick={handleMovieClick}/>
                        </View>
                    ) : ("")
                    }
                    {Recs && Recs.results.length > 0 ? (
                        <View style={[styles.popular, theme.block]}>
                            <Text style={[{fontSize: 24, fontWeight: '500', padding: 10,}, theme.themeText]}>Recommendations</Text>
                            <HorizontalList data={Recs} onMovieClick={handleMovieClick} />
                        </View>
                    ) : ("")
                    }




                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    indicator: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    actors: {
        flex: 1,
        backgroundColor: 'white',
        padding:5,
        borderRadius: 8,
        marginTop: 20,
        height: 450,
    },
    genres: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        margin: 5,
    },
    genre: {
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        padding:5,
        marginLeft: 5,
    },

    imageContainer: {
        aspectRatio: 1,
        overflow: 'hidden',
        position: "relative",
    },
    tinytext:{
        fontSize: 16,
        fontWeight: '300',
    },
    backdrop: {
        flex: 1,
        resizeMode: 'cover',
    },
    poster: {
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        aspectRatio: 1,
        resizeMode: 'contain',
        position: 'absolute',
        top: 0,
        left: '25%',
        right: 0,
        bottom: 0,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: SCREEN_WIDTH / 1.5,
        margin: 10,
        backgroundColor: 'tomato',
        borderRadius: 10,
        padding: 10,

    },
    back: {
        position: 'absolute',
        top: "10%",
        left: 25,
    },
    textContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 16,
        marginTop: 20,
        marginBottom: 20,
    },
    title: {
        textAlign: 'left',
        color: '#000',
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 5,
    },
    tagline: {
        textAlign: 'left',
        color: '#000',
        fontSize: 20,
        fontWeight: "400",
        marginBottom: 10,
    },
    overview: {
        textAlign: 'left',
        color: '#000',
        fontSize: 16,
        fontWeight: "400",
    },
    shadowProp: {
        shadowOffset: {width: -2, height: 4},
        shadowColor: '#171717',
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
    ratingContainer: {
        flex: 1,
        backgroundColor: "white",
        borderRadius: 4,
        margin: 10,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rating: {

        fontSize: 40,
        color: 'rgba(224,55,24,0.94)',
        fontWeight: "700",
    },
    popular : {
        marginTop: 40,
        margin:5,
        backgroundColor: 'white',
        borderRadius: 12,
    },

})

export default TrendingDetails;