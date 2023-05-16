import {View, Text,  ScrollView} from "react-native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import TrendingDetails from "./TrendingDetails";
import ActorInfoPage from "./ActorInfoPage";
const HomeStackScreen = createNativeStackNavigator();
import {useAppTheme} from "../../hooks/useAppTheme";
const HomeStack = () => {
    const theme = useAppTheme();
    return(

            <HomeStackScreen.Navigator>
                    <HomeStackScreen.Screen
                        name="Home"
                        options={{ headerShown: false }}
                        component={HomeScreen}
                    />
                    <HomeStackScreen.Screen
                        name="TrendingDetails"
                        options={({ route }) => ({ title: `${route.params.name}` }, {
                            headerShown: false,
                        })}
                        component={TrendingDetails}
                    />
                    <HomeStackScreen.Screen
                        name="ActorInfo"
                        options={({ route }) => ({ title: `${route.params.name}` }, {
                            headerStyle:[ theme.block, theme.themeText]
                        })}
                        component={ActorInfoPage }
                    />
            </HomeStackScreen.Navigator>


    )
}
export default HomeStack;