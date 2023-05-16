import {View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';
import {Fontisto} from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {formatDateString} from "../../../utils";
import { useNavigation, Link  } from '@react-navigation/native';
import {ratingList} from "../../../utils";
import {useAppTheme} from "../../../hooks/useAppTheme";
import {imageUri} from "../../../utils";

const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
};


const ListItem =({ movie, onMovieClick }) => {

    const themeStyles = useAppTheme();
    const navigation = useNavigation();

    const handleOnPress = (movieId) => {
        navigation.navigate('TrendingDetails', {movieId, name: movie?.original_title})
    }


    return(

        <TouchableOpacity onPress={() => onMovieClick  ? onMovieClick(movie.id, movie?.original_title) : handleOnPress(movie.id) }>
            <View style={[styles.ListItem ]}>
                <View style={styles.imageContainer}>
                    <ImageBackground
                        style={styles.backdrop}
                        source={{uri: `${imageUri.norm}${movie.poster_path}`}}
                    />
                    <View style={[styles.rating, {backgroundColor: ratingList(movie?.vote_average)} ]}>
                        <Text>{movie.vote_average}</Text>
                    </View>

                </View>

                <View style={styles.textContainer}>
                    <Text ellipsizeMode="tail" numberOfLines={2} style={[styles.title,themeStyles.themeText]}>{movie?.original_title}</Text>
                    <Text style={[themeStyles.themeText]}>{formatDateString(movie?.release_date,options)}</Text>
                </View>
            </View>

        </TouchableOpacity>
            // <TouchableOpacity onPress={() => handleOnPress(movie.id)}>
            //     <View style={[styles.ListItem, styles.shadowProp ]}>
            //         <View style={styles.imageContainer}>
            //             <ImageBackground
            //                 style={styles.backdrop}
            //                 source={{uri: `${images}${movie.poster_path}`}}
            //             />
            //             <View style={[styles.rating, {backgroundColor: ratingList(movie?.vote_average)} ]}>
            //                 <Text>{movie.vote_average}</Text>
            //             </View>
            //
            //         </View>
            //
            //         <View style={styles.textContainer}>
            //             <Text ellipsizeMode="tail" numberOfLines={2} style={styles.title}>{movie?.original_title}</Text>
            //             <Text>{formatDateString(movie?.release_date,options)}</Text>
            //         </View>
            //     </View>
            //
            // </TouchableOpacity>



    )
}

const styles = StyleSheet.create({
    ListItem: {
        marginTop: 15,
        marginLeft: 15,
        borderRadius: 8,
        flex: 1,
        width: 130,
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
        flex: 1,
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
export default ListItem;