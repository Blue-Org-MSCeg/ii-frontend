import { View, Button, Text, TouchableOpacity, Alert, ActivityIndicator, Image } from 'react-native';
import DropDown from '../components/DropDown';
import { shareAsync } from 'expo-sharing';
import { printToFileAsync } from 'expo-print';
import { useEffect, useState } from 'react';
import DateComponent from '../components/DateComponent';
import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import { CheckToken } from '../middleware/CheckToken';
const bg = require('./../../assets/invoice.png');

const data = {
	bankname: 'UNION BANK OF INDIA',
	accountno: 'ACCOUNT NO :101410025041428',
	ifsc: 'IFSC CODE NO : UBIN-0810142',
	gst: 'GST NO : 37AQFPD2298CIZI ',
	hssonno: 'HSSON NO :996337',
};

const IRgeneration = ({ navigation }) => {
	// check if user is logged in
	const [isLoggedIn, setIsLoggedIn] = useState('first');

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			console.log('refreshed');
			checkInitialToken();
		});
		return unsubscribe;
	}, [navigation]);

	const checkInitialToken = async () => {
		const hasToken = await CheckToken();
		console.log(hasToken);
		setIsLoggedIn(hasToken);
	};

	useEffect(() => {
		if (!isLoggedIn && isLoggedIn !== 'first') {
			navigation.navigate('SignIn');
		}
	}, [isLoggedIn]);
	//user verification ends here

	const [client, setClient] = useState({ address: '', items: [] });
	const [invoice, setInvoice] = useState([]);
	let monthOfInvoice;

	let totalAmount = 0;
	const [invoiceNumber, setInvoiceNumber] = useState(1);

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
		fetch(`${process.env.EXPO_PUBLIC_API_URL}/invoiceCounter/`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data.invoiceNumber);
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

		// // Set the style for all cells with centered text
		// const style = {
		// 	alignment: {
		// 		horizontal: 'center',
		// 		vertical: 'center',
		// 	},
		// };

		// // Get the range of cells in the worksheet
		// const range = XLSX.utils.decode_range(ws['!ref']);

		// // Loop through each cell in the range and apply the style
		// for (let R = range.s.r; R <= range.e.r; ++R) {
		// 	for (let C = range.s.c; C <= range.e.c; ++C) {
		// 		const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });

		// 		// Ensure the cell is initialized
		// 		if (!ws[cellAddress]) {
		// 			ws[cellAddress] = { t: 's', v: '' }; // You can set the initial value as needed
		// 		}

		// 		// Apply the style to the cell
		// 		ws[cellAddress].s = style;
		// 	}
		// }

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

	return isLoggedIn ? (
		<View className="flex-1">
			{/* sign in */}
			<View className="h-screen">
				<Image source={bg} className="w-screen h-[65%] z-0 rounded-b-3xl" />
				<View className="bg-white h-[45%] rounded-t-[65px] shadow-2xl shadow-slate-800 w-screen z-10 absolute top-[45%]">
					<Text className="text-2xl text-center mt-5 tracking-wider font-semibold">Generate invoice</Text>
					<DropDown changeOrderList={changeOrderList} />
					<DateComponent isCalendarOpen={isStartCalendarOpen} handleOpenCalendar={handleOpenCalendarStart} setDate={getStartDate} />
					<DateComponent isCalendarOpen={isEndCalendarOpen} handleOpenCalendar={handleOpenCalendarEnd} setDate={getEndDate} />
					{/* date selections */}
					<View className="mb-5 flex gap-x-4 flex-row justify-center items-center">
						<View className="w-[40%] ml-2">
							<Text className="tracking-wider">Start Date:</Text>
							<TouchableOpacity className="border p-3 mt-2 border-green" onPress={handleOpenCalendarStart}>
								<Text>{startDate}</Text>
							</TouchableOpacity>
						</View>
						<View className="w-[40%]">
							<Text className="tracking-wider">End Date:</Text>
							<TouchableOpacity className="border p-3 mt-2 border-green" onPress={handleOpenCalendarEnd}>
								<Text>{endDate}</Text>
							</TouchableOpacity>
						</View>
					</View>

					<View className="w-screen flex flex-row justify-center items-center gap-x-2">
						<TouchableOpacity className="bg-green w-40 px-2 py-2 rounded-md my-3" onPress={generatePDF}>
							<Text className="text-center text-white tracking-wider">Generate Invoice</Text>
						</TouchableOpacity>
						<TouchableOpacity className="bg-green w-52 px-2 py-2 rounded-md my-3" onPress={fetchReportSheetDetails}>
							<Text className="text-center text-white tracking-wider">Generate Report Sheet</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
	) : (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<ActivityIndicator size="large" color="#6dab4a" />
		</View>
	);
};

export default IRgeneration;
