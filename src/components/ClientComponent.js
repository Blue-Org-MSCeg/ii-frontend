import { FontAwesome } from '@expo/vector-icons';
import { Button, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native';

export default function ClientComponent(props) {
	const deleteClient = (id) => {
		fetch(`${process.env.EXPO_PUBLIC_API_URL}/clients/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then(() => Alert.alert('Success', 'Client removed successfully', [{ text: 'OK' }]));

		props.handleDelete(id);
	};

	const styles = {
		container: {
			shadowColor: '#004',
			shadowOffset: { width: 0, height: 2 }, // Adjust for X and Y offset
			shadowOpacity: 0.1,
			shadowRadius: 2,
		},
	};

	return (
		<View styles={styles.container} key={props.client._id} className="w-4/5 flex flex-row justify-between items-center bg-white py-5 px-6 mb-2 rounded-lg shadow-lg ">
			<Text className="text-base">{props.client.businessName}</Text>
			<TouchableOpacity className="px-3 py-1 rounded-full" onPress={() => deleteClient(props.client._id)}>
				<FontAwesome name="minus" color="red" size={15} />
			</TouchableOpacity>
		</View>
	);
}
