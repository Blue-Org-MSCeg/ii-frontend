import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

export default MenuComponent = (props) => {
	const [quantity, setQuantity] = useState('0');

	function addQuantityHandler() {
		const newQuanity = (parseInt(quantity) + 1).toString();
		setQuantity(newQuanity);
	}

	return (
		<View key={props.menuItem} className="flex-row justify-between items-center py-2 px-10 bg-zinc-300 w-11/12">
			<Text className="text-lg">{props.menuItem}</Text>
			{/* increase and decrease quantity */}
			<View className="flex-row justify-between w-28 items-center">
				<FontAwesome name="minus" size={20} color="gray" />
				<TextInput keyboardType="numeric" className="bg-white w-12 h-7 rounded-md text-center" value={quantity} onChangeText={(noOfHeads) => setQuantity(noOfHeads)}></TextInput>
				<FontAwesome name="plus" size={20} color="gray" onPress={addQuantityHandler} />
			</View>
		</View>
	);
};
