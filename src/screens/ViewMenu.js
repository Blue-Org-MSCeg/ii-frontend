import { View, Text, Button, TouchableOpacity, TextInput, Alert, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import EditFoodComponent from '../components/EditFoodComponent';
import EditerComponent from '../components/EditerComponent';
import { CheckToken } from '../middleware/CheckToken';

export default function ViewMenu({ navigation }) {
	// check if user is logged in
	const [isLoggedIn, setIsLoggedIn] = useState('first');

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			checkInitialToken();
		});
		return unsubscribe;
	}, [navigation]);

	const checkInitialToken = async () => {
		const hasToken = await CheckToken();
		setIsLoggedIn(hasToken);
	};

	useEffect(() => {
		if (!isLoggedIn && isLoggedIn !== 'first') {
			navigation.navigate('SignIn');
		}
	}, [isLoggedIn]); //user verification ends here

	const [menuItem, setMenuItem] = useState([]);
	const [cost, setCost] = useState('');
	const [food, setFood] = useState('');
	const [formData, setFormData] = useState(null);
	const [editFormData, setEditFormData] = useState({});
	const [itemEdit, setItemEdit] = useState({});
	const [editedItem, setEditedItem] = useState({});
	const [isAddFoodOpen, setIsAddFoodOpen] = useState(false);
	const [isEditFoodOpen, setIsEditFoodOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	// fetching menu from database
	useEffect(() => {
		fetch(`${process.env.EXPO_PUBLIC_API_URL}/menus/`)
			.then((response) => response.json())
			.then((res) => {
				setMenuItem(res.data.menu);
				setIsLoading(false);
			})
			.catch((err) => Alert.alert('Failure', err.message, [{ text: 'OK' }]));
	}, [formData]);

	const editorPass = (item) => {
		setItemEdit(item);
	};

	const itemEditPass = (itemEdit) => {
		setEditedItem(itemEdit);
	};

	const changeFood = (foodName) => {
		setFood(foodName);
	};

	const changeCost = (cost) => {
		setCost(cost);
	};

	const toggleAddFoodHandler = () => {
		setIsAddFoodOpen(!isAddFoodOpen);
	};

	const addFood = () => {
		if (food == '') {
			Alert.alert('Validation Error', 'No Food item added', [{ text: 'OK' }]);
		} else if (cost == '') {
			Alert.alert('Validation Error', 'Enter food cost', [{ text: 'OK' }]);
		}
		setFormData({
			foodItem: food,
			cost: cost,
		});
	};

	// posting the food to the db when submit button is pressed
	useEffect(() => {
		console.log('form data', formData);
		if (formData) {
			fetch(`${process.env.EXPO_PUBLIC_API_URL}/menus/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			})
				.then((response) => response.json())
				.then((data) => {
					setMenuItem((current) => [...current, data.data.food]);
				})
				.catch((err) => Alert.alert('Failure', err.message, [{ text: 'OK' }]));

			toggleAddFoodHandler();
		}
	}, [formData]);

	useEffect(() => {
		console.log(itemEdit);
		if (itemEdit) {
			const updatedItem = menuItem.map((item) =>
				item._id === itemEdit._id
					? {
							_id: itemEdit._id,
							foodItem: itemEdit.foodItem,
							cost: itemEdit.cost,
					  }
					: item
			);
			setMenuItem(updatedItem);
		}
	}, [itemEdit]);

	// edit menu cost
	useEffect(() => {
		setEditFormData({
			_id: itemEdit._id,
			foodItem: itemEdit.foodItem,
			cost: Number(itemEdit.cost),
		});
	}, [editedItem]);

	useEffect(() => {
		console.log(Object.keys(editFormData));
		if (Object.keys(editFormData).length !== 0) {
			fetch(`${process.env.EXPO_PUBLIC_API_URL}/menus/${editFormData._id}`, {
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
				const updatedItem = menuItem.map((item) =>
					item._id === itemEdit._id
						? {
								_id: itemEdit._id,
								foodItem: itemEdit.foodItem,
								cost: itemEdit.cost,
						  }
						: item
				);
				setMenuItem(updatedItem);
			}
		}
	}, [editFormData]);

	// remove food from menu
	const deleteMenuItem = (item) => {
		fetch(`${process.env.EXPO_PUBLIC_API_URL}/menus/${item._id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((data) => Alert.alert('Success', 'Food item deleted successfully', [{ text: 'OK' }]))
			.catch((err) => Alert.alert('Failure', err.message, [{ text: 'OK' }]));

		const updatedMenu = menuItem.filter((menu) => menu._id !== item._id);
		setMenuItem(updatedMenu);
	};

	const loadMenu = () => {
		if (isLoading) {
			return <ActivityIndicator className="mt-7" size="large" color="#65B741" />;
		}

		if (menuItem.length === 0) {
			return <Text className="text-base mt-4 bg-white w-11/12 p-2">🧧No menu found. Click on add menu</Text>;
		}

		return (
			<ScrollView className="h-72">
				{menuItem.map((item) => (
					<EditFoodComponent key={item._id} item={item} setIsEditFoodOpen={setIsEditFoodOpen} setMenuItem={menuItem} editorPass={editorPass} deleteItem={deleteMenuItem} />
				))}
			</ScrollView>
		);
	};

	return isLoggedIn ? (
		<View className="w-full">
			<View className="mt-10 mb-8 p-5 border-solid content-center border-1 justify-center bg-blue-400 ">
				<Text className="mt-8 text-2xl tracking-wider">View Menu</Text>
			</View>

			{/* add food items for company */}
			{isAddFoodOpen && (
				<View className="align-middle justify-center content-centers flex border-b mb-5">
					<View className="flex-row flex-2 p-15">
						<View className=" bg-gray-300 rounded w-7/12 p-2 ml-10 ">
							<TextInput onChangeText={changeFood} maxLength={40} placeholder="food item" />
						</View>
						<View className="bg-gray-300 rounded p-2 mr-10 ml-6 ">
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
			<View className="place-items-center mx-2 ">
				<View className="flex-row bg-gray-300  mx-3 mb-2">
					<View>
						<Text className=" p-2 m-1 w-40 text-lg font-bold">Items</Text>
					</View>
					<View>
						<Text className="p-2 m-1 w-20 left-5 text-lg font-bold">Cost</Text>
					</View>
				</View>
				{menuItem && loadMenu()}
			</View>
			<TouchableOpacity>
				<View className="w-20 justify-between p-1 rounded-md mt-10 ml-5">
					<Button title="ADD" onPress={toggleAddFoodHandler} />
				</View>
			</TouchableOpacity>
		</View>
	) : (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<ActivityIndicator size="large" color="#0000ff" />
		</View>
	);
}
