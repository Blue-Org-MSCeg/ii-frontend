import { View, Text, Button } from "react-native";

import DropDown from "../components/DropDown";
import { shareAsync } from "expo-sharing";
import { printToFileAsync } from "expo-print";

const data = {
  bankname: "UNION BANK OF INDIA",
  accountno: "ACCOUNT NO :101410025041428",
  ifsc: "IFSC CODE NO : UBIN-0810142",
  gst: "GST NO : 37AQFPD2298CIZI ",
  hssonno: "HSSON NO :996337",
};

const IRgeneration = () => {
  const htmlContent = `
  <html>
  <head>
  <meta charset="utf-8">
  <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
  </head>
  <body class="bg-black" >
      <header>
      <br><br><br><br><br><br><br><br><br>
      <p>${new Date().toLocaleDateString().split(" ")[0]}<p>
        <address>
        <pre  class="text-white"> 
          ${data.bankname}
          ${data.accountno}
          ${data.ifsc}
          ${data.gst}
          ${data.hssonno}
        </pre>
       
        </address>
      <header>
      <h1>INVOICE</h1>

  </body>
  </html>
`;
  const generatePDF = async () => {
    fetch(`http:10.11.49.136:3000/api/v1/orders/invoice/${client}`);

    const file = await printToFileAsync({
      html: htmlContent,
      base64: false,
    });
    await shareAsync(file.uri);
  };

  return (
    <View className="flex-1">
      <DropDown />

      <View className="justify-between items-center mb-28">
        <View className="py-2 px-4 rounded">
          <Button title="Generate Invoice" onPress={generatePDF} />
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
