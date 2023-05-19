import {View, Text, FlatList, ScrollView, StyleSheet, ActivityIndicator, SafeAreaView} from 'react-native';
import ListItem from "./ListItem";
import {useAppTheme} from "../../../hooks/useAppTheme";
import {useCallback} from "react";




const VerticalList = ({data:{results}}) => {
const theme = useAppTheme()
    const Separator = () => {
        return <View style={[{ height: 5, backgroundColor: '#eee' }, theme.container]} />;
    };
    const renderItem = useCallback(({item}) => (
        <ListItem movie={item} />
    ), []);

    return (
        <View style={[styles.List, theme.block]}>

            <FlatList
                ItemSeparatorComponent={Separator}
                data={results}
                renderItem={renderItem}
               // renderItem={({item}) => <ListItem movie={item} />}
                keyExtractor={item => item.id.toString()}
                horizontal={false}
                nestedScrollEnabled
            />

        </View>

    );
}

const styles = StyleSheet.create({
    List: {
        height: 200,
    },
    title: {
        fontSize: 16,
        fontWeight: '300',
        color: 'white',
        marginLeft: 20,
    },

})

export default VerticalList;