import { Button, Text, View } from 'react-native';

export default EditFoodComponent = ({ item, setIsEditFoodOpen, editorPass, deleteItem }) => {
	return (
		<View className=" flex-row mb-3 justify-between mr-2" key={item._id}>
			<View className="border border-black p-2 m-1 w-40 bg-gray-300">
				<Text>{item.foodItem}</Text>
			</View>
			<View className="border border-black p-2 m-1 w-20 bg-gray-300">
				<Text className=" text-center ">{item.cost}</Text>
			</View>

			<View className="mr-2 m-1">
				<Button
					title="edit"
					onPress={() => {
						setIsEditFoodOpen(true);
						editorPass(item);
					}}
				/>
			</View>
			<View className="m-1">
				<Button title="remove" onPress={() => deleteItem(item)} />
			</View>
		</View>
	);
};
