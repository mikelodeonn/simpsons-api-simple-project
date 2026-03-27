import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import CharacterDetailScreen from "../screens/DetailScreen";
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions = {{headerShown: false}}>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                />
                <Stack.Screen
                    name="Detail"
                    component={CharacterDetailScreen}
                />            
            </Stack.Navigator>
        </NavigationContainer>
    )
}