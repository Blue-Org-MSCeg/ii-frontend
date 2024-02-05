import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import DropDown from '../components/DropDown';
import DateComponent from '../components/DateComponent';
import EditRemove from '../components/EditRemove';
import { CheckToken } from '../middleware/CheckToken';

export default function EditOrder({ navigation }) {
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
	}, [isLoggedIn]);
	//user verification ends here

	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	let [date, setDate] = useState('');
	const [client, setClient] = useState({});
	const [orderId, setOrderId] = useState('');
	const [order, setOrder] = useState([]);

	const handleOpenCalendar = () => {
		setIsCalendarOpen(!isCalendarOpen);
	};

	// fetch order details from database
	useEffect(() => {
		if (date !== '') {
			console.log(`${process.env.EXPO_PUBLIC_API_URL}/orders/${client.businessName}/${date}`);
			fetch(`${process.env.EXPO_PUBLIC_API_URL}/orders/${client.businessName}/${date}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			})
				.then((response) => {
					return response.json(); // Parse JSON if the content type is JSON
				})
				.then((data) => {
					// console.log(date);
					console.log(data.data);
					setOrder(data.data.orders[0].orders);
					setOrderId(data.data.orders[0]._id);
				})
				.catch((err) => {
					// Handle errors, including the JSON parsing error
					console.log(err);
					setOrder([]);
				});
		}
	}, [date]);

	const updateOrder = (updatedOrder) => {
		fetch(`${process.env.EXPO_PUBLIC_API_URL}/orders/order/${orderId}`, {
			method: 'PATCH',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(updatedOrder),
		})
			.then((response) => response.json())
			.then((data) => console.log(data))
			.catch((err) => console.log(err));

		const newOrder = order.map((item) => {
			if (item._id === updatedOrder._id) {
				return { _id: item._id, foodItem: item.foodItem, numberOfHeads: updatedOrder.numberOfHeads };
			} else {
				return item;
			}
		});
		setOrder(newOrder);
	};

	const deleteOrder = (orderToBeDeleted) => {
		fetch(`${process.env.EXPO_PUBLIC_API_URL}/orders/order/remove/${orderId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(orderToBeDeleted),
		})
			.then((response) => response.json())
			.then((data) => console.log(data))
			.catch((err) => console.log(err));

		const updatedOrder = order.filter((item) => item._id !== orderToBeDeleted._id);
		setOrder(updatedOrder);
	};

	// getting the client
	const changeOrderList = (client) => {
		setClient(client);
	};

	const getDate = (date) => {
		const inputDate = new Date(date);

		const day = inputDate.getUTCDate();
		const month = inputDate.getUTCMonth() + 1; // Months are zero-indexed
		const year = inputDate.getUTCFullYear();

		const formattedDate = `${year}-${month}-${day}`;

		setDate(formattedDate);
	};

	const loadOrder = () => {
		if (client && date && order.length === 0) {
			return <Text className="text-base mt-4 bg-white w-11/12 p-2">🧧No orders found</Text>;
		}

		return (
			<ScrollView className="h-72">
				{order.map((menuItem, index) => (
					<EditRemove key={index} item={menuItem} updateOrder={updateOrder} deleteOrder={deleteOrder} />
				))}
			</ScrollView>
		);
	};

	return isLoggedIn ? (
		<View className="flex-1 bg-white-500">
			<View className="mt-16 p-5">
				<Text className="text-2xl ml-5 tracking-wider">Edit Orders</Text>
			</View>
			<View className="">
				<DropDown changeOrderList={changeOrderList} />
			</View>
			<View className="ml-8">
				<Text className="text-base font-light">Select Date</Text>
				<TouchableOpacity className="border border-green w-11/12 p-3 mt-3" onPress={handleOpenCalendar}>
					<Text>{date}</Text>
				</TouchableOpacity>

				<DateComponent isCalendarOpen={isCalendarOpen} handleOpenCalendar={handleOpenCalendar} setDate={getDate} />
				<View>
					<View className="flex flex-row justify-between py-2 px-10 bg-white w-11/12 mt-9 border-b border-green">
						<Text className="text-lg">Item</Text>
						<Text className="text-lg">Quantity</Text>
					</View>
					{loadOrder()}
				</View>
			</View>
		</View>
	) : (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<ActivityIndicator size="large" color="#" />
		</View>
	);
}
