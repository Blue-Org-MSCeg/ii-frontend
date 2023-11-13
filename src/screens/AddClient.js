import { View, Text, ScrollView, Button, TextInput } from "react-native";
import React, { useState } from "react";

import PhoneComponent from "../components/PhoneComponent";
import Head from "../components/Head";

export default function AddClient() {
  let [businessName, setBusinessName] = useState("");
  let [gstNumber, setgstNumber] = useState();
  let [phoneNumber, setphoneNumber] = useState();
  let [email, setEmail] = useState("");
  let [poa, setPoa] = useState();
  let [address, setAddress] = useState("");

  const addClient = () => {
    const formData = {
      businessName: businessName,
      GSTno: gstNumber,
      phoneNo: phoneNumber,
      emailAddress: email,
      agreementStartDate: Date.now(),
      agreementEndDate: Date.now(),
      address: address,
    };

    fetch("http://192.168.120.16:3000/api/v1/clients/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        return response.json(); // Parse JSON if the content type is JSON
      })
      .then((data) => {
        // Handle the parsed JSON data here
        console.log(data);
      })
      .catch((err) => {
        // Handle errors, including the JSON parsing error
        console.log(err);
      });
  };
  // console.log(addClient);

  return (
    <ScrollView automaticallyAdjustKeyboardInsets>
      <Head />
      <View className="p-15 mt-14 space-y-4">
        <Text className="ml-10 text-gray-700">Business name : </Text>

        <TextInput
          className="border-2 rounded-md bg-white-400  border-gray-400 w-64 p-2 ml-10 "
          maxLength={100}
          placeholder="John Pvt Lmt"
          onChangeText={(e) => {
            setBusinessName(e);
            value = { businessName };
          }}
        />

        <Text className="ml-10">GST number : </Text>

        <TextInput
          className="border-2 bg-white-400 rounded-md border-gray-400 w-64 p-2 ml-10"
          maxLength={15} //Limit !!
          keyboardType="numeric"
          value={gstNumber}
          onChangeText={setgstNumber}
        />
        <Text className="ml-10">Business phone number : </Text>

        <PhoneComponent setphoneNumber={setphoneNumber} />

        <Text className="ml-10">Business email : </Text>
        <TextInput
          className="border-2 bg-white-400 rounded-md border-gray-400 w-64 p-2 ml-10"
          keyboardType="email-address"
          maxLength={100}
          value={email}
          onChangeText={setEmail}
        />

        <Text className="ml-10">Period of agreement : </Text>
        <TextInput
          className="border-2 bg-white-400 rounded-md border-gray-400 w-64 p-2 ml-10"
          keyboardType="numeric"
          maxLength={2}
          value={poa}
          onChangeText={setPoa}
        />
        <Text className="ml-10">address : </Text>
        <TextInput
          className="border-2 mt-0 h-24 p-0 pt-0 bg-white-400 rounded-md border-gray-400 w-64 ml-10"
          multiline={true}
          value={address}
          onChangeText={setAddress}
        />

        <View className="flex items-center">
          <Button title="Submit" onPress={addClient} />
        </View>
      </View>
    </ScrollView>
  );
}
