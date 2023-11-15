import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import DropDown from '../components/DropDown';
import Head from '../components/Head';
import DateComponent from '../components/DateComponent';
import EditRemove from '../components/EditRemove';
import MenuComponent from '../components/MenuComponent'; // Make sure to import MenuComponent

export default function EditOrder() {
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	let [date, setDate] = useState('');
	const [client, setClient] = useState({});
	const [orderId, setOrderId] = useState('');
	const [selectedStartDate, setSelectedStartDate] = useState('');
	const [order, setOrder] = useState([]);

	const handleOpenCalendar = () => {
		setIsCalendarOpen(!isCalendarOpen);
	};

	useEffect(() => {
		if (date !== '') {
			fetch(`http://192.168.137.1:3000/api/v1/orders/${client.businessName}/${date}`, {
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
					// console.log(data.data.orders[0]._id);
					setOrder(data.data.orders[0].orders);
					setOrderId(data.data.orders[0]._id);
				})
				.catch((err) => {
					// Handle errors, including the JSON parsing error
					console.log(err);
				});
		}
	}, [date]);

	const updateOrder = (updatedOrder) => {
		fetch(`http://192.168.137.1:3000/api/v1/orders/order/${orderId}`, {
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
		fetch(`http://192.168.137.1:3000/api/v1/orders/order/remove/${orderId}`, {
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

	// getting the menu quotation respective to the client
	const changeOrderList = (client) => {
		setClient(client);
	};

	const getDate = (date) => {
		const newDate = new Date(date.replaceAll('/', '-'));
		setDate(newDate);
		// console.log(newDate);
	};
	return (
		<View className="flex-1 bg-white-500">
			{/* <Head /> */}
			<View className="mt-10 mb-8 p-5 border-solid content-center border-1 justify-center bg-blue-400 ">
				<Text className="text-center">Edit Orders</Text>
			</View>
			<View className="">
				<DropDown changeOrderList={changeOrderList} />
			</View>
			<View className="ml-8 mt-20">
				<Text className="text-base">Select Date</Text>
				<TouchableOpacity className="border w-4/5 p-3 mt-2" onPress={handleOpenCalendar}>
					<Text>{selectedStartDate}</Text>
				</TouchableOpacity>

				<DateComponent isCalendarOpen={isCalendarOpen} setSelectedStartDate={setSelectedStartDate} handleOpenCalendar={handleOpenCalendar} setDate={getDate} />
				<View>
					<View className="flex flex-row justify-between py-2 px-10 bg-zinc-300 w-11/12 mt-9 border-b">
						<Text className="text-lg">Item</Text>
						<Text className="text-lg">Quantity</Text>
					</View>
					{order.map((menuItem, index) => (
						<EditRemove key={index} item={menuItem} updateOrder={updateOrder} deleteOrder={deleteOrder} />
					))}
				</View>
				{/* <TouchableOpacity className="bg-blue-400 w-20 p-2 rounded-md mt-3">
          <Text className="text-center text-white">submit</Text>
        </TouchableOpacity> */}
			</View>
		</View>
	);
}
