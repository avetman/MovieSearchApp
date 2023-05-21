import {View, Text, FlatList, ScrollView, StyleSheet, ActivityIndicator} from 'react-native';
import ListItem from "./ListItem";
import {useCallback} from "react";


const PopularPeopleSection = ({data }) => {
    const renderItem = useCallback(({item}) => (
        <ListItem movie={item} />
    ), []);
    return (
        <View style={styles.List}>
            <FlatList
                data={data?.results}
                renderItem={renderItem}
                //renderItem={({item}) => <ListItem movie={item} />}
                keyExtractor={item => item.id.toString()}
                horizontal={true}
            />
        </View>

    );
}

const styles = StyleSheet.create({
    List: {
      paddingBottom: 10,
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

export default PopularPeopleSection;