import React, { useState, useRef } from 'react';
import { View } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';

const PhoneComponent = ({ setphoneNumber }) => {
	return (
		<View className="flex-1 ml-9 h-24 justify-center align-middle">
			<PhoneInput
				defaultCode="IN"
				containerStyle
				onChangeText={(e) => {
					setphoneNumber(e);
					value = { e };
				}}
			/>
		</View>
	);
};

export default PhoneComponent;
