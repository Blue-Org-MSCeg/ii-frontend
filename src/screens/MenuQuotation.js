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
	const [editFormData, setEditFormData] = useState({});
	const [itemEdit, setItemEdit] = useState({});
	const [editedItem, setEditedItem] = useState({});
	const [isAddFoodOpen, setIsAddFoodOpen] = useState(true);
	const [isEditFoodOpen, setIsEditFoodOpen] = useState(false);
	let [menuQuotation, setMenuQuotation] = useState([]);

	const editorPass = (item) => {
		setItemEdit(item);
	};

	const itemEditPass = (itemEdit) => {
		console.log('item edit pass', itemEdit);
		setEditedItem(itemEdit);
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

	// getting the menu quotation respective to the client
	const changeOrderList = (client) => {
		setClient(client);
		setMenuQuotation(client.menuQuotation);
	};

	const addFood = () => {
		setFormData({
			foodItem: food,
			cost: cost,
		});
	};

	// posting the food to the db when submit button is pressed
	useEffect(() => {
		fetch(`http://192.168.137.1:3000/api/v1/clients/quotation/${client._id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		})
			.then((response) => {
				if (!response.ok) {
					// Handle non-successful HTTP status codes (e.g., 4xx, 5xx)
					throw new Error(`Request failed with status: ${response.status}`);
				}
				// Check the content type of the response
				const contentType = response.headers.get('content-type');
				if (contentType && contentType.includes('application/json')) {
					return response.json(); // Parse JSON if the content type is JSON
				} else {
					throw new Error('Response is not valid JSON'); // Handle non-JSON response
				}
			})
			.then((data) => {
				// Handle the parsed JSON data here
				console.log(data);
			})
			.catch((err) => {
				// Handle errors, including the JSON parsing error
				console.log(err);
			});

		setMenuQuotation((currentValue) => [...currentValue, formData]);

		toggleAddFoodHandler();
	}, [formData]);

	// edit menu quotation
	useEffect(() => {
		console.log('changed edit form data');
		setEditFormData({
			_id: itemEdit._id,
			foodItem: itemEdit.foodItem,
			cost: Number(itemEdit.cost),
		});
	}, [editedItem]);

	useEffect(() => {
		console.log(Object.keys(editFormData));
		if (Object.keys(editFormData).length !== 0) {
			console.log('formData changed');
			fetch(`http://192.168.137.1:3000/api/v1/clients/quotation/${client._id}`, {
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
				const updatedQuotation = menuQuotation.map((item) =>
					item._id === itemEdit._id
						? {
								_id: itemEdit._id,
								foodItem: itemEdit.foodItem,
								cost: itemEdit.cost,
						  }
						: item
				);
				setMenuQuotation(updatedQuotation);
			}
		}
	}, [editFormData]);

	// delete item from client's menu quotation
	const deleteItem = (item) => {
		console.log('delete:', item);
		fetch(`http://192.168.137.1:3000/api/v1/clients/quotation/${client._id}/${item._id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((data) => console.log('deleted successfully'))
			.catch((err) => console.error(err));

		const updatedMenuQuotation = menuQuotation.filter((menu) => menu._id !== item._id);
		setMenuQuotation(updatedMenuQuotation);
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

			{isEditFoodOpen && <EditerComponent itemEdit={itemEdit} itemEditPass={itemEditPass} setIsEditFoodOpen={setIsEditFoodOpen} />}

			{/* View menu */}
			<View className="place-items-center">
				<View className="flex-row bg-gray-300  mx-3 mb-2">
					<View>
						<Text className=" p-2 m-1 w-40  font-bold">Items</Text>
					</View>
					<View>
						<Text className="p-2 m-1 w-20 left-5 font-bold">Cost</Text>
					</View>
				</View>
				{menuQuotation.map((item) => (
					<EditFoodComponent item={item} setIsEditFoodOpen={setIsEditFoodOpen} editorPass={editorPass} deleteItem={deleteItem} />
				))}
			</View>

			<TouchableOpacity>
				<View className="w-20 justify-between p-1 rounded-md mt-10 ml-4">
					<Button title="ADD" onPress={toggleAddFoodHandler} />
				</View>
			</TouchableOpacity>
		</View>
	);
}
