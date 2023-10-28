import { View, Text } from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function HomeScreen() {
  return (
    <View>
      <Text>HomeScreen</Text>
      <FontAwesomeIcon icon={icon({ name: "user-secret" })} />
    </View>
  );
}
