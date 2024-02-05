import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import KeyboardAvoidWrapper from '../components/KeyboardAvoidingWrapper';
import { useState } from 'react';
const signUpBgNew = require('./../../assets/signupNew.png');
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignIn({ navigation }) {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const login = () => {
		fetch(`${process.env.EXPO_PUBLIC_API_URL}/user/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		})
			.then((response) => response.json())
			.then(async (data) => {
				setFormData({
					email: '',
					password: '',
				});
				await AsyncStorage.setItem('token', data.token);
				// console.log('sign in ', data.token);
				navigation.navigate('Home');
			})
			.catch((err) => {
				Alert.alert('Error', 'Unable to login', [{ text: 'ok' }]);
			});
	};

	return (
		<KeyboardAvoidWrapper>
			<View className="h-screen">
				<Image source={signUpBgNew} className="w-screen h-[45%] z-0" />
				<View className="bg-white h-[65%] rounded-t-[65px] shadow-2xl shadow-slate-800 w-screen z-10 absolute top-[40%]">
					<Text className="text-3xl text-center mt-4 font-semibold tracking-wider">Sign in</Text>

					<View className="mx-16 mt-10">
						<View className="gap-y-3">
							<Text className="text-lg font-light">Email address :</Text>
							<TextInput className="border border-[#6DAB4A] rounded-3xl h-11 px-4 font-light" onChangeText={(e) => setFormData({ ...formData, email: e })} />
							<Text className="text-lg font-light">Password :</Text>
							<TextInput secureTextEntry className="border border-[#6DAB4A] rounded-3xl h-11 px-4 font-light" onChangeText={(e) => setFormData({ ...formData, password: e })} />
						</View>
					</View>
					<View className="flex items-center mt-10">
						<TouchableOpacity className="bg-[#6DAB4A] w-20 p-2 rounded-lg" onPress={login}>
							<Text className="text-center text-white">Submit</Text>
						</TouchableOpacity>

						<View className="flex flex-row mt-5">
							<Text className="text-lg font-light">Don't have an account? </Text>
							<Text className="text-lg font-light text-[#6DAB4A] underline underline-offset-2" onPress={() => navigation.navigate('Register')}>
								signup
							</Text>
						</View>

						<Text className="text-lg font-light text-[#6DAB4A] underline underline-offset-4" onPress={() => navigation.navigate('Register')}>
							Forgot Password?
						</Text>
					</View>
				</View>
			</View>
		</KeyboardAvoidWrapper>
	);
}
