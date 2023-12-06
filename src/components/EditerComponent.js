import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

export default EditerComponent = ({ itemEdit, itemEditPass, setIsEditFoodOpen }) => {
	const [editedItemCost, setEditedItemCost] = useState(itemEdit.cost.toString());
	const [editedItemFood, setEditedItemFood] = useState(itemEdit.foodItem);

	const updateEditedItem = () => {
		console.log('save button pressed');
		itemEdit.foodItem = editedItemFood;
		itemEdit.cost = editedItemCost;
		itemEdit._id = itemEdit._id;
		itemEditPass(itemEdit);
		setIsEditFoodOpen(false);
	};

	return (
		<View className="justify-between mt-5 mb-10 border-b" key={itemEdit}>
			<View className="bg-gray-300 w-52 justify-center content-center p-3 mb-5 mx-20 ml-30">
				<Text className="text-center ">Edit</Text>
			</View>
			<View className="flex-row justify-center mb-5">
				<TextInput className="border-2 border-black w-20 mr-10 px-1" value={editedItemFood} onChangeText={setEditedItemFood} placeholder="food" />
				<TextInput className="border-2 border-black w-20 mr-10 px-1" value={editedItemCost} onChangeText={setEditedItemCost} placeholder="cost" keyboardType="numeric" />
				<TouchableOpacity className=" text-center px-4 py-1 rounded-sm bg-blue-400" onPress={updateEditedItem}>
					<Text className="text-white text-center">Save</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};
