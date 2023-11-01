import { TouchableOpacity, View, Text, ScrollView } from "react-native";
import Head from "../components/Head";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function HomeScreen({ navigation }) {
  const menu = [
    { id: "1", label: "add client", icon: "user-plus", to: "AddClient" },
    { id: "2", label: "add orders", icon: "plus", to: "AddOrders" },
    { id: "3", label: "edit orders", icon: "eraser", to: "EditOrder" },
    { id: "4", label: "view clients", icon: "eye", to: "ViewClients" },
    { id: "5", label: "view menu", icon: "user-plus", to: "ViewMenu" },
    { id: "6", label: "Menu quotation", icon: "dropbox", to: "MenuQuotation" },
    { id: "7", label: "Generate Invoice", icon: "book", to: "IRgeneration" },
  ];

  return (
    <ScrollView>
      <Head />
      <View className="w-full flex flex-row items-center flex-wrap content-start mt-4 ">
        {menu.map((item) => (
          <TouchableOpacity
            keu={item.id}
            className="bg-gray-300 p-4 m-6 w-32 h-32 justify-items-center items-center justify-end rounded-md"
            onPress={() => navigation.navigate(item.to)}
          >
            <FontAwesome name={item.icon} size={32} />
            <Text className="text-center mt-2">{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
