import { ScrollView, Text, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import Head from './../components/Head';
import { useEffect, useState } from 'react';
import DateComponent from '../components/DateComponent';
import MenuComponent from './../components/MenuComponent';
import DropDown from '../components/DropDown';
import { CheckToken } from '../middleware/CheckToken';

export default AddOrders = ({ navigation }) => {
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

	// setting the form data
	const [formData, setFormData] = useState({ orders: [] });

	// setting client name
	const [businessName, setBusinessName] = useState('');

	// handling calendar open and close
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	const handleOpenCalendar = () => {
		setIsCalendarOpen(!isCalendarOpen);
	};

	const [date, setDate] = useState('');
	// getting and formatting date from DateComponent
	const getDate = (date) => {
		const inputDate = new Date(date);

		const day = inputDate.getUTCDate();
		const month = inputDate.getUTCMonth() + 1; // Months are zero-indexed
		const year = inputDate.getUTCFullYear();

		const formattedDate = `${year}-${month}-${day}`;

		console.log('formated date: ', formattedDate);
		setDate(formattedDate);
	};

	// getting the menu quotation respective to the client
	let [menuQuotation, setMenuQuotation] = useState([]);
	const changeOrderList = (client) => {
		setMenuQuotation(client.menuQuotation);
		setBusinessName(client.businessName);
	};

	let [order, setOrder] = useState([]);
	// handle input change
	const handleInputChange = (noOfHeads, id) => {
		const updatedOrder = menuQuotation.map((item) => {
			if (item._id === id) {
				return { ...item, numberOfHeads: noOfHeads };
			}
			return item;
		});
		setMenuQuotation(updatedOrder);
	};

	useEffect(() => {
		setOrder(menuQuotation);
	}, [menuQuotation]);

	const [formattedOrder, setFormattedData] = useState([]);
	// post data to backend
	const handleSubmit = () => {
		if (order.length > 0) {
			order = order
				.filter((ord) => ord.numberOfHeads) // Remove items without numberOfHeads
				.map((ord) => ({
					foodItem: ord.foodItem,
					numberOfHeads: ord.numberOfHeads,
				}));
		}
		setFormattedData(order);
	};

	useEffect(() => {
		if (formattedOrder.length == 0 && businessName) {
			Alert.alert('Validation Error', 'No order added', [{ text: 'OK' }]);
		}
		setFormData({
			businessName: businessName,
			orderDate: date,
			orders: formattedOrder,
		});
	}, [formattedOrder]);

	useEffect(() => {
		console.log(formData);
		if (formData.orders.length !== 0) {
			fetch(`${process.env.EXPO_PUBLIC_API_URL}/orders/`, {
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				body: JSON.stringify(formData),
			})
				.then((response) => response.json())
				.then((data) => console.log(data))
				.catch((err) => console.log(err));

			Alert.alert('Success', 'Order added successfully', [{ text: 'OK' }]);
			navigation.navigate('Home');
		}
	}, [formData]);

	return isLoggedIn ? (
		<View className="mt-16">
			<Text className="text-2xl font-base tracking-widest ml-10">Add Orders</Text>
			<View>
				<DropDown changeOrderList={changeOrderList} />
				<View className="ml-10">
					<Text className="text-base">Select Date</Text>
					<TouchableOpacity className="border border-green w-11/12 p-3 mt-2" onPress={handleOpenCalendar}>
						<Text>{date}</Text>
					</TouchableOpacity>

					<DateComponent isCalendarOpen={isCalendarOpen} handleOpenCalendar={handleOpenCalendar} setDate={getDate} />
					<View>
						<View className="flex flex-row justify-between py-2 px-10 bg-white w-11/12 mt-9 border-b border-green">
							<Text className="text-lg">Item</Text>
							<Text className="text-lg">Quantity</Text>
						</View>
						<ScrollView className="h-72">
							{menuQuotation.map((menuItem) => (
								<MenuComponent menuItem={menuItem} handleInputChange={handleInputChange} key={menuItem._id} />
							))}
						</ScrollView>
					</View>
					<TouchableOpacity className="bg-green w-20 px-2 py-2 rounded-md my-3 ml-2" onPress={handleSubmit}>
						<Text className="text-center text-white tracking-wider">submit</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	) : (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<ActivityIndicator size="large" color="##6dab4a" />
		</View>
	);
};
