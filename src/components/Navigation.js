import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import HomeScreen from '../screens/HomeScreen';
import ViewClients from '../screens/ViewClients';
import AddOrders from '../screens/AddOrders';
import AddClient from '../screens/AddClient';
import EditOrder from '../screens/EditOrder';
import IRgeneration from '../screens/IRgeneration';
import MenuQuotation from '../screens/MenuQuotation';
import ViewMenu from '../screens/ViewMenu';

const Stack = createNativeStackNavigator();

export default function Navigation() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouterName="Home" screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="ViewClients" component={ViewClients} />
				<Stack.Screen name="AddOrders" component={AddOrders} />
				<Stack.Screen name="AddClient" component={AddClient} />
				<Stack.Screen name="ViewMenu" component={ViewMenu} />
				<Stack.Screen name="MenuQuotation" component={MenuQuotation} />
				<Stack.Screen name="IRgeneration" component={IRgeneration} />
				<Stack.Screen name="EditOrder" component={EditOrder} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
