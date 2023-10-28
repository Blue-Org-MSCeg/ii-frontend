import { View, Text, Button } from "react-native";
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

const IRgeneration = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState(null);
  const companies = [
    { label: "company1", value: "company1" },
    { label: "company2", value: "company2" },
    { label: "company3", value: "company3" },
    { label: "company4", value: "company4" },
    { label: "company5", value: "company5" },
    { label: "company6", value: "company6" },
    { label: "company7", value: "company7" },
    { label: "company8", value: "company8" },
    { label: "company9", value: "company9" },
    { label: "company10", value: "company10" },
  ];
  return (
    <View className="flex-1 p-20 mt-20">
      <View className="flex-1">
        <DropDownPicker
          items={companies}
          open={isOpen}
          setOpen={() => setIsOpen(!isOpen)}
          value={currentValue}
          setValue={(val) => setCurrentValue(val)}
          autoScroll
          placeholder="Select Company"
          max-h-80
        />
      </View>
      <View className="justify-between items-center mt-40">
        <View className="py-2 px-4 rounded">
          <Button title="Genrate Invoice" />
        </View>
        <View className="w-4" />
        <View className="py-2 px-4 rounded">
          <Button title="Genearte Report Sheet" />
        </View>
      </View>
    </View>
  );
};

export default IRgeneration;
