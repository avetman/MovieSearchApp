import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {SafeAreaView, StatusBar, StyleSheet} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import HomeStack from "./pages/HomeStack";
import ProfileScreen from "./screens/ProfileScreen";
import SearchScreen from "./screens/SearchScreen";
import {useAppTheme} from "../hooks/useAppTheme";
import {useSelector} from "react-redux";
import {View} from "react-native";
import darkTheme from "./styles/darkTheme";
import lightTheme from "./styles/lightTheme";
const Tab = createBottomTabNavigator();

const MainBottomNav = () => {
    const currentTheme = useSelector((state) => state.root.theme.currentTheme);
    const theme = useAppTheme();
    return(

                <Tab.Navigator
                    initialRouteName="Home"
                    screenOptions={{
                        tabBarStyle: theme.container,
                        tabBarActiveTintColor: 'tomato',
                        headerShown: false,
                    }}
                >
                    <Tab.Screen
                        name="Main" component={HomeStack}
                        options={{
                            tabBarLabel: 'Main',
                            tabBarIcon: ({ color,size  }) => (
                                <AntDesign name="home" size={24} color={color} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Search"
                        component={SearchScreen}
                        options={{
                            tabBarLabel: 'Search',
                            tabBarIcon: ({ color, size }) => (
                                <AntDesign name="search1" size={24} color={color} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Profile"
                        component={ProfileScreen}
                        options={{
                            tabBarLabel: 'Profile',
                            tabBarIcon: ({ color, size }) => (
                                <AntDesign name="user" size={24} color={color} />
                            ),
                        }}


                    />
                </Tab.Navigator>





    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    }
})
export default MainBottomNav;