import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import DropDown from "../components/DropDown";
import Head from "../components/Head";
import DateComponent from "../components/DateComponent";
import EditRemove from "../components/EditRemove";
import MenuComponent from "../components/MenuComponent"; // Make sure to import MenuComponent

export default function EditOrder() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  let [date, setDate] = useState("");
  const [client, setClient] = useState({});
  const handleOpenCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [order, setOrder] = useState([]);

  useEffect(() => {
    if (date !== "") {
      fetch(
        `http://192.168.120.16:3000/api/v1/orders/${client.businessName}/${date}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          return response.json(); // Parse JSON if the content type is JSON
        })
        .then((data) => {
          // Handle the parsed JSON data here
          // console.log(date);
          console.log(data.data.orders[0].orders);
          setOrder(data.data.orders[0].orders);
        })
        .catch((err) => {
          // Handle errors, including the JSON parsing error
          console.log(err);
        });
    }
  }, [date]);
  const updateOrder = (food, newQuantity) => {
    // Find the index of the menu item in the order array
    const itemIndex = order.findIndex((menuItem) => menuItem.food === food);

    if (itemIndex !== -1) {
      // Clone the order array to avoid mutating state directly
      const updatedOrder = [...order];

      // Update the quantity for the specific menu item
      updatedOrder[itemIndex].quantity = newQuantity;

      // Set the state with the updated order array
      setOrder(updatedOrder); // Assuming you have a state variable 'order' in your parent component
    }
  };
  // getting the menu quotation respective to the client
  const changeOrderList = (client) => {
    setClient(client);
    // setMenuQuotation(client.menuQuotation);
  };
  const getDate = (date) => {
    const newDate = new Date(date.replaceAll("/", "-"));
    setDate(newDate);
    // console.log(newDate);
  };
  return (
    <View className="flex-1 bg-white-500">
      <Head />
      <View className="">
        <DropDown changeOrderList={changeOrderList} />
      </View>
      <View className="ml-8 mt-20">
        <Text className="text-base">Select Date</Text>
        <TouchableOpacity
          className="border w-4/5 p-3 mt-2"
          onPress={handleOpenCalendar}
        >
          <Text>{selectedStartDate}</Text>
        </TouchableOpacity>

        <DateComponent
          isCalendarOpen={isCalendarOpen}
          setSelectedStartDate={setSelectedStartDate}
          handleOpenCalendar={handleOpenCalendar}
          setDate={getDate}
        />
        <View>
          <View className="flex flex-row justify-between py-2 px-10 bg-zinc-300 w-11/12 mt-9 border-b">
            <Text className="text-lg">Item</Text>
            <Text className="text-lg">Quantity</Text>
          </View>
          {order.map((menuItem, index) => (
            <EditRemove
              key={index}
              food={menuItem.foodItem}
              fquantity={menuItem.numberOfHeads}
              updateOrder={updateOrder}
            />
          ))}
        </View>
        {/* <TouchableOpacity className="bg-blue-400 w-20 p-2 rounded-md mt-3">
          <Text className="text-center text-white">submit</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}
