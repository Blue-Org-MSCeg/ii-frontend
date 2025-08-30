import { View, Text, Button, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import EditFoodComponent from '../components/EditFoodComponent';
import EditerComponent from '../components/EditerComponent';
import DropDown from '../components/DropDown';
import { CheckToken } from '../middleware/CheckToken';

export default function MenuQuotation({ navigation }) {
	// check if user is logged in
	const [isLoggedIn, setIsLoggedIn] = useState('first');

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			console.log('refreshed');
			checkInitialToken();
		});
		return unsubscribe;
	}, [navigation]);

	const checkInitialToken = async () => {
		const hasToken = await CheckToken();
		console.log(hasToken);
		setIsLoggedIn(hasToken);
	};

	useEffect(() => {
		if (!isLoggedIn && isLoggedIn !== 'first') {
			navigation.navigate('SignIn');
		}
	}, [isLoggedIn]); //user verification ends here

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
	const [isLoading, setIsLoading] = useState(true);

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
		setIsLoading(false);
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
		fetch(`${process.env.EXPO_PUBLIC_API_URL}/clients/quotation/${client._id}`, {
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
			fetch(`${process.env.EXPO_PUBLIC_API_URL}/clients/quotation/${client._id}`, {
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
		fetch(`${process.env.EXPO_PUBLIC_API_URL}/clients/quotation/${client._id}/${item._id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((data) => console.log('deleted successfully'))
			.catch((err) => console.log(err));

		const updatedMenuQuotation = menuQuotation.filter((menu) => menu._id !== item._id);
		setMenuQuotation(updatedMenuQuotation);
	};

	const loadMenuQuotation = () => {
		if (!client._id) {
			return <Text className="text-base mt-4 ml-2 border rounded-md border-[#65B741] bg-white w-11/12 p-2">🧧Please select a client</Text>;
		}

		if (isLoading) {
			return <ActivityIndicator size="large" color="#65B741" />;
		}

		return (
			<ScrollView className="h-72">
				{menuQuotation.map((item) => (
					<EditFoodComponent key={item._id} item={item} setIsEditFoodOpen={setIsEditFoodOpen} editorPass={editorPass} deleteItem={deleteItem} />
				))}
			</ScrollView>
		);
	};

	return isLoggedIn ? (
		<View className="w-full">
			<View className="mt-10 mb-8 p-5">
				<Text className="text-2xl ml-3 tracking-wider">Menu Quotation</Text>
			</View>

			{/* list clients */}
			<DropDown changeOrderList={changeOrderList} />

			{/* add food items for company */}
			{isAddFoodOpen && (
				<View className="align-middle justify-center content-centers flex border-b mb-5">
					<View className="flex-row flex-2 p-15">
						<View className="border bg-white border-green w-7/12 p-2 ml-10 ">
							<TextInput onChangeText={changeFood} maxLength={40} placeholder="food item" />
						</View>
						<View className="bg-white border border-green  p-2 mr-10 ml-6 ">
							<TextInput onChangeText={changeCost} className="" placeholder="cost" keyboardType="numeric" />
						</View>
					</View>
					<TouchableOpacity>
						<View className="flex-row justify-between p-5">
							<TouchableOpacity className="bg-green w-20 px-2 py-2 rounded-md my-3 ml-7" onPress={toggleAddFoodHandler}>
								<Text className="text-center text-white tracking-wider">cancel</Text>
							</TouchableOpacity>
							<TouchableOpacity className="bg-green w-20 px-2 py-2 rounded-md my-3 mr-7" onPress={addFood}>
								<Text className="text-center text-white tracking-wider">submit</Text>
							</TouchableOpacity>
						</View>
					</TouchableOpacity>
				</View>
			)}

			{isEditFoodOpen && <EditerComponent itemEdit={itemEdit} itemEditPass={itemEditPass} setIsEditFoodOpen={setIsEditFoodOpen} />}

			{/* View menu */}
			<View className="flex justify-center items-center">
				<View className="flex-row mx-3 mb-2 py-2 text-lg bg-white w-11/12 mt-9 border-b border-green">
					<View>
						<Text className="text-lg p-2 m-1 w-40 tracking-wider font-bold">Items</Text>
					</View>
					<View>
						<Text className="text-lg p-2 m-1 w-20 tracking-wider left-5 font-bold">Cost</Text>
					</View>
				</View>
				{/* <ScrollView className="h-72">
					{menuQuotation.map((item) => (
						<EditFoodComponent key={item._id} item={item} setIsEditFoodOpen={setIsEditFoodOpen} editorPass={editorPass} deleteItem={deleteItem} />
					))}
				</ScrollView> */}
				{loadMenuQuotation()}
			</View>

			<TouchableOpacity className="bg-green w-20 px-2 py-2 rounded-md my-3 ml-4" onPress={toggleAddFoodHandler}>
				<Text className="text-center text-white tracking-wider">ADD</Text>
			</TouchableOpacity>
		</View>
	) : (
		<View styles={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<ActivityIndicator size="large" color="#0000ff" />
		</View>
	);
}
