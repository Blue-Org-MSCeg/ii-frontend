import { FontAwesome } from '@expo/vector-icons';
import { Button, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native';

export default function ClientComponent(props) {
	return (
		<View key={props.keyval} className="w-4/5 flex flex-row justify-between items-center bg-gray-300 p-3 border-b border-gray-400">
			<Text className="text-base">{props.clientName}</Text>
			<TouchableOpacity className="px-3 py-1 rounded-full">
				<FontAwesome name="minus" color="red" size={15} />
			</TouchableOpacity>
		</View>
	);
}
