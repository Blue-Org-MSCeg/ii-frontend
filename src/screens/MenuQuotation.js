import { View, Text, Button, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import EditFoodComponent from '../components/EditFoodComponent';
import EditerComponent from '../components/EditerComponent';

export default function MenuQuotation() {
	const [menuItem, setMenuItem] = useState([
		{ food: 'Breakfast', cost: '50', id: '1' },
		{ food: 'snacks', cost: '30', id: '2' },
		{ food: 'Lunch', cost: '100', id: '3' },
		{ food: 'Dinner', cost: '60', id: '4' },
	]);

	const [cost, setCost] = useState('');
	const [food, setFood] = useState('');
	const [itemEdit, setItemEdit] = useState(null);
	const [isAddFoodOpen, setIsAddFoodOpen] = useState(false);
	const [isEditFoodOpen, setIsEditFoodOpen] = useState(false);

	const editorPass = (item) => {
		setItemEdit(item);
	};

	const itemEditPass = (itemEdit) => {
		setItemEdit(itemEdit);
	};

	const changeFood = (food) => {
		setFood(food);
	};

	const changeCost = (cost) => {
		setCost(cost);
	};

	const toggleAddFoodHandler = () => {
		setIsAddFoodOpen(!isAddFoodOpen);
	};

	const addFood = () => {
		setMenuItem((currentMenu) => [...currentMenu, { food: food, cost: cost }]);
		toggleAddFoodHandler();
	};

	useEffect(() => {
		console.log(itemEdit);
		if (itemEdit) {
			const updatedItem = menuItem.map((item) => (item.id === itemEdit.id ? { id: itemEdit.id, food: itemEdit.food, cost: itemEdit.cost } : item));
			setMenuItem(updatedItem);
			// setIsEditFoodOpen(false);
		}
	}, [itemEdit]);

	return (
		<View className="w-full">
			<View className="mt-10 mb-8 p-5 border-solid content-center border-1 justify-center bg-blue-400 ">
				<Text className="text-center">MenuQuotation</Text>
			</View>

			{/* add food items for company */}
			{isAddFoodOpen && (
				<View className="align-middle justify-center content-centers flex border-b mb-5">
					<View className="flex-row flex-2 p-15">
						<View className="border-2 bg-gray-300 border-black w-7/12 p-2 ml-10 ">
							<TextInput onChangeText={changeFood} maxLength={40} placeholder="food item" />
						</View>
						<View className="bg-gray-300 border-2 border-black  p-2 mr-10 ml-6 ">
							<TextInput onChangeText={changeCost} className="" placeholder="cost" keyboardType="numeric" />
						</View>
					</View>
					<TouchableOpacity>
						<View className="flex-row justify-between p-5">
							<View className="ml-6">
								<Button title="CANCEL" onPress={toggleAddFoodHandler} />
							</View>
							<View className="mr-10">
								<Button onPress={addFood} title="submit" />
							</View>
						</View>
					</TouchableOpacity>
				</View>
			)}

			{isEditFoodOpen && <EditerComponent itemEdit={itemEdit} setItemEdit={setItemEdit} />}

			{/* View menu */}
			<View className="place-items-center">
				<View className="flex-row">
					<View>
						<Text className="border border-black p-2 m-1 w-40 bg-gray-300 font-bold">Items</Text>
					</View>
					<View>
						<Text className="border border-black p-2 m-1 w-20 bg-gray-300 font-bold">Cost</Text>
					</View>
				</View>
				{menuItem.map((item) => (
					<EditFoodComponent item={item} index={item.id} setIsEditFoodOpen={setIsEditFoodOpen} setMenuItem={setMenuItem} editorPass={editorPass} />
				))}
			</View>

			<TouchableOpacity>
				<View className="w-20 justify-between p-1 rounded-md mt-10">
					<Button title="ADD" onPress={toggleAddFoodHandler} />
				</View>
			</TouchableOpacity>
		</View>
	);
}
