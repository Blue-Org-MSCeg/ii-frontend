import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import HomeScreen from "../screens/HomeScreen";
import ViewClients from "../screens/ViewClients";
import Home from "./../screens/Home";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouterName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ViewClients" component={ViewClients} />
        <Stack.Screen name="load" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
