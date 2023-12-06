import { FontAwesome } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';

export default EditFoodComponent = ({ item, setIsEditFoodOpen, editorPass, deleteItem }) => {
	return (
		<View className=" flex-row justify-between items-center mx-3 bg-gray-300" key={item._id}>
			<View className="p-2 m-1 w-40 ">
				<Text className="text-base">{item.foodItem}</Text>
			</View>
			<View className="p-2 m-1 w-20 ">
				<Text className=" text-center text-base">{item.cost}</Text>
			</View>

			<TouchableOpacity>
				<Text
					title="edit"
					onPress={() => {
						setIsEditFoodOpen(true);
						editorPass(item);
					}}
					className="bg-blue-500 px-3 py-1 rounded-md text-white"
				>
					Edit
				</Text>
			</TouchableOpacity>
			{/* <View className="m-1">
				<Button title="remove" onPress={() => deleteItem(item)} />
			</View> */}
			<TouchableOpacity className="px-3 py-1 rounded-full" onPress={() => deleteItem(item)}>
				<FontAwesome name="minus" color="red" size={18} />
			</TouchableOpacity>
		</View>
	);
};
