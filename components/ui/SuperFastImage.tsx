import { Image } from 'expo-image';
import {StyleSheet, View, SafeAreaView} from "react-native";

const ACCESS_AUTH_TOKEN = process.env.ACCESS_AUTH_TOKEN;
import {imageUri} from "../../utils";

const SuperFastImage = ({uri, ...otherProps}) => {


    return(
        <SafeAreaView >
            <Image
                {...otherProps}
                source={{uri: `${imageUri.norm}${uri}`}}
                placeholder={require('../../assets/img/fallback.png')}
                contentFit='cover'
            />
        </SafeAreaView>


    )
}

export default SuperFastImage;