import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { ClerkProvider, ClerkLoaded, SignedIn, SignedOut } from "@clerk/clerk-expo"
import { Slot } from "expo-router"

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
import * as SecureStore from "expo-secure-store";
import Login from './../components/Login';

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};
export default function RootLayout() {
  useFonts({
    'BreeSerif-Regular': require('../assets/fonts/BreeSerif-Regular.ttf'),
    'outfit-Bold': require('../assets/fonts/Outfit-Bold.ttf'),
    'outfit-Medium': require('../assets/fonts/Outfit-Medium.ttf'),
    'josefinsans-Bold': require('../assets/fonts/JosefinSans-Bold.ttf'),
  })
  return (

    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={publishableKey}>
      <SignedIn>
        <Stack>
          <Stack.Screen name="(tabs)" options={{
            headerShown: false
          }}
          />
        </Stack>
      </SignedIn>
      <SignedOut>
        <Login />
      </SignedOut>
    </ClerkProvider>

  );
}
