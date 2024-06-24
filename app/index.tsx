import { Redirect } from "expo-router";
import { Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function Index() {
  return <Redirect href={'/home'} />
}
