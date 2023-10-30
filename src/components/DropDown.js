import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";

const DropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState(null);
  // const companies = [
  //   { label: "company1", value: "company1" },
  //   { label: "company2", value: "company2" },
  //   { label: "company3", value: "company3" },
  //   { label: "company4", value: "company4" },
  //   { label: "company5", value: "company5" },
  //   { label: "company6", value: "company6" },
  //   { label: "company7", value: "company7" },
  //   { label: "company8", value: "company8" },
  //   { label: "company9", value: "company9" },
  //   { label: "company10", value: "company10" },
  // ];
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch("http://192.168.141.152:3000/api/v1/clients/")
      .then((response) => response.json())
      .then((res) => setClients(res.data.clients))
      .catch((err) => console.log(err));
  }, []);
  return (
    <View className="flex-1 p-20 mt-20">
      <DropDownPicker
        items={clients}
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
