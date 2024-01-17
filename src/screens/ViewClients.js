import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import Head from '../components/Head';
import ClientComponent from '../components/ClientComponent';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ViewClients({ navigation }) {
	const [clients, setClients] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [token, setToken] = useState(null);

	useEffect(() => {
		async function isUserLoggedIn() {
			tok = await AsyncStorage.getItem('token');
			setToken(tok);
		}
		isUserLoggedIn();
	}, []);

	useEffect(() => {
		fetch(`${process.env.EXPO_PUBLIC_API_URL}/clients/`, {
			method: 'GET',
			headers: {
				'Content-type': 'application/json',
				authorization: `Bearer ${token}`,
			},
		})
			.then((response) => response.json())
			.then((res) => {
				setClients(res.data.clients);
				setIsLoading(false);
			})
			.catch((err) => console.log(err));
	}, [token]);

	const handleDelete = (id) => {
		const updatedCLients = clients.filter((client) => client._id !== id);
		setClients(updatedCLients);
	};

	const handleNavigation = () => {
		navigation.navigate('AddClient');
	};

	const loadClients = () => {
		if (isLoading) {
			return <ActivityIndicator size="large" color="#65B741" />;
		}

		return (
			<View className="w-full flex items-center relative">
				{clients.map((client) => (
					<ClientComponent client={client} handleDelete={handleDelete} key={client._id} />
				))}
			</View>
		);
	};

	return (
		<View className="w-screen">
			<Head />
			<View className="w-screen flex items-end">
				<Text className="mt-8 text-lg mr-12">List of Clients</Text>
			</View>
			<View className="w-screen flex items-center mt-3">
				<View className="w-11/12">
					{loadClients()}
					<View className="absolute top-full left-10 mt-4">
						<TouchableOpacity className="bg-blue-500 p-3 rounded-lg" onPress={handleNavigation}>
							<Text className="text-white">Add Client</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
	);
}
