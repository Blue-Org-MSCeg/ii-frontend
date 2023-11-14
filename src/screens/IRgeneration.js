import { View, Text, Button } from 'react-native';

import DropDown from '../components/DropDown';
import DateComponent from '../components/DateComponent';
import { useState } from 'react';

const IRgeneration = () => {
	return (
		<View className="flex-1">
			<DropDown />
			{/* <DateComponent isCalendarOpen={isCalendarOpen} setSelectedStartDate={setSelectedStartDate} handleOpenCalendar={handleOpenCalendar} setDate={getDate} />
			<DateComponent isCalendarOpen={isCalendarOpen} setSelectedStartDate={setSelectedStartDate} handleOpenCalendar={handleOpenCalendar} setDate={getDate} /> */}

			<View className="justify-between items-center mb-28">
				<View className="py-2 px-4 rounded">
					<Button title="Genrate Invoice" />
				</View>
				<View className="w-4" />
				<View className="py-2 px-4 rounded">
					<Button title="Genearte Report Sheet" />
				</View>
			</View>
		</View>
	);
};

export default IRgeneration;
