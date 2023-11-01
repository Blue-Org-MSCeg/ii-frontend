import { useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import getFormatedDate from 'react-native-modern-datepicker';

export default DateComponent = (props) => {
	const today = new Date();
	const startDate = getFormatedDate(today.setDate(today.getDate() + 1), 'YYYY/MM/DD');
	const [date, setDate] = useState('12/12/2023');
	
	const handleDateChange = (propDate) => {
		setDate(propDate);
	};
	return (
		<Modal animationType="slide" transparent={false} visible={props.isCalendarOpen}>
			<DatePicker mode="calendar" minimumDate={startDate} selected={date} onDateChange={handleDateChange} onSelectedChange={(date) => props.setSelectedStartDate(date)}></DatePicker>
			<View className="flex items-end mr-2">
				<TouchableOpacity onPress={props.handleOpenCalendar} className="bg-red-500 w-14 p-1 rounded-sm">
					<Text className="text-white text-base text-center">close</Text>
				</TouchableOpacity>
			</View>
		</Modal>
	);
};
