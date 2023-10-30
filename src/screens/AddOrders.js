import { Text, TouchableOpacity, View } from "react-native";
import Head from "./../components/Head";
import { useState } from "react";
import DateComponent from "../components/DateComponent";
import MenuComponent from "./../components/MenuComponent";
import DropDown from "../components/DropDown";

export default AddOrders = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const handleOpenCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const [selectedStartDate, setSelectedStartDate] = useState("");

  const menu = ["breakfast", "lunch", "dinner", "meal", "tea/coffee"];

  return (
    <View>
      <Head />

      <View>
        <DropDown />
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
            {menu.map((menuItem) => (
              <MenuComponent menuItem={menuItem} />
            ))}
          </View>
          <TouchableOpacity className="bg-blue-400 w-20 p-2 rounded-md mt-3">
            <Text className="text-center text-white">submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
