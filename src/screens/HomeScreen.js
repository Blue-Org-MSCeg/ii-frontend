import { TouchableOpacity, View, Text, ScrollView } from 'react-native';
import Head from '../components/Head';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import menu from '../constants/constants';

export default function HomeScreen({ navigation }) {
	return (
		<ScrollView>
			<Head />
			<View className="w-full flex flex-row items-center flex-wrap content-start mt-4 ">
				{menu.map((item) => (
					<TouchableOpacity key={item.id} className="bg-gray-300 p-4 m-6 w-32 h-32 justify-items-center items-center justify-end rounded-md" onPress={() => navigation.navigate(item.to)}>
						<FontAwesome name={item.icon} size={32} />
						<Text className="text-center mt-2">{item.label}</Text>
					</TouchableOpacity>
				))}
			</View>
		</ScrollView>
	);
}
