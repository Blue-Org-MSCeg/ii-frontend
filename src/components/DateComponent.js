import { View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default DateComponent = (props) => {
	const handleConfirm = (date) => {
		props.setDate(date);
		props.handleOpenCalendar();
	};

	return (
		<View>
			<DateTimePickerModal isVisible={props.isCalendarOpen} mode="date" onConfirm={handleConfirm} onCancel={props.handleOpenCalendar} />
		</View>
	);
};
