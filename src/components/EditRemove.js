import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';

export default EditRemove = ({ item, updateOrder, deleteOrder }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [newQuantity, setNewQuantity] = useState(item.numberOfHeads.toString());

	const handleEdit = () => {
		setIsEditing(true);
	};

	const updateQuantity = () => {
		const updatedOrder = {
			_id: item._id,
			foodItem: item.foodItem,
			foodCost: item.foodCost,
			numberOfHeads: Number(newQuantity),
		};
		setIsEditing(false);
		updateOrder(updatedOrder);
	};

	const removeOrder = () => {
		deleteOrder(item);
	};

	return (
		<View className="flex-row justify-between items-center px-3 py-2 border-b" key={item._id}>
			<Text className="text-2xl font-normal">{item.foodItem}</Text>
			{isEditing ? (
				<View className="flex-row items-center justify-center">
					<TextInput value={newQuantity} onChangeText={(text) => setNewQuantity(text)} keyboardType="numeric" className="border rounded-md px-3 py-1 mr-3" />
					<TouchableOpacity onPress={updateQuantity}>
						<Text className="bg-blue-400 w-15 p-1 rounded-md mt-2 mr-10 items-center">Save</Text>
					</TouchableOpacity>
				</View>
			) : (
				<View className="flex flex-row items-center justify-center">
					<Text className="text-lg mr-2 border px-3 rounded-md">{item.numberOfHeads}</Text>
					<TouchableOpacity onPress={handleEdit}>
						<Text className="bg-green-400 w-15 p-1 rounded-md items-center px-3 py-1 ">Edit</Text>
					</TouchableOpacity>
					<TouchableOpacity className="px-3 py-1 rounded-full flex justify-center items-center" onPress={removeOrder}>
						<FontAwesome name="minus" color="red" size={15} />
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
};
