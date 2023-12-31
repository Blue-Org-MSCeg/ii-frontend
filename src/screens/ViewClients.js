import { Text, View, TouchableOpacity } from 'react-native';
import Head from '../components/Head';
import ClientComponent from '../components/ClientComponent';
import { useEffect, useState } from 'react';

export default function ViewClients({ navigation }) {
	const [clients, setClients] = useState([]);

	useEffect(() => {
		fetch(`${process.env.EXPO_PUBLIC_API_URL}/clients`)
			.then((response) => response.json())
			.then((res) => {
				setClients(res.data.clients);
			})
			.catch((err) => console.log(err));
	}, []);

	const handleDelete = (id) => {
		const updatedCLients = clients.filter((client) => client._id !== id);
		setClients(updatedCLients);
	};

	const handleNavigation = () => {
		navigation.navigate('AddClient');
	};

	return (
		<View className="w-screen">
			<Head />
			<View className="w-screen flex items-end">
				<Text className="mt-8 text-lg mr-12">List of Clients</Text>
			</View>
			<View className="w-screen flex items-center mt-3">
				<View className="w-11/12">
					<View className="w-full flex items-center relative">
						{clients.map((client) => (
							<ClientComponent client={client} handleDelete={handleDelete} key={client._id} />
						))}
					</View>
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
