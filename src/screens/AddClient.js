import { View, Text, ScrollView, Button, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';

import PhoneComponent from '../components/PhoneComponent';
import Head from '../components/Head';

export default function AddClient({ navigation }) {
	let [businessName, setBusinessName] = useState('');
	let [gstNumber, setgstNumber] = useState();
	let [phoneNumber, setphoneNumber] = useState();
	let [email, setEmail] = useState('');
	let [poa, setPoa] = useState();
	let [address, setAddress] = useState('');
	const [gstInputClass, setGstInputClass] = useState('border-2 bg-white-400 rounded-md border-gray-400 w-64 p-2 ml-10');
	const [emailInputClass, setEmailInputClass] = useState('border-2 bg-white-400 rounded-md border-gray-400 w-64 p-2 ml-10');

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
				.then((response) => {
					if (!response.ok) {
						console.log(response.json());
						throw new Error(`Http error! Status: ${response.status}`);
					}
					return response.json(); // Parse JSON if the content type is JSON
				})
				.then((data) => {
					// Handle the parsed JSON data here
					console.log(data);
					Alert.alert('Success', 'Client successfully added', [{ text: 'OK' }]);
					navigation.navigate('Home');
				})
				.catch((err) => {
					// Handle errors, including the JSON parsing error
					Alert.alert('Error', 'Unable to add client', [{ text: 'OK' }]);
					console.log(err.message);
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

	return (
		<ScrollView automaticallyAdjustKeyboardInsets>
			<Head />
			<View className="p-15 mt-14 space-y-4">
				<Text className="ml-10 text-gray-700">Business name : </Text>

				<TextInput
					className="border-2 rounded-md bg-white-400  border-gray-400 w-64 p-2 ml-10 "
					maxLength={100}
					placeholder="John Pvt Lmt"
					value={businessName}
					onChangeText={(e) => {
						setBusinessName(e);
					}}
				/>

				<Text className="ml-10">GST number : </Text>

				<TextInput
					className={gstInputClass}
					maxLength={15} //Limit !!
					keyboardType="numeric"
					value={gstNumber}
					onChangeText={(gst) => validateGst(gst)}
				/>
				<Text className="ml-10">Business phone number : </Text>

				<PhoneComponent setphoneNumber={setphoneNumber} />

				<Text className="ml-10">Business email : </Text>
				<TextInput className={emailInputClass} keyboardType="email-address" maxLength={100} value={email} onChangeText={(email) => validateEmail(email)} />

				<Text className="ml-10">Period of agreement : </Text>
				<TextInput className="border-2 bg-white-400 rounded-md border-gray-400 w-64 p-2 ml-10" keyboardType="numeric" maxLength={2} value={poa} onChangeText={setPoa} />
				<Text className="ml-10">address : </Text>
				<TextInput className="border-2 mt-0 h-24 p-0 pt-0 bg-white-400 rounded-md border-gray-400 w-64 ml-10" multiline={true} value={address} onChangeText={setAddress} />

				<View className="flex items-center mb-9">
					<Button title="Submit" onPress={addClient} />
				</View>
			</View>
		</ScrollView>
	);
}
