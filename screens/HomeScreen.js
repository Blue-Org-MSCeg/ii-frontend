import { StatusBar } from "expo-status-bar";
import { Button, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const menu = [
    "add company",
    "add orders",
    "edit orders",
    "generate invoice",
    "generate report sheet",
    "menu quotation",
    "edit list",
  ];
  return (
    <View className="flex-1 justify-start items-center mt-10">
      <Text className="text-center p-6 text-sm">InsightfulInvoices</Text>
      <View className="grid grid-rows-4">
        {menu.map((item, i) => (
          <TouchableOpacity key={i} className="bg-red-500 grid grid-rows-4">
            <Text className="grid grid-rows-4">{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
