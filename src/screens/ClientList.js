import { Text, View } from 'react-native';
import Head from '../components/Head';
import ClientComponent from '../components/ClientComponent';

export default function ClientList() {
	const clients = ['Google', 'Amazon', 'flipkart', 'Hyundai'];
	return (
		<View className="w-full">
			<Head />
			<View className="w-full flex items-end">
				<Text className="mt-8 text-lg mr-12">List of Clients</Text>
			</View>
			<View className="flex items-center">
				{clients.map((client) => (
					<ClientComponent key={client} clientName={client} />
				))}
			</View>
		</View>
	);
}
