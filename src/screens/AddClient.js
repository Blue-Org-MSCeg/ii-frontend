import { View, Text, ScrollView, Button, TextInput, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';

import PhoneComponent from '../components/PhoneComponent';
import Head from '../components/Head';
import { CheckToken } from '../middleware/CheckToken';

export default function AddClient({ navigation }) {
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

	let [businessName, setBusinessName] = useState('');
	let [gstNumber, setgstNumber] = useState();
	let [phoneNumber, setphoneNumber] = useState();
	let [email, setEmail] = useState('');
	let [poa, setPoa] = useState();
	let [address, setAddress] = useState('');
	const [gstInputClass, setGstInputClass] = useState('border rounded-full bg-white-400  border-[#6dab4a] w-full py-2 px-5');
	const [emailInputClass, setEmailInputClass] = useState('border rounded-full bg-white-400  border-[#6dab4a] w-full py-2 px-5');

	const addClient = () => {
		if (validateInputs()) {
			const formData = {
				businessName: businessName,
				GSTno: gstNumber,
				phoneNo: phoneNumber,
				emailAddress: email,
				agreementStartDate: Date.now(),
				agreementEndDate: Date.now(),
				address: address,
			};

			fetch(`${process.env.EXPO_PUBLIC_API_URL}/clients/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			})
				.then((response) => response.json())
				.then((data) => {
					console.log('then block');
					if (data && data.code === 11000) {
						Alert.alert('Error', 'Duplicate key error: The document with this key already exists.', [{ text: 'OK' }]); // Handle duplicate key error here
					} else {
						throw new Error('Server error');
					}

					// Handle the parsed JSON data here
					Alert.alert('Success', 'Client successfully added', [{ text: 'OK' }]);
					navigation.navigate('Home');
				})
				.catch((error) => {
					// Handle errors, including the JSON parsing error
					Alert.alert('Error', 'Unable to add client', [{ text: 'OK' }]);
				});
		}
	};

	const validateGst = (gst) => {
		if (gst.length < 5) {
			setGstInputClass('border-2 border-red-500 bg-white-400 rounded-md w-64 p-2 ml-10');
		} else {
			setGstInputClass('border-2 border-green-500 bg-white-400 rounded-md w-64 p-2 ml-10');
		}
		setgstNumber(gst);
	};

	const validateEmail = (email) => {
		if (!email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
			setEmailInputClass('border-2 bg-white-400 rounded-md border-red-400 w-64 p-2 ml-10');
		} else {
			setEmailInputClass('border-2 bg-white-400 rounded-md border-green-400 w-64 p-2 ml-10');
		}

		setEmail(email);
	};

	const validateInputs = () => {
		if (!businessName) {
			showAlert('Business name cannot be empty');
			return false;
		}

		if (!gstNumber) {
			showAlert('GST number must be at least 5 characters');
			return false;
		}

		if (!phoneNumber) {
			showAlert('phone number cannot be empty');
			return false;
		}

		if (!email) {
			showAlert('Email address cannot be empty');
			return false;
		}

		if (!poa) {
			showAlert('Email cannot be empty');
			return false;
		}

		if (!address) {
			showAlert('Address cannot be empty');
			return false;
		}

		if (address.length < 10) {
			showAlert('Address length should be greater than 9');
			return false;
		}

		return true;
	};

	const showAlert = (message) => {
		Alert.alert('Validation Error', message, [{ text: 'OK' }]);
	};

	return isLoggedIn ? (
		<ScrollView automaticallyAdjustKeyboardInsets>
			<Head />
			<View className="p-15 mt-14 space-y-4 mx-10">
				<Text className="text-gray-700 text-lg font-light">Business name : </Text>

				<TextInput
					className="border rounded-full bg-white-400  border-[#6dab4a] w-full py-2 px-5"
					maxLength={100}
					placeholder="John Pvt Lmt"
					value={businessName}
					onChangeText={(e) => {
						setBusinessName(e);
					}}
				/>

				<Text className="text-gray-700 text-lg font-light">GST number : </Text>

				<TextInput
					className={gstInputClass}
					maxLength={15} //Limit !!
					keyboardType="numeric"
					value={gstNumber}
					onChangeText={(gst) => validateGst(gst)}
				/>
				<Text className="text-gray-700 text-lg font-light">Business phone number : </Text>

				{/* <PhoneComponent setphoneNumber={setphoneNumber} /> */}
				<TextInput className="border rounded-full bg-white-400  border-[#6dab4a] w-full py-2 px-5" keyboardType="numeric" maxLength={10} setphoneNumber={setphoneNumber} />

				<Text className="text-gray-700 text-lg font-light">Business email : </Text>
				<TextInput className={emailInputClass} keyboardType="email-address" maxLength={100} value={email} onChangeText={(email) => validateEmail(email)} />

				<Text className="text-gray-700 text-lg font-light">Period of agreement : </Text>
				<TextInput className="border rounded-full bg-white-400  border-[#6dab4a] w-full py-2 px-5" keyboardType="numeric" maxLength={2} value={poa} onChangeText={setPoa} />
				<Text className="text-gray-700 text-lg font-light">Address : </Text>
				<TextInput className="h-24 border rounded-xl bg-white-400  border-[#6dab4a] w-full py-2 px-5" multiline={true} value={address} onChangeText={setAddress} />

				<View className="flex items-center mb-9">
					<Button title="Submit" onPress={addClient} />
				</View>
			</View>
		</ScrollView>
	) : (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<ActivityIndicator size="large" color="#0000ff" />
		</View>
	);
}
