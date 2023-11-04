import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import DropDown from "../components/DropDown";
import Head from "../components/Head";
import DateComponent from "../components/DateComponent";
import EditRemove from "../components/EditRemove";
import MenuComponent from "../components/MenuComponent"; // Make sure to import MenuComponent

export default function EditOrder() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const handleOpenCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [order, setOrder] = useState( [
    { food: "breakfast", quantity: 30 },
    { food: "lunch", quantity: 20 },
    { food: "dinner", quantity: 15 },
    { food: "meal", quantity: 45 },
    { food: "tea/coffee", quantity: 8 },
    
  ]);
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

  return (
    <View className="flex-1 bg-white-500">
      <Head />
      <View className="">
        <DropDown />
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
        />
        <View>
          <View className="flex flex-row justify-between py-2 px-10 bg-zinc-300 w-11/12 mt-9 border-b">
            <Text className="text-lg">Item</Text>
            <Text className="text-lg">Quantity</Text>
          </View>
          {order.map((menuItem, index) => (
      <EditRemove key={index} food={menuItem.food} fquantity={menuItem.quantity} updateOrder={updateOrder} />
    ))}
        </View>
        {/* <TouchableOpacity className="bg-blue-400 w-20 p-2 rounded-md mt-3">
          <Text className="text-center text-white">submit</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

