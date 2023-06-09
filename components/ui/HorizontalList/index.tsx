import {View, Text, FlatList, ScrollView, StyleSheet, ActivityIndicator} from 'react-native';
import ListItem from "./ListItem";
import {useCallback} from "react";

const HorizontalList = ({data, onMovieClick }) => {

    const renderItem = useCallback(({item}) => (
        <ListItem movie={item}  onMovieClick={onMovieClick} />
    ), []);

    return (
        <View style={styles.List}>
            <FlatList
                data={data?.results}
                renderItem={renderItem}
                removeClippedSubviews={true}
                //renderItem={({item}) => <ListItem movie={item}  onMovieClick={onMovieClick} />}
                keyExtractor={item => item.id.toString()}
                horizontal={true}
                nestedScrollEnabled
                scrollsToTop={true}

            />
        </View>

    );
}

const styles = StyleSheet.create({
    List: {
        height: 290,
    },
    title: {
        fontSize: 16,
        fontWeight: '300',
        color: 'white',
        marginLeft: 20,
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
})

export default HorizontalList;