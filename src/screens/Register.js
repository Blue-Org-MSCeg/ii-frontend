import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import KeyboardAvoidWrapper from '../components/KeyboardAvoidingWrapper';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const signUpBgNew = require('./../../assets/signupNew.png');

export default function Register({ navigation }) {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		passwordConfirm: '',
	});

	const register = () => {
		fetch(`${process.env.EXPO_PUBLIC_API_URL}/user/signUp`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		})
			.then((response) => response.json())
			.then(async (data) => {
				setFormData({
					name: '',
					email: '',
					password: '',
					passwordConfirm: '',
				});
				await AsyncStorage.setItem('token', data.token);
				navigation.navigate('SignIn');
			})
			.catch((err) => {
				Alert.alert('Error', err, [{ text: 'ok' }]);
			});
	};

	return (
		<KeyboardAvoidWrapper>
			<View className="h-screen">
				<Image source={signUpBgNew} className="w-screen h-[35%] z-0" />
				<View className="bg-white h-[85%] rounded-t-[65px] shadow-2xl shadow-slate-800 w-screen z-10 absolute top-[25%]">
					<Text className="text-3xl text-center mt-4 font-semibold tracking-wider">Sign up</Text>

					<View className="mx-16 mt-10">
						<View className="gap-y-3">
							<Text className="text-lg font-light">Name :</Text>
							<TextInput className="border border-[#6DAB4A] rounded-3xl h-11 px-4 font-light" onChangeText={(e) => setFormData({ ...formData, name: e })} />
							<Text className="text-lg font-light">Email address :</Text>
							<TextInput className="border border-[#6DAB4A] rounded-3xl h-11 px-4 font-light" onChangeText={(e) => setFormData({ ...formData, email: e })} />
							<Text className="text-lg font-light">Password :</Text>
							<TextInput secureTextEntry className="border border-[#6DAB4A] rounded-3xl h-11 px-4 font-light" onChangeText={(e) => setFormData({ ...formData, password: e })} />
							<Text className="text-lg font-light">Confirm Password :</Text>
							<TextInput secureTextEntry className="border border-[#6DAB4A] rounded-3xl h-11 px-4 font-light" onChangeText={(e) => setFormData({ ...formData, passwordConfirm: e })} />
						</View>
					</View>
					<View className="flex items-center mt-10">
						<TouchableOpacity className="bg-[#6DAB4A] w-20 p-2 rounded-lg" onPress={register}>
							<Text className="text-center text-white">Submit</Text>
						</TouchableOpacity>

						<View className="flex flex-row mt-5">
							<Text className="text-lg font-light">Have an account? </Text>
							<Text className="text-lg font-light text-[#6DAB4A] underline underline-offset-2" onPress={() => navigation.navigate('SignIn')}>
								sign in
							</Text>
						</View>
					</View>
				</View>
			</View>
		</KeyboardAvoidWrapper>
	);
}
