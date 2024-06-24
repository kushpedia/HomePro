import { useFonts } from "expo-font";
import { Stack } from "expo-router";
export default function RootLayout() {
  useFonts({
    'BreeSerif-Regular': require('../assets/fonts/BreeSerif-Regular.ttf'),
    'outfit-Bold': require('../assets/fonts/Outfit-Bold.ttf'),
    'outfit-Medium': require('../assets/fonts/Outfit-Medium.ttf'),
  })
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{
        headerShown: false
        }}
        />
    </Stack>
  );
}
