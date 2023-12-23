import { View, Button, Text, TouchableOpacity, Alert } from 'react-native';
import { API_URL } from '@env';

import DropDown from '../components/DropDown';
import { shareAsync } from 'expo-sharing';
import { printToFileAsync } from 'expo-print';
import { useEffect, useState } from 'react';
import DateComponent from '../components/DateComponent';
import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';

const data = {
	bankname: 'UNION BANK OF INDIA',
	accountno: 'ACCOUNT NO :101410025041428',
	ifsc: 'IFSC CODE NO : UBIN-0810142',
	gst: 'GST NO : 37AQFPD2298CIZI ',
	hssonno: 'HSSON NO :996337',
};

const IRgeneration = () => {
	const [client, setClient] = useState({ address: '', items: [] });
	const [invoice, setInvoice] = useState([]);
	let totalAmount = 0;

	// invoice template
	const htmlContent = `
      <html>
        <head>
          <meta charset="utf-8">
          <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
        </head>
        <body>
          <header>
            <br><br><br><br><br><br><br><br><br>
            <div class="flex flex-col space-x-4">
              <!-- Right-aligned Flex Item -->
              <div class="flex-1 text-right">
                <pre>
                  DATE : ${new Date().toLocaleDateString().split(' ')[0].padEnd(24)}
                  ${data.bankname.padEnd(30)} 
                  ${data.accountno.padEnd(31)}
                  ${data.ifsc.padEnd(30)} 
                  ${data.gst.padEnd(30)} 
                  ${data.hssonno.padEnd(31)}
                </pre>
              </div>
              <div class="flex-1 p-4 text-center">
                <h3>INVOICE</h3>
              </div>
              <!-- Left-aligned Flex Item -->
              <div class="flex-1 p-4">
                ${client.businessName}<br>
                ${client.address ? client.address.split(',').join('<br>') : ''}
              </div>
    
              <!-- Center-aligned Flex Item -->
              <div class="flex-1 p-4 text-center">
                <table class="w-full mt-4">
                  <thead>
                    <tr>
                      <th class="border">S.No</th>
                      <th class="border">Item</th>
                      <th class="border">Rate</th>
                      <th class="border">Quantity</th>
                      <th class="border">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${invoice
											.map((item, index) => {
												totalAmount += item.amount;
												return `<tr key=${item._id}>
                                  <td className="border">${index + 1}</td>
                                  <td className="border">${item._id}</td>
                                  <td className="border">${item.cost}</td>
                                  <td className="border">${item.quantity}</td>
                                  <td className="border">${item.amount}</td>
                                </tr>`;
											})
											.join(' ')}
                  </tbody>
                </table>
                <div className="mt-4">
								<strong>Total Amount:</strong> ${totalAmount}
								<br>
									<strong>GST@2.5:</strong> ${totalAmount * 0.025}
									<br>
									<strong>Grand Total:</strong> ${totalAmount * 0.025 + totalAmount}
                </div>
              </div>
               </tbody>
               </table>
               </div>
            </div>
        </body>
      </html>
    `;

	// handling calendar open and close
	const [isStartCalendarOpen, setIsStartCalendarOpen] = useState(false);
	const [isEndCalendarOpen, setIsEndCalendarOpen] = useState(false);

	const handleOpenCalendarStart = () => {
		setIsStartCalendarOpen(!isStartCalendarOpen);
	};

	const handleOpenCalendarEnd = () => {
		setIsEndCalendarOpen(!isEndCalendarOpen);
	};

	const [selectedStartDate, setSelectedStartDate] = useState('');
	const [selectedEndDate, setSelectedEndDate] = useState('');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');

	// getting and formatting date from DateComponent
	const getStartDate = (date) => {
		const newDate = new Date(date.replaceAll('/', '-'));
		setStartDate(newDate);
		console.log('start date:', newDate);
	};

	const getEndDate = (date) => {
		const newDate = new Date(date.replaceAll('/', '-'));
		console.log('end date:', newDate);
		setEndDate(newDate);
	};

	// get client details
	const changeOrderList = (client) => {
		setClient(client);
	};

	// get invoice details form db
	const generatePDF = async () => {
		fetch(`${API_URL}/orders/invoice/${client.businessName}/${startDate}/${endDate}`)
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
				setInvoice(data.data.invoice);
				console.log(data.data.invoice);
			})
			.catch((err) => console.log(err));
	};

	// print generated invoice to pdf and share
	const generateAndSharePDF = async () => {
		if (invoice.length !== 0) {
			const file = await printToFileAsync({
				html: htmlContent,
				base64: false,
			});
			await shareAsync(file.uri);
		} else if (client.businessName && invoice.length == 0) {
			Alert.alert('Validation Error', 'No orders found in these dates', [{ text: 'OK' }]);
		}
	};

	// call generateAndSharePdf whenever the invoice is changed
	useEffect(() => {
		generateAndSharePDF();
	}, [invoice]);

	/////////////////////////////////////////////////////////////////////////////////////////////////

	// excel

	const insertDataIntoExcel = async () => {
		// Sample data
		const data = [
			['Name', 'Age', 'City'],
			['John', 25, 'New York'],
			['Jane', 30, 'San Francisco'],
		];

		// Create a worksheet
		const ws = XLSX.utils.aoa_to_sheet(data);

		// Create a workbook
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

		// Generate a binary Excel file
		const base64 = XLSX.write(wb, { type: 'base64' });

		const fileName = FileSystem.documentDirectory + 'MyExcel.xlsx';
		FileSystem.writeAsStringAsync(fileName, base64, {
			encoding: FileSystem.EncodingType.Base64,
		}).then(() => {
			shareAsync(fileName);
		});
	};

	return (
		<View className="flex-1">
			<View className="mt-10 mb-8 p-5 border-solid content-center border-1 justify-center bg-blue-400 ">
				<Text className="text-center">Invoice Generation</Text>
			</View>
			<DropDown changeOrderList={changeOrderList} />
			<DateComponent isCalendarOpen={isStartCalendarOpen} setSelectedStartDate={setSelectedStartDate} handleOpenCalendar={handleOpenCalendarStart} setDate={getStartDate} />
			<DateComponent isCalendarOpen={isEndCalendarOpen} setSelectedStartDate={setSelectedEndDate} handleOpenCalendar={handleOpenCalendarEnd} setDate={getEndDate} />
			{/* date selections */}
			<View className="mb-36 ml-10">
				<Text className="">Start Date:</Text>
				<TouchableOpacity className="border w-4/5 p-3" onPress={handleOpenCalendarStart}>
					<Text>{selectedStartDate}</Text>
				</TouchableOpacity>

				<Text className="mt-4">End Date:</Text>
				<TouchableOpacity className="border w-4/5 p-3 mt-2" onPress={handleOpenCalendarEnd}>
					<Text>{selectedEndDate}</Text>
				</TouchableOpacity>
			</View>

			<View className="justify-between items-center mb-28">
				<View className="py-2 px-4 rounded">
					<Button title="Generate Invoice" onPress={generatePDF} />
				</View>
				<View className="w-4" />
				<View className="py-2 px-4 rounded">
					<Button title="Generate Report Sheet" onPress={insertDataIntoExcel} />
				</View>
			</View>
		</View>
	);
};

export default IRgeneration;
