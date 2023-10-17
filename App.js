import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View
      className=" flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 50 "
    >
      <Text>InsightfulInvoices</Text>
      <StatusBar style="auto" />
    </View>
  );
}
