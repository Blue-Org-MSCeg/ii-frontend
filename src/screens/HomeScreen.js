import { TouchableOpacity, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import Head from '../components/Head';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import menu from '../constants/constants';
import { CheckToken } from '../middleware/CheckToken';

export default function HomeScreen({ navigation }) {
	// check if user is logged in
	const [isLoggedIn, setIsLoggedIn] = useState('first');

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			console.log('refreshed');
			checkInitialToken();
		});
		return unsubscribe;
	}, [navigation]);

	const checkInitialToken = async () => {
		const hasToken = await CheckToken();
		console.log(hasToken);
		setIsLoggedIn(hasToken);
	};

	useEffect(() => {
		if (!isLoggedIn && isLoggedIn !== 'first') {
			navigation.navigate('SignIn');
		}
	}, [isLoggedIn]);

	return isLoggedIn ? (
		<ScrollView>
			<Head />
			<View className="w-screen flex flex-row justify-center items-center flex-wrap  mt-4">
				{menu.map((item) => (
					<TouchableOpacity
						key={item.id}
						className=" border-2 border-b-[#2881bdcb] border-t-0 border-l-[#2881bdcb] border-r-[#2881bdcb]  p-4 m-6 w-32 h-32 justify-items-center items-center justify-end rounded-lg"
						onPress={() => navigation.navigate(item.to)}
					>
						<FontAwesome name={item.icon} size={32} />
						<Text className="text-center mt-2">{item.label}</Text>
					</TouchableOpacity>
				))}
			</View>
		</ScrollView>
	) : (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<ActivityIndicator size="large" color="#0000ff" />
		</View>
	);
}
