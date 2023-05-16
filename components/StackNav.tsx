import TrendingView from "./pages/TrendingView";
import TrendingDetails from "./pages/TrendingDetails";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const StackNav = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='TrendingDetails'
                component={TrendingDetails}
            />
    </Stack.Navigator>
    )
}

export default StackNav

