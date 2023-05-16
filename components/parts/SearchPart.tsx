import {View, Text, TextInput, StyleSheet} from "react-native";
import {useState, useEffect} from "react";
import { MaterialIcons } from '@expo/vector-icons';
import {useAppTheme} from "../../hooks/useAppTheme";
const SearchPart = ({handleSearchQuery, searchQuery}) => {
    const [text, onChangeText] = useState('');
    const theme = useAppTheme();
    const handleSeach = (e) => {
        onChangeText(e.value)
        handleSearchQuery(e.value)
    }
    return(
        <View style={[styles.container, theme.container]}>
            <TextInput
                style={styles.input}
                onChangeText={handleSearchQuery}
            />
            <MaterialIcons style={styles.searchIcon} name="search" size={24} color="#fff" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        backgroundColor: 'tomato',
        borderColor: 'tomato',
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        color: '#fff',
    },
    searchIcon: {
        marginRight: 10,
    }


})
export default SearchPart;