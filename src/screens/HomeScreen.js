import { TouchableOpacity, View, Text } from 'react-native';
import Head from '../components/Head';
import HomeMenu from '../components/HomeMenu';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function HomeScreen({ navigation }) {
	const menu = [
		{ label: 'add client', icon: 'user-plus', to: 'AddClient' },
		{ label: 'add orders', icon: 'user-plus', to: 'AddOrder' },
		{ label: 'edit orders', icon: 'user-plus', to: 'EditOrder' },
		{ label: 'view clients', icon: 'user-plus', to: 'ViewClients' },
		{ label: 'view menu', icon: 'user-plus', to: 'ViewMenu' },
		{ label: 'Menu quotation', icon: 'user-plus', to: 'MenuQuotation' },
		{ label: 'Generate Invoice', icon: 'user-plus', to: 'IRgeneartion' },
	];

	return (
		<View>
			<Head />
			<View className="w-full flex flex-row items-center flex-wrap content-start mt-4 ">
				{menu.map((item, i) => (
					<TouchableOpacity className="bg-gray-300 p-4 m-6 w-32 h-32 justify-items-center items-center justify-end rounded-md" onPress={() => navigation.navigate(item.to)} key={i}>
						<FontAwesome name={item.icon} size={32} />
						<Text className="text-center mt-2">{item.label}</Text>
					</TouchableOpacity>
				))}
			</View>
		</View>
	);
}
