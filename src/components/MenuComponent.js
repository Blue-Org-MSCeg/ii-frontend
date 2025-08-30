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
		<View key={menuItem._id} className="flex-row justify-between items-center py-3 px-10 bg-white rounded-md w-11/12 shadow-2xl my-2">
			<Text className="text-xl tracking-wider">{menuItem.foodItem}</Text>
			{/* increase and decrease quantity */}
			<View className="flex-row justify-between w-28 items-center left-4 px-3 py-1 rounded-full bg-green">
				<FontAwesome name="minus" size={20} color="white" onPress={subtractQuantityHandler} />
				<TextInput
					keyboardType="numeric"
					className="w-12 h-7 text-white font-bold rounded-md text-center"
					value={quantity}
					onChangeText={(noOfHeads) => {
						// console.log(menuItem._id);
						// console.log(noOfHeads);
						setQuantity(noOfHeads);
						handleInputChange(noOfHeads, menuItem._id);
					}}
				></TextInput>
				<FontAwesome name="plus" size={20} color="white" onPress={addQuantityHandler} />
			</View>
		</View>
	);
};
