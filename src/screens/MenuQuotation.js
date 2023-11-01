import { View, Text, Button, TouchableOpacity, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import EditFoodComponent from "../components/EditFoodComponent";
import EditerComponent from "../components/EditerComponent";

export default function MenuQuotation() {
  const [menuItem, setMenuItem] = useState([
    { food: "Breakfast", cost: "50", id: 1 },
    { food: "snacks", cost: "30", id: 2 },
    { food: "Lunch", cost: "100", id: 3 },
    { food: "Dinner", cost: "60", id: 4 },
  ]);

  const [cost, setCost] = useState("");
  const [food, setFood] = useState("");
  const [itemEdit, setItemEdit] = useState(null);
  const [isAddFoodOpen, setIsAddFoodOpen] = useState(false);

  const [isEditFoodOpen, setIsEditFoodOpen] = useState(false);
  // const [editedItemCost, setEditedItemCost] = useState("");

  const editorPass = (item) => {
    setItemEdit(item);
  };

  const changeFood = (food) => {
    setFood(food);
  };

  const changeCost = (cost) => {
    setCost(cost);
  };

  const toggleAddFoodHandler = () => {
    setIsAddFoodOpen(!isAddFoodOpen);
  };

  const addFood = () => {
    setMenuItem((currentMenu) => [...currentMenu, { food: food, cost: cost }]);
    toggleAddFoodHandler();
  };

  useEffect(() => {
    const updatedItem = menuItem.map((item) =>
      item.food === isEditingFood ? { ...item, cost: editedItemCost } : item
    );
    setMenuItem(updatedItem);
    setIsEditFoodOpen("");
    setEditedItemCost("");
  }, [itemEdit]);
  // const handleEdit = () => {
  //   const updatedItem = menuItem.map((item) =>
  //     item.food === isEditingFood ? { ...item, cost: editedItemCost } : item
  //   );
  //   setMenuItem(updatedItem);
  //   setIsEditFoodOpen("");
  //   setEditedItemCost("");
  // };

  // const handleRemove = (index) => {
  //   const newOptions = [...menuItem];
  //   newOptions.splice(index, 1);
  //   setMenuItem(newOptions);
  // };

  // const handleEditComponent = (isEditFoodOpen) => {
  //   setIsEditFoodOpen(isEditFoodOpen);
  // };

  return (
    <View className="w-full">
      <View className="mt-10 mb-8 p-5 border-solid content-center border-1 justify-center bg-blue-400 ">
        <Text className="text-center">MenuQuotation</Text>
      </View>
      {/* add food items for company */}

      {isAddFoodOpen && (
        <View className="align-middle justify-center content-centers flex border-b mb-5">
          <View className="flex-row flex-2 p-15">
            <View className="border-2 bg-gray-300 border-black w-7/12 p-2 ml-10 ">
              <TextInput
                onChangeText={changeFood}
                maxLength={40}
                placeholder="food item"
              />
            </View>
            <View className="bg-gray-300 border-2 border-black  p-2 mr-10 ml-6 ">
              <TextInput
                onChangeText={changeCost}
                className=""
                placeholder="cost"
                keyboardType="numeric"
              />
            </View>
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

      {isEditFoodOpen && (
        <EditerComponent itemEdit={itemEdit} setItemEdit={setItemEdit} />
        // <View className="justify-between mt-5 mb-10 border-b">
        //   <View className="bg-gray-300 w-52 justify-center content-center p-3 mb-5 mx-20 ml-30">
        //     <Text className="text-center ">Edit Cost</Text>
        //   </View>
        //   <View className="flex-row justify-center mb-5">
        //     <TextInput
        //       className="border-2 border-black w-20 mr-10"
        //       value={editedItemCost}
        //       onChangeText={setEditedItemCost}
        //       placeholder="Cost"
        //       keyboardType="numeric"
        //     />
        //     <View className="ml-2">
        //       <Button title="Save" onPress={handleEdit} />
        //     </View>
        //   </View>
        // </View>
      )}

      {/* View menu */}
      <View className="place-items-center">
        <View className="flex-row">
          <View>
            <Text className="border border-black p-2 m-1 w-40 bg-gray-300 font-bold">
              Items
            </Text>
          </View>
          <View>
            <Text className="border border-black p-2 m-1 w-20 bg-gray-300 font-bold">
              Cost
            </Text>
          </View>
        </View>
        {menuItem.map((item) => (
          <EditFoodComponent
            item={item}
            index={item.id}
            setIsEditFoodOpen={setIsEditFoodOpen}
            setMenuItem={setMenuItem}
            editorPass={editorPass}
          />
          // <View className=" flex-row mb-3 justify-between mr-2" key={index}>
          //   <View className="border border-black p-2 m-1 w-40 bg-gray-300">
          //     <Text>{item.food}</Text>
          //   </View>
          //   <View className="border border-black p-2 m-1 w-20 bg-gray-300">
          //     <Text className=" text-center ">{item.cost}</Text>
          //   </View>

          //   <View className="mr-2 m-1">
          //     <Button
          //       title="edit"
          //       onPress={() => {
          //         setIsEditFoodOpen(item.food);
          //         setEditedItemCost(item.cost);
          //       }}
          //     />
          //   </View>
          //   <View className="m-1">
          //     <Button title="remove" onPress={() => handleRemove(index)} />
          //   </View>
          // </View>
        ))}
      </View>

      <TouchableOpacity>
        <View className="w-20 justify-between p-1 rounded-md mt-10">
          <Button title="ADD" onPress={toggleAddFoodHandler} />
        </View>
      </TouchableOpacity>
    </View>
  );
}
