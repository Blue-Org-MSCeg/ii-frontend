import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { Text, TextInput, View , TouchableOpacity} from 'react-native';


export default EditRemove = ({food,fquantity, updateOrder}) => {
	const [isEditing, setIsEditing] = useState(false);
    const [newQuantity, setNewQuantity] = useState(fquantity.toString());
	// const [quantity, setQuantity] = useState('0');

	// function addQuantityHandler() {
	// 	const newQuanity = (parseInt(quantity) + 1).toString();
	// 	setQuantity(newQuanity);
	// }
	// function subtractQuantityHandler() {
	// 	const newQuanity = (parseInt(quantity) - 1).toString();
	// 	if (newQuanity >= 0) setQuantity(newQuanity);
	// }
	const handleEdit = () => {
		setIsEditing(true);
	  };
	
	  const handleSave = () => {
		const newQuantityInt = parseInt(newQuantity, 10);
    // const newQuantityInt = parseInt(newQuantity, 10);
    if (!isNaN(newQuantityInt) && newQuantityInt >= 0 && newQuantityInt === parseFloat(newQuantity)) {
      // Update the order array with the new quantity
      updateOrder(food, newQuantityInt);
      setIsEditing(false); // Exit "Edit" mode
    } else {
      alert('Invalid quantity. Please enter a non-negative integer.');
    }
	  };

	return (
	// 	<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 8, borderBottomWidth: 1 }}>
    //   <Text style={{ fontSize: 16 }}>{food}</Text>
	//   {/* <TouchableOpacity onPress={() => subtractQuantityHandler}>
    //       <Text style={{ fontSize: 20, marginHorizontal: 10 }}>-</Text>
    //     </TouchableOpacity> */}
	// 	 <Text style={{ fontSize: 16 }}>{fquantity}</Text>
    //   <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    //     {/* <Text style={{ fontSize: 16 }}>{fquantity}</Text> */}
    //     <TouchableOpacity onPress={() => addQuantityHandler}>
    //       <Text style={{ fontSize: 20, marginHorizontal: 10 }}>+</Text>
    //     </TouchableOpacity>
    //   </View>
    // </View>
	<View
    className ="flex-row justify-between items-center px-3 py-2 border-b"
      // style={{
      //   flexDirection: 'row',
      //   justifyContent: 'space-between',
      //   alignItems: 'center',
      //   paddingHorizontal: 10,
      //   paddingVertical: 8,
      //   borderBottomWidth: 1,
      // }}
    >
      {/* style={{ fontSize: 16 }} */}
      <Text className="text-2xl font-normal">{food}</Text>
      {isEditing ? (
        <View className="flex-row items-center justify-center">
          <TextInput
            value={newQuantity}
            onChangeText={(text) => setNewQuantity(text)}
            keyboardType="numeric"
          />
          <TouchableOpacity onPress={handleSave}>
            <Text className="bg-blue-400 w-15 p-1 rounded-md mt-2 items-center">Save</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="flex flex-row items-center justify-center">
          <Text className="text-lg mr-2 border px-3 rounded-md">{fquantity}</Text>
          <TouchableOpacity onPress={handleEdit}>
            <Text className="bg-green-400 w-15 p-1 rounded-md items-center px-3 py-1 ">Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity className="px-3 py-1 rounded-full flex justify-center items-center">
				<FontAwesome name="minus" color="red" size={15} />
			</TouchableOpacity>
        </View>
      )}
    </View>
  );
};
