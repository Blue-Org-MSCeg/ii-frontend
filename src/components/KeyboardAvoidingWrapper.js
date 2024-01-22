import { Keyboard, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback } from 'react-native';

export default function KeyboardAvoidWrapper({ children }) {
	return (
		<KeyboardAvoidingView className="flex">
			<ScrollView>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>{children}</TouchableWithoutFeedback>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
