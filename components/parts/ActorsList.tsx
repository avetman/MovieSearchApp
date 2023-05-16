import {Image, StyleSheet, Text, View, Dimensions, TouchableOpacity} from "react-native";
import React from "react";
import {useAppTheme} from "../../hooks/useAppTheme";
const { height, width: SCREEN_WIDTH} = Dimensions.get("window");
import { useNavigation, Link  } from '@react-navigation/native';
import {imageUri} from "../../utils";

const ActorsList = ({actor}) => {

    const theme = useAppTheme();
    const navigation = useNavigation();
    const handleOnPress = (movieId) => {
        navigation.navigate('ActorInfo', {movieId, name: actor?.name})
    }
    return(
        <TouchableOpacity onPress={() =>  handleOnPress(actor.id) }>
            <View style={[styles.ListItem, styles.shadowProp, theme.block ]}>
                <View style={styles.itemContainer}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.pic}
                            source={{uri: `${imageUri.low}${actor?.profile_path}`}}
                        />

                    </View>

                    <View style={styles.textContainer}>
                        <Text ellipsizeMode="tail" numberOfLines={2} style={[styles.title,theme.themeText]}>{actor?.original_name}</Text>
                        <Text ellipsizeMode="tail" numberOfLines={2} style={[styles.tinytext, theme.themeText]}>{actor?.character}</Text>
                    </View>
                </View>


            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    ListItem: {
        backgroundColor: 'white',
        borderRadius: 8,
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    itemContainer: {
        flexDirection: 'row',
        margin: 5,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',

    },
    imageContainer: {
        borderRadius: 5,
        marginBottom: 10,
    },
    tinytext:{
        fontSize: 14,
        fontWeight: '300',
    },
    pic: {
        width: 55,
        aspectRatio: 1/1.3,
        resizeMode: 'cover',
        overflow: 'hidden',
    },
    textContainer: {
        width: SCREEN_WIDTH / 2,
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
export default ActorsList;