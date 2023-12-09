import { FontAwesome } from '@expo/vector-icons';
import { Button, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native';
import { API_URL } from '@env';

export default function ClientComponent(props) {
	const deleteClient = (id) => {
		fetch(`${API_URL}/clients/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		props.handleDelete(id);
	};
	return (
		<View key={props.client._id} className="w-4/5 flex flex-row justify-between items-center bg-gray-300 p-3 border-b border-gray-400">
			<Text className="text-base">{props.client.businessName}</Text>
			<TouchableOpacity className="px-3 py-1 rounded-full" onPress={() => deleteClient(props.client._id)}>
				<FontAwesome name="minus" color="red" size={15} />
			</TouchableOpacity>
		</View>
	);
}
