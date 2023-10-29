import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
// import { useNavigation } from "@react-navigation/native";

// const navigation = useNavigation();

const HomeMenu = ({ navigation }) => {
  return (
    <TouchableOpacity
      className="bg-gray-300 p-4 m-6 w-32 h-32 justify-items-center items-center justify-end rounded-md"
      onPress={() => navigation.navigate("Home")}
    >
      <FontAwesome name="user-plus" size={32} />
      <Text className="text-center mt-2">add company</Text>
    </TouchableOpacity>
  );
};

export default HomeMenu;
