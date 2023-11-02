import { useState } from 'react';
import { Button, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default EditerComponent = ({ itemEdit, itemEditPass }) => {
	const [editedItemCost, setEditedItemCost] = useState(JSON.stringify(itemEdit.cost));
	const [editedItemFood, setEditedItemFood] = useState(itemEdit.foodItem);

	const updateEditedItem = () => {
		console.log('save button pressed');
		itemEdit.foodItem = editedItemFood;
		itemEdit.cost = editedItemCost;
		itemEdit._id = itemEdit._id;
		console.log(itemEdit);
		itemEditPass(itemEdit);
	};

	//   const handleEdit = () => {
	//     const updatedItem = menuItem.map((item) =>
	//       item.food === isEditingFood ? { ...item, cost: editedItemCost } : item
	//     );
	//     setMenuItem(updatedItem);
	//     setIsEditFoodOpen("");
	//     setEditedItemCost("");
	//   };

	return (
		<View className="justify-between mt-5 mb-10 border-b">
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
