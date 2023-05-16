import {View, Text, StyleSheet, SafeAreaView, ScrollView, FlatList} from "react-native";
import SearchPart from "../parts/SearchPart";
import {useSearchMoviesQuery} from "../../store/api/rtkQueryApi";
import {useState} from 'react';
import MovieGrid from "../parts/MovieGrid";
import {debounce} from "../../utils";
import {useAppTheme} from "../../hooks/useAppTheme";
import Container from "../Container";
const SearchScreen = () => {
    const theme = useAppTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearchQueryChange = (query) => {
        setSearchQuery(query);
    };
    const debouncedSearch  =  debounce(handleSearchQueryChange, 400)

    const { data: searchResults = [], isFetching } = useSearchMoviesQuery(searchQuery, {
        skip: !searchQuery,
    });

    const handleDebouncedSearchQueryChange = (query) => {
        debouncedSearch(query);
    };
    console.log('searchQuery', searchQuery)
    return(
        <Container>
            <SafeAreaView style={theme.container}>
                <ScrollView >
                    <View style={[styles.container]}>
                        <SearchPart handleSearchQuery={handleDebouncedSearchQueryChange} searchQuery={searchQuery}/>
                    </View>
                    <View>
                        <FlatList
                            data={searchResults?.results}
                            keyExtractor={(item) => item.id.toString()}
                            numColumns={2}
                            renderItem={({ item }) => (
                                <MovieGrid movie={item}/>
                            )}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </Container>


    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
    }
})
export default SearchScreen;