import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";

const DropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState(null);

  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch("http://10.16.65.97:3000/api/v1/clients/")
      .then((response) => response.json())
      .then((res) => setClients(res.data.clients))
      .catch((err) => console.log(err));
  }, []);
  return (
    <View className="flex-1 p-20 mt-20">
      <DropDownPicker
        items={clients.map((client) => ({
          label: client.businessName,
          value: client._id,
        }))}
        open={isOpen}
        setOpen={() => setIsOpen(!isOpen)}
        value={currentValue}
        setValue={(val) => setCurrentValue(val)}
        autoScroll
        placeholder="Select Company"
        max-h-80
      />
    </View>
  );
};

export default DropDown;
