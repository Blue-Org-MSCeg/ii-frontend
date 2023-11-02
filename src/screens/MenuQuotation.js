import { View, Text, Button, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import EditFoodComponent from '../components/EditFoodComponent';
import EditerComponent from '../components/EditerComponent';
import DropDown from '../components/DropDown';

export default function MenuQuotation() {
	const [cost, setCost] = useState('');
	const [food, setFood] = useState('');
	const [client, setClient] = useState({});
	const [formData, setFormData] = useState({});
	const [itemEdit, setItemEdit] = useState('');
	const [isAddFoodOpen, setIsAddFoodOpen] = useState(false);
	const [isEditFoodOpen, setIsEditFoodOpen] = useState(false);

	const editorPass = (item) => {
		setItemEdit(item);
	};

	const itemEditPass = (itemEdit) => {
		// console.log('item edit pass', itemEdit);
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
		setFormData({
			_id: itemEdit._id,
			foodItem: itemEdit.foodItem,
			cost: Number(itemEdit.cost),
		});
		// itemEdit.cost = Number(itemEdit.cost);
		console.log('changed', typeof itemEdit.cost);
	}, [itemEdit]);

	useEffect(() => {
		console.log('formData changed');
		fetch(`http://192.168.141.152:3000/api/v1/clients/quotation/${client._id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(itemEdit),
		})
			.then((response) => response.json())
			.then((data) => console.log(data))
			.catch((err) => console.log(err));

		if (itemEdit) {
			const updatedQuotation = menuQuotation.map((item) => (item._id === itemEdit._id ? { _id: itemEdit._id, foodItem: itemEdit.foodItem, cost: itemEdit.cost } : item));
			setMenuQuotation(updatedQuotation);
		}
	}, [formData]);

	// getting the menu quotation respective to the client
	let [menuQuotation, setMenuQuotation] = useState([]);
	const changeOrderList = (client) => {
		setClient(client);
		setMenuQuotation(client.menuQuotation);
	};

	return (
		<View className="w-full">
			<View className="mt-10 mb-8 p-5 border-solid content-center border-1 justify-center bg-blue-400 ">
				<Text className="text-center">MenuQuotation</Text>
			</View>

			{/* list clients */}
			<DropDown changeOrderList={changeOrderList} />

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

			{isEditFoodOpen && <EditerComponent itemEdit={itemEdit} itemEditPass={itemEditPass} />}

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
				{menuQuotation.map((item) => (
					<EditFoodComponent item={item} setIsEditFoodOpen={setIsEditFoodOpen} setMenuItem={setMenuQuotation} editorPass={editorPass} />
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
