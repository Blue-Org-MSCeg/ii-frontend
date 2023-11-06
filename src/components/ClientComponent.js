import { FontAwesome } from '@expo/vector-icons';
import { Button, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native';

export default function ClientComponent(props) {
	const deleteClient = (id) => {
		console.log('delete:', id);
		fetch(`http://192.168.197.222:3000/api/v1/clients/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		props.handleDelete(id);
	};
	return (
		<View key={props.id} className="w-4/5 flex flex-row justify-between items-center bg-gray-300 p-3 border-b border-gray-400">
			<Text className="text-base">{props.clientName}</Text>
			<TouchableOpacity className="px-3 py-1 rounded-full" onPress={() => deleteClient(props.id)}>
				<FontAwesome name="minus" color="red" size={15} />
			</TouchableOpacity>
		</View>
	);
}
