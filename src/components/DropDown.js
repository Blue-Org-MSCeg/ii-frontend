import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";

const DropDown = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState(null);
  const [clients, setClients] = useState([]);
  const [clientList, setClientList] = useState([]);

  useEffect(() => {
    fetch("http://192.168.137.1:3000/api/v1/clients/")
      .then((response) => response.json())
      .then((res) => setClients(res.data.clients))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    clients.forEach((client) => {
      setClientList((currentValue) => [
        ...currentValue,
        {
          label: client.businessName,
          value: client.businessName,
          businessName: client.businessName,
          id: client._id,
          menuQuotation: client.menuQuotation,
          // cost: client.cost,
        },
      ]);
    });
  }, [clients]);

  return (
    <View className="flex-1 p-10 mb-10">
      <DropDownPicker
        items={clientList}
        open={isOpen}
        setOpen={() => setIsOpen(!isOpen)}
        value={currentValue}
        setValue={(val) => {
          setCurrentValue(val);
        }}
        onSelectItem={(client) => props.changeOrderList(client)}
        autoScroll
        placeholder="Select Company"
        max-h-80
      />
    </View>
  );
};

export default DropDown;
