import { Text, View } from "react-native";
import Head from "../components/Head";

export default function Home({ navigation }) {
  return (
    <View className="">
      <Head />
      <Text
        className="text-red-600"
        onPress={() => navigation.navigate("ClientList")}
      >
        Hello
      </Text>
    </View>
  );
}
