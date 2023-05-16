import {View, Text, StyleSheet, ImageBackground } from 'react-native';
import {Fontisto} from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {formatDateString} from "../../../utils";
import { Link } from '@react-navigation/native';
import {useAppTheme} from "../../../hooks/useAppTheme";
import {imageUri} from "../../../utils";

const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
};


const ListItem = ({movie}) => {
    const theme = useAppTheme();

    return(
        <Link to={{ screen: 'TrendingDetails', params: {movieId: movie.id, name: movie?.original_title} }}>
            <View style={[styles.ListItem, styles.shadowProp, theme.block ]}>

                    <View style={styles.imageContainer}>
                        <ImageBackground
                            style={styles.backdrop}
                            source={{uri: `${imageUri.low}${movie.poster_path}`}}
                        />
                    </View>

                    <View style={styles.textContainer}>
                        <Text ellipsizeMode="tail" numberOfLines={2} style={[styles.title, theme.themeText]}>{movie?.original_title}</Text>
                        <Text style={theme.themeText}>{formatDateString(movie?.release_date,options)}</Text>
                    </View>

            </View>
        </Link>
    )
}

const styles = StyleSheet.create({
    ListItem: {
        flex: 1,
        marginBottom:5,
        backgroundColor: 'white',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding:10,
    },
    imageContainer: {
        width: 75,
        aspectRatio: 1,
        borderRadius: 8,
        overflow: 'hidden',
    },
    tinytext:{
        fontSize: 14,
        fontWeight: '300',
    },
    backdrop: {
        flex: 1,
        resizeMode: 'contain',
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
        fontWeight: "700",
    },
    shadowProp: {
        shadowOffset: {width: -2, height: 4},
        shadowColor: '#171717',
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
    rating: {
       width: "30%",
        backgroundColor: "rgba(256,250,250,.4)",
       borderRadius: 4,
       paddingLeft: 10,
       paddingRight: 10,
    }

})
export default ListItem;