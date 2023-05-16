import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Fontisto} from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {formatDateString} from "../../../utils";
import {useAppTheme} from "../../../hooks/useAppTheme";
import { useNavigation, Link  } from '@react-navigation/native';
import {imageUri} from "../../../utils";

const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
};
const ratingList = (rating) => {
    if (rating >= 7.0) {
        return 'rgba(117, 255, 80, 0.6)';
    } else if (rating >= 5.0 && rating < 7.0) {
        return 'rgba(159,153,153,0.6)';
    } else {
        return 'rgba(227, 27, 27, 0.6)';
    }
}

const ListItem = ({movie}) => {

    const themeStyles = useAppTheme();
    const navigation = useNavigation();

    const handleOnPress = (movieId, name) => {
        navigation.navigate('ActorInfo', {movieId, name})
    }
    return(
        <TouchableOpacity onPress={() => handleOnPress(movie.id, movie.name)}>
            <View style={[styles.ListItem ]}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.pic}
                        source={{uri: `${imageUri.low}${movie.profile_path}`}}
                    />
                    {/*<View style={styles.rating}>*/}
                    {/*    <Text>{movie.vote_average}</Text>*/}
                    {/*</View>*/}

                </View>

                <View style={styles.textContainer}>
                    <Text ellipsizeMode="tail" numberOfLines={2} style={[styles.title, themeStyles.themeText]}>{movie?.name}</Text>
                    <Text style={[themeStyles.themeText]}>{movie.known_for_department}</Text>
                </View>

            </View>
        </TouchableOpacity>

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
        width: 100,
        height: 100,
        borderRadius: 75,
        overflow: 'hidden',
    },
    tinytext:{
        fontSize: 14,
        fontWeight: '300',
    },
    pic: {
        flex: 1,
        resizeMode: 'cover',
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