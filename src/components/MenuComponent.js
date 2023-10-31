import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

export default MenuComponent = ({ handleInputChange, menuItem }) => {
	const [quantity, setQuantity] = useState('0');

	function addQuantityHandler() {
		const newQuanity = (parseInt(quantity) + 1).toString();
		setQuantity(newQuanity);
	}

	function subtractQuantityHandler() {
		const newQuanity = (parseInt(quantity) - 1).toString();
		if (newQuanity >= 0) setQuantity(newQuanity);
	}

	return (
		<View key={menuItem._id} className="flex-row justify-between items-center py-2 px-10 bg-zinc-300 w-11/12">
			<Text className="text-lg">{menuItem.foodItem}</Text>
			{/* increase and decrease quantity */}
			<View className="flex-row justify-between w-28 items-center left-4">
				<FontAwesome name="minus" size={20} color="gray" onPress={subtractQuantityHandler} />
				<TextInput
					keyboardType="numeric"
					className="bg-white w-12 h-7 rounded-md text-center"
					value={quantity}
					onChangeText={(noOfHeads) => {
						// console.log(menuItem._id);
						// console.log(noOfHeads);
						setQuantity(noOfHeads);
						handleInputChange(noOfHeads, menuItem._id);
					}}
				></TextInput>
				<FontAwesome name="plus" size={20} color="gray" onPress={addQuantityHandler} />
			</View>
		</View>
	);
};
