import { useState } from "react";

export default EditFoodComponent = ({
  item,
  index,
  setIsEditFoodOpen,
  setMenuItem,
  editorPass,
}) => {
  // const [isEditOpen, setIsEditOpen] = useState(false);
  const [editedItemCost, setEditedItemCost] = useState("");

  const handleRemove = (index) => {
    const newOptions = [...menuItem];
    newOptions.splice(index, 1);
    setMenuItem(newOptions);
  };
  return (
    <View className=" flex-row mb-3 justify-between mr-2" key={index}>
      <View className="border border-black p-2 m-1 w-40 bg-gray-300">
        <Text>{item.food}</Text>
      </View>
      <View className="border border-black p-2 m-1 w-20 bg-gray-300">
        <Text className=" text-center ">{item.cost}</Text>
      </View>

      <View className="mr-2 m-1">
        <Button
          title="edit"
          onPress={() => {
            // setIsEditOpen(true);
            setEditedItemCost(item.cost);
            setIsEditFoodOpen(true);
            editorPass(item);
          }}
        />
      </View>
      <View className="m-1">
        <Button title="remove" onPress={() => handleRemove(index)} />
      </View>
    </View>
  );
};
