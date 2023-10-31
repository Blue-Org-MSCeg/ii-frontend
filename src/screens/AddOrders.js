import { Text, TouchableOpacity, View } from 'react-native';
import Head from './../components/Head';
import { useEffect, useState } from 'react';
import DateComponent from '../components/DateComponent';
import MenuComponent from './../components/MenuComponent';
import DropDown from '../components/DropDown';

export default AddOrders = () => {
	// setting the form data
	const [formData, setFormData] = useState([]);

	// setting client name
	const [businessName, setBusinessName] = useState('');

	// handling calendar open and close
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	const handleOpenCalendar = () => {
		setIsCalendarOpen(!isCalendarOpen);
	};

	const [selectedStartDate, setSelectedStartDate] = useState('');

	// getting the menu quotation respective to the client
	let [menuQuotation, setMenuQuotation] = useState([]);
	const changeOrderList = (client) => {
		setMenuQuotation(client.menuQuotation);
		setBusinessName(client.businessName);
	};

	const [order, setOrder] = useState([]);
	// handle input change
	const handleInputChange = (noOfHeads, id) => {
		const updatedOrder = menuQuotation.map((item) => {
			if (item._id === id) {
				return { ...item, numberOfHeads: noOfHeads };
			}
			return item;
		});
		console.log(menuQuotation);
		menuQuotation = updatedOrder;
		setOrder(menuQuotation);
	};

	// handle submit
	// const handleSubmit = () => {
	// order.forEach((ord) => {
	// 	if (!ord.numberOfHeads) {
	// 		const index = order.indexOf(ord);
	// 		order.splice(index, 1);
	// 	}
	// });

	// formatedOrder = order.map((ord) => {
	// 	if (ord.numberOfHeads) {
	// 		return {
	// 			foodItem: ord.foodItem,
	// 			numberOfHeads: ord.numberOfHeads,
	// 		};
	// 	} else return;
	// });
	const handleSubmit = () => {
		useEffect(() => {
			if (order.length > 0) {
				const formattedOrder = order
					.filter((ord) => ord.numberOfHeads) // Remove items without numberOfHeads
					.map((ord) => ({
						foodItem: ord.foodItem,
						numberOfHeads: ord.numberOfHeads,
					}));

				setFormData({
					businessName: businessName,
					orders: formattedOrder,
				});
				console.log(formData);
			}
		}, [order]);
	};

	return (
		<View>
			<Head />
			<Text className="text-lg text-center">Add Orders</Text>
			<View>
				<DropDown changeOrderList={changeOrderList} />
				<View className="ml-8">
					<Text className="text-base">Select Date</Text>
					<TouchableOpacity className="border w-4/5 p-3 mt-2" onPress={handleOpenCalendar}>
						<Text>{selectedStartDate}</Text>
					</TouchableOpacity>

					<DateComponent isCalendarOpen={isCalendarOpen} setSelectedStartDate={setSelectedStartDate} handleOpenCalendar={handleOpenCalendar} />
					<View>
						<View className="flex flex-row justify-between py-2 px-10 bg-zinc-300 w-11/12 mt-9 border-b">
							<Text className="text-lg">Item</Text>
							<Text className="text-lg">Quantity</Text>
						</View>
						{menuQuotation.map((menuItem) => (
							<MenuComponent menuItem={menuItem} handleInputChange={handleInputChange} />
						))}
					</View>
					<TouchableOpacity className="bg-blue-400 w-20 p-2 rounded-md mt-3" onPress={handleSubmit}>
						<Text className="text-center text-white">submit</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};
