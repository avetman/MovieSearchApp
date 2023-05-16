import {ScrollView, StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainBottomNav from "./components/MainBottomNav";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import StackNav from "./components/StackNav";
import TrendingDetails from "./components/pages/TrendingDetails";
const Stack = createNativeStackNavigator();
import Container from "./components/Container";
export default function Wrapped() {
    return (
            <NavigationContainer>

                    <MainBottomNav />

            </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
    },
});
