import { Text, View, TouchableOpacity } from 'react-native';
import Head from '../components/Head';
import ClientComponent from '../components/ClientComponent';
import { useEffect, useState } from 'react';
const axios = require('axios');

export default function ViewClients() {
	const clients = ['Google', 'Amazon', 'flipkart', 'Hyundai'];
	const [client, setClients] = useState([]);

	useEffect(() => {
		fetch('http://127.0.0.1/3000/api/v1/clients')
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
			})
			.catch((error) => console.log(error));
	}, []);
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
							<ClientComponent key={client} clientName={client} />
						))}
					</View>
					<View className="absolute top-full left-10 mt-4">
						<TouchableOpacity className="bg-blue-500 p-3 rounded-lg">
							<Text className="text-white">Add Client</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
	);
}
