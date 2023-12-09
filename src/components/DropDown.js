import { View } from 'react-native';
import React, { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { API_URL } from '@env';

const DropDown = (props) => {
	const [isOpen, setIsOpen] = useState(false);
	const [currentValue, setCurrentValue] = useState(null);
	const [clients, setClients] = useState([]);
	const [clientList, setClientList] = useState([]);

	useEffect(() => {
		fetch(`${API_URL}/clients/`)
			.then((response) => response.json())
			.then((res) => setClients(res.data.clients))
			.catch((err) => console.log(err));
	}, []);

	useEffect(() => {
		clients.forEach((client) => {
			setClientList((currentValue) => [
				...currentValue,
				{
					...client,
					label: client.businessName,
					value: client.businessName,
					key: client._id,
					// businessName: client.businessName,
					// id: client._id,
					// menuQuotation: client.menuQuotation,

					// cost: client.cost,
				},
			]);
		});
	}, [clients]);

	return (
		<View className="flex-1 p-10 mb-10">
			<DropDownPicker
				items={clientList}
				open={isOpen}
				setOpen={() => setIsOpen(!isOpen)}
				value={currentValue}
				setValue={(val) => {
					setCurrentValue(val);
				}}
				onSelectItem={(client) => props.changeOrderList(client)}
				autoScroll
				placeholder="Select Company"
				max-h-80
			/>
		</View>
	);
};

export default DropDown;
