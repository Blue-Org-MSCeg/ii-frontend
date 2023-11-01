import {
  View,
  Text,
  Button,
  TextInput,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

export default function ViewMenu() {
  const [menu, setMenu] = useState([]);
  const [cost, setCost] = useState("");
  const [food, setFood] = useState("");
  const [isAddFoodOpen, setIsAddFoodOpen] = useState(false);

  const changeFood = (food) => {
    setFood(food);
  };

  const changeCost = (cost) => {
    setCost(cost);
  };

  const addFood = () => {
    setMenu((currentMenu) => [...currentMenu, { food: food, cost: cost }]);
    toggleAddFoodHandler();
  };

  const toggleAddFoodHandler = () => {
    setIsAddFoodOpen(!isAddFoodOpen);
  };

  const deleteItem = (index) => {
    const newOptions = [...menu];
    newOptions.splice(index, 1);
    setMenu(newOptions);
  };

  return (
    <View>
      <View className="mt-10 mb-8 p-5 border-solid content-center border-1 justify-center bg-blue-400 ">
        <Text className="text-white text-center">VIEW MENU</Text>
      </View>

      {/* add menu text box*/}

      {isAddFoodOpen && (
        <View className="align-middle justify-center content-centers flex border-b mb-5">
          <View className="flex-row flex-2 p-15">
            <TextInput
              onChangeText={changeFood}
              className="border-2 border-black w-7/12 p-2 ml-10 "
              maxLength={40}
              placeholder="food item"
            />
            <TextInput
              onChangeText={changeCost}
              className="border-2 border-black  p-2 mr-10 ml-6"
              placeholder="cost"
              keyboardType="numeric"
            />
          </View>
          <TouchableOpacity>
            <View className="flex-row justify-between p-5">
              <View className="ml-6">
                <Button title="CANCEL" onPress={toggleAddFoodHandler} />
              </View>
              <View className="mr-10">
                <Button onPress={addFood} title="submit" />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}

      {/* menu items */}
      <ScrollView>
        {menu.map((menuItem, index) => (
          <View className=" flex-row mb-3 justify-between mx-3" key={index}>
            <View className="flex-row mb-3 justify-between">
              <View className="border border-black bg-gray-300 p-2 m-1 mr-2 w-40">
                <Text>{menuItem.food}</Text>
              </View>
              <View className="border border-black  bg-gray-300 text-center p-2 m-1 mr-2 w-20">
                <Text>{menuItem.cost}</Text>
              </View>
            </View>
            <View className="p-1 m-1">
              <Button title="Remove" onPress={() => deleteItem(index)} />
            </View>
          </View>
        ))}

        {/* add button */}
        <TouchableOpacity>
          <View className=" justify-between p-2 ml-10 mr-10 ">
            <Button title="ADD" onPress={toggleAddFoodHandler} />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
