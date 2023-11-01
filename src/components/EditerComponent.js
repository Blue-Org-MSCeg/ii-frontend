import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

export default EditerComponent = ({ itemEdit, setItemEdit }) => {
	const [editedItemCost, setEditedItemCost] = useState(itemEdit.cost);
	const [editedItemFood, setEditedItemFood] = useState(itemEdit.food);

	const updateEditedItem = () => {
		console.log('save button pressed');
		itemEdit.food = editedItemFood;
		itemEdit.cost = editedItemCost;
		itemEdit.id = itemEdit.id;
		setItemEdit(itemEdit);
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
				<TextInput className="border-2 border-black w-20 mr-10" value={editedItemFood} onChangeText={setEditedItemFood} placeholder="food" />
				<TextInput className="border-2 border-black w-20 mr-10" value={editedItemCost} onChangeText={setEditedItemCost} placeholder="Cost" keyboardType="numeric" />
				<View className="ml-2">
					<Button title="Save" onPress={updateEditedItem} />
				</View>
			</View>
		</View>
	);
};
