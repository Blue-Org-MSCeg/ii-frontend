import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import DropDown from "../components/DropDown";
import Head from "../components/Head";
import DateComponent from "../components/DateComponent";
import EditRemove from "../components/EditRemove";

export default function EditOrder() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const handleOpenCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const order = [
    {food:"breakfast",quantity:30},
    {food:"lunch",quantity:20},
    {food:"dinner",quantity:15},
    {food:"meal",quantity:45},
    {food:"tea/coffee",quantity:8}
  ];
  const menu = ["breakfast", "lunch", "dinner", "meal", "tea/coffee"];
  return (
    <View className='flex-1 bg-red-500'>
      <Head/>
    <View className="bg-black border-b-4"><DropDown/></View>
    <View className="ml-8">
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
            {menu.map((menuItem) => {
              <MenuComponent menuItem={menuItem} />
              //<EditRemove menuItem={menuItem.food}/>
})}
          </View>
          <TouchableOpacity className="bg-blue-400 w-20 p-2 rounded-md mt-3">
            <Text className="text-center text-white">submit</Text>
          </TouchableOpacity>
        </View>
    </View>
    
  );
}
