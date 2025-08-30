// utils/auth.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CheckToken = async () => {
	try {
		const token = await AsyncStorage.getItem('token');
		// console.log(token);
		return token !== null;
	} catch (error) {
		console.error('Error checking token:', error);
		return false;
	}
};
