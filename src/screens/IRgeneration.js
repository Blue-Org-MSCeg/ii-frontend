import { View, Button, Text, TouchableOpacity, Alert } from 'react-native';

import DropDown from '../components/DropDown';
import { shareAsync } from 'expo-sharing';
import { printToFileAsync } from 'expo-print';
import { useEffect, useState } from 'react';
import DateComponent from '../components/DateComponent';
import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import { NewLineKind } from 'typescript';

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
	let monthOfInvoice;

	let totalAmount = 0;
	const [invoiceNumber, setInvoiceNumber] = useState();

	const numberToWords = (num) => {
		const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
		const teens = ['', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
		const tens = ['', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

		const convertBelow1000 = (num) => {
			if (num === 0) {
				return '';
			} else if (num < 10) {
				return units[num];
			} else if (num < 20) {
				return teens[num - 10];
			} else if (num < 100) {
				return tens[Math.floor(num / 10)] + ' ' + convertBelow1000(num % 10);
			} else {
				return units[Math.floor(num / 100)] + ' Hundred ' + convertBelow1000(num % 100);
			}
		};

		const convert = (num) => {
			if (num === 0) {
				return 'Zero';
			} else {
				return convertBelow1000(num);
			}
		};

		// Get only the integer part
		const integerPart = Math.floor(num);

		if (integerPart >= 1000) {
			const thousands = Math.floor(integerPart / 1000);
			const remainder = integerPart % 1000;
			return convert(thousands) + ' Thousand ' + convertBelow1000(remainder);
		} else {
			return convert(integerPart);
		}
	};

	const getDIN = () => {
		const formattedInvoiceNumber = invoiceNumber.toString().padStart(2, '0');
		return `DIN/INV/${formattedInvoiceNumber}`;
	};

	useEffect(() => {
		fetch(`${process.env.EXPO_PUBLIC_API_URL}/invoiceCounter/`)
			.then((response) => response.json())
			.then((data) => {
				setInvoiceNumber(data.invoiceNumber);
			})
			.catch((err) => console.log(err));

		let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

		if (startDate) {
			const inputDate = new Date(startDate);
			monthOfInvoice = months[inputDate.getUTCMonth()].toUpperCase();
		}
	}, [invoice, startDate]);

	// invoice template
	let htmlContent;
	useEffect(() => {
		htmlContent = `
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
              DATE : ${new Date().toLocaleDateString().split(' ')[0].padEnd(24)}<br>
              ${data.bankname.padEnd(30)} 
              ${data.accountno.padEnd(31)}
              ${data.ifsc.padEnd(30)} 
              ${data.gst.padEnd(30)} 
              ${data.hssonno.padEnd(31)}
            </pre>
          </div>
          <div class="flex-1 p-4 text-center">
            <h3>INVOICE FOR THE MONTH OF ${monthOfInvoice}</h3>
          </div>
          <!-- Left-aligned Flex Item -->
          <div class="flex-1 p-4">
          <p>${getDIN()}</p><br>
			    TO<br><br>
			    THE MANAGER,<br>
			    ${client.businessName}
            ${client.address ? client.address.split(',').join('<br>') : ''}
          </div>

          <!-- Center-aligned Flex Item -->
          <div class="flex-1 p-4 text-center">
            <table class="w-full mt-4 border-collapse border">
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
                              <td class="border text-center">${index + 1}</td>
                              <td class="border text-center">${item._id}</td>
                              <td class="border text-center">${item.cost}</td>
                              <td class="border text-center">${item.quantity}</td>
                              <td class="border text-center">${item.amount}</td>
                            </tr>`;
									})
									.join(' ')}

                <tr>
                  <td class="border"></td>
                  <td class="border"></td>
                  <td class="border"></td>
                  <td class="border text-right"><strong>Total Amount</strong></td>
                  <td class="border text-right">${totalAmount}</td>
                </tr>
                <tr>
                  <td class="border"></td>
                  <td class="border"></td>
                  <td class="border"></td>
                  <td class="border text-right"><strong>SGST@2.5</strong></td>
                  <td class="border text-right">${totalAmount * 0.025}</td>
                </tr>
                <tr>
                <td class="border"></td>
                <td class="border"></td>
                <td class="border"></td>
                <td class="border text-right"><strong>CGST@2.5</strong></td>
                <td class="border text-right">${totalAmount * 0.025}</td>
              </tr>
                <tr>
                  <td class="border"></td>
                  <td class="border"></td>
                  <td class="border"></td>
                  <td class="border text-right"><strong>Grand Total</strong></td>
                  <td class="border text-right">${totalAmount * 0.05 + totalAmount}</td>
                </tr>
              </tbody>
            </table>
			<div class="mt-4">
			<strong> ${numberToWords(totalAmount * 0.05 + totalAmount)} only</strong>
		  </div><br>
		  <div class="text-right mr-17">
		  For DINESH CATERING SERVICES
		  </div><br><br><br><br>
		  <div class="text-right mb-10">
		  Authorised Signatory
		  </div>
          </div>
        </div>
      </body>
    </html>
  `;
	}, [invoice, invoiceNumber, monthOfInvoice]);

	// handling calendar open and close
	const [isStartCalendarOpen, setIsStartCalendarOpen] = useState(false);
	const [isEndCalendarOpen, setIsEndCalendarOpen] = useState(false);

	const handleOpenCalendarStart = () => {
		setIsStartCalendarOpen(!isStartCalendarOpen);
	};

	const handleOpenCalendarEnd = () => {
		setIsEndCalendarOpen(!isEndCalendarOpen);
	};

	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');

	// getting and formatting date from DateComponent
	const getStartDate = (date) => {
		const inputDate = new Date(date);

		const day = inputDate.getUTCDate();
		const month = inputDate.getUTCMonth() + 1; // Months are zero-indexed
		const year = inputDate.getUTCFullYear();

		const formattedDate = `${year}-${month}-${day}`;

		// console.log('formated date: ', formattedDate);
		setStartDate(formattedDate);
	};

	const getEndDate = (date) => {
		const inputDate = new Date(date);

		const day = inputDate.getUTCDate();
		const month = inputDate.getUTCMonth() + 1; // Months are zero-indexed
		const year = inputDate.getUTCFullYear();

		const formattedDate = `${year}-${month}-${day}`;

		// console.log('formated date: ', formattedDate);
		setEndDate(formattedDate);
	};

	// get client details
	const changeOrderList = (client) => {
		setClient(client);
	};

	// get invoice details form db
	const generatePDF = async () => {
		fetch(`${process.env.EXPO_PUBLIC_API_URL}/orders/invoice/${client.businessName}/${startDate}/${endDate}`)
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
				setInvoice(data.data.invoice);
				// console.log(data.data.invoice);
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

	const insertDataIntoExcel = async (data) => {
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

	const fetchReportSheetDetails = () => {
		fetch(`${process.env.EXPO_PUBLIC_API_URL}/orders/reportSheet/${client.businessName}/${startDate}/${endDate}`)
			.then((response) => response.json())
			.then((data) => {
				let rs = data.data.reportSheet;
				// console.log(rs);
				let mainArray = [['DATE', 'BREAKFAST', 'COFFEE', 'LUNCH', 'TEA', 'BUTTERMILK', 'DINNER', 'SPECIAL MEAL', 'SNACKS', 'TEA', 'CHICKEN', 'EGG', 'HR.SIGN']];
				rs.forEach((ele) => {
					let subArray = [];
					let foodOrder = ['breakfast', 'coffee', 'lunch', 'tea', 'buttermilk', 'dinner', 'special food', 'snacks', 'tea', 'chicken', 'egg'];

					subArray = foodOrder.map((item) => ele.orders.reduce((acc, order) => (order.foodItem === item ? acc + order.numberOfHeads : '-'), 0));
					subArray.unshift(ele.orderDate);
					mainArray.push(subArray);
					// console.log(subArray);
				});
				// console.log(mainArray);
				insertDataIntoExcel(mainArray);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<View className="flex-1">
			<View className="mt-10 mb-8 p-5 border-solid content-center border-1 justify-center bg-blue-400 ">
				<Text className="text-center">Invoice Generation</Text>
			</View>
			<DropDown changeOrderList={changeOrderList} />
			<DateComponent isCalendarOpen={isStartCalendarOpen} handleOpenCalendar={handleOpenCalendarStart} setDate={getStartDate} />
			<DateComponent isCalendarOpen={isEndCalendarOpen} handleOpenCalendar={handleOpenCalendarEnd} setDate={getEndDate} />
			{/* date selections */}
			<View className="mb-36 ml-10">
				<Text className="">Start Date:</Text>
				<TouchableOpacity className="border w-4/5 p-3" onPress={handleOpenCalendarStart}>
					<Text>{startDate}</Text>
				</TouchableOpacity>

				<Text className="mt-4">End Date:</Text>
				<TouchableOpacity className="border w-4/5 p-3 mt-2" onPress={handleOpenCalendarEnd}>
					<Text>{endDate}</Text>
				</TouchableOpacity>
			</View>

			<View className="justify-between items-center mb-28">
				<View className="py-2 px-4 rounded">
					<Button title="Generate Invoice" onPress={generatePDF} />
				</View>
				<View className="w-4" />
				<View className="py-2 px-4 rounded">
					<Button title="Generate Report Sheet" onPress={fetchReportSheetDetails} />
				</View>
			</View>
		</View>
	);
};

export default IRgeneration;
