import {useNavigation} from "@react-navigation/native";
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View, Dimensions} from "react-native";
import {formatDateString} from "../../utils";
import React from "react";
import {ratingList, options} from "../../utils";
import {useAppTheme} from "../../hooks/useAppTheme";
import {imageUri} from "../../utils";

const COLUMN_COUNT = 2;
const ITEM_MARGIN = 10;
const ITEM_WIDTH = (Dimensions.get('window').width - (ITEM_MARGIN * (COLUMN_COUNT + 1))) / COLUMN_COUNT;
const MovieGrid =({ movie, onMovieClick }) => {


    const navigation = useNavigation();
    const theme = useAppTheme();
    const handleOnPress = (movieId) => {
        navigation.navigate('TrendingDetails', {movieId, name: movie?.original_title})
    }


    return(

        <TouchableOpacity onPress={() => onMovieClick  ? onMovieClick(movie.id, movie?.original_title) : handleOnPress(movie.id) }>
            <View style={[styles.container, theme.container ]}>
                <View style={styles.item}>
                    <View style={styles.imageContainer}>
                        <ImageBackground
                            style={styles.backdrop}
                            source={{uri: `${imageUri.norm}${movie.poster_path}`}}
                        />
                        <View style={[styles.rating, {backgroundColor: ratingList(movie?.vote_average)} ]}>
                            <Text style={theme.themeText}>{movie.vote_average}</Text>
                        </View>

                    </View>
                    <View style={styles.textContainer}>
                        <Text ellipsizeMode="tail" numberOfLines={2} style={[styles.title, theme.themeText]}>{movie?.original_title}</Text>
                        <Text style={theme.themeText}>{formatDateString(movie?.release_date,options)}</Text>
                    </View>
                </View>

            </View>

        </TouchableOpacity>


    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        marginLeft: ITEM_MARGIN,
        backgroundColor: 'white',
        borderRadius: 8,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',

    },
    item: {
        width: ITEM_WIDTH,
        marginBottom: ITEM_MARGIN,
    },
    imageContainer: {
        aspectRatio: 2 / 3,
        borderRadius: 8,
        overflow: 'hidden',
        position: 'relative',
    },
    tinytext:{
        fontSize: 14,
        fontWeight: '300',
    },
    backdrop: {
        flex: 1,
        resizeMode: 'stretch',
        borderRadius: 8,
    },
    textContainer: {
        flexDirection: 'column',
        paddingHorizontal: 16,
    },
    title: {
        textAlign: 'left',
        color: '#000',
        fontSize: 16,
        fontWeight: "500",
    },
    shadowProp: {
        shadowOffset: {width: -2, height: 4},
        shadowColor: '#171717',
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
    rating: {
        backgroundColor: "rgba(256,250,250,.4)",
        borderRadius: 4,
        paddingLeft: 10,
        paddingRight: 10,
        position: 'absolute',
        left: -5,
        top: "10%",
    }

})

export default MovieGrid;