import { Button, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native';

export default function ClientComponent(props) {
	return (
		<View className="w-4/5 flex flex-row justify-between items-center bg-gray-300 p-3 border-b border-gray-400">
			<Text className="text-base">{props.clientName}</Text>
			<TouchableOpacity className="bg-red-500 w-20 px-3 py-1 rounded-full">
				<Text className="text-teal-50">remove</Text>
			</TouchableOpacity>
		</View>
	);
}
